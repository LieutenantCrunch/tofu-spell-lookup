import { setShowUsedSpellsOnly, setStorageSupported } from './slices/currentSelections';
import { addFrames } from './slices/frames';
import { addBlends, addShifts, clearBlends, clearShifts } from './slices/spells/colorShift';
import { addFonts, clearFonts } from './slices/spells/font';
import { addSpecials, clearSpecials } from './slices/spells/special';
import { addTextColors, clearTextColors } from './slices/spells/textColor';
import { addTextGlows, clearTextGlows } from './slices/spells/textGlow';

// Utilities
import { SPELL_FONTS, SPELL_PROPERTIES, SPELL_TYPES } from '../utilities/constants';
import { decToHex, decToHSLObject, zeroPad } from '../utilities/utilities';

export const populateStore = (store, spellsJson, framesJson) => {
    let showUsedSpells = false, storageSupported = false;

    if (typeof(Storage) !== 'undefined') {
        storageSupported = true;
        showUsedSpells = localStorage.getItem('show-used-spells') === 'true';
    }

    const frames = (framesJson && framesJson.frames) ? framesJson.frames : undefined;
    const spells = spellsJson;

    const colorShiftsShifts = spells
        .filter(spell => spell[SPELL_PROPERTIES.TYPE] === SPELL_TYPES.HUE_SHIFT);

    const colorShiftsBlends = spells
        .filter(spell => {
            const spellType = spell[SPELL_PROPERTIES.TYPE];
            
            if (spellType === SPELL_TYPES.COLOR
                || spellType === SPELL_TYPES.OVERLAY
                || spellType === SPELL_TYPES.DARKEN
                || spellType === SPELL_TYPES.NORMAL
                || spellType === SPELL_TYPES.SCREEN
                || spellType === SPELL_TYPES.SOFT_LIGHT
            ) {
                return true;
            }

            return false;
        })
        .map(spell => {
            const spellValue = spell[SPELL_PROPERTIES.VALUE];
            const { hue, saturation, lightness} = decToHSLObject(spellValue);

            return {
                ...spell, 
                backgroundColor: `#${zeroPad(decToHex(spellValue), 6)}`,
                hue,
                saturation,
                lightness
            }
        });

    const filters = spells.filter(spell => spell[SPELL_PROPERTIES.TYPE] === SPELL_TYPES.FILTER);

    const textColors = spells
        .filter(spell => spell[SPELL_PROPERTIES.TYPE] === SPELL_TYPES.TEXT_COLOR)
        .map(spell => {
            const spellValue = spell[SPELL_PROPERTIES.VALUE];
            const { hue, saturation, lightness} = decToHSLObject(spellValue);

            return {
                ...spell,
                color: `#${zeroPad(decToHex(spellValue), 6)}`,
                hue,
                saturation,
                lightness
            }
        });

    const textGlows = spells
        .filter(spell => spell[SPELL_PROPERTIES.TYPE] === SPELL_TYPES.TEXT_GLOW)
        .map(spell => {
            const spellValue = spell[SPELL_PROPERTIES.VALUE];
            const intensity = spell[SPELL_PROPERTIES.VALUE2];

            const { hue, saturation, lightness} = decToHSLObject(spellValue);

            return {
                ...spell,
                color: `#${zeroPad(decToHex(spellValue), 6)}`,
                hue,
                saturation,
                lightness,
                intensity
            }
        });

    const textFonts = spells
        .filter(spell => spell[SPELL_PROPERTIES.TYPE] === SPELL_TYPES.TEXT_FONT)
        .map(spell => {
            const fontFamily = SPELL_FONTS[spell[SPELL_PROPERTIES.VALUE]];

            return {
                ...spell,
                fontFamily
            };
        });

    store.dispatch(setStorageSupported(storageSupported));

    store.dispatch(addBlends(colorShiftsBlends));
    store.dispatch(addFonts(textFonts));
    if (frames) {
        store.dispatch(addFrames(frames));
    }
    store.dispatch(addShifts(colorShiftsShifts));
    store.dispatch(addSpecials(filters));
    store.dispatch(addTextColors(textColors));
    store.dispatch(addTextGlows(textGlows));
    store.dispatch(setShowUsedSpellsOnly(showUsedSpells));

    return store;
};

export const clearStore = (store) => {
    // Do not clear frames, they are not fetched from the API
    store.dispatch(clearBlends());
    store.dispatch(clearFonts());
    store.dispatch(clearShifts());
    store.dispatch(clearSpecials());
    store.dispatch(clearTextColors());
    store.dispatch(clearTextGlows());

    return store;
};
