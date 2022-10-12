import { setHighlightNewSpellsOnly, setHighlightStyleOnly, setLastVisit, setShowUsedSpellsOnly } from './slices/currentSelections';
import { addFrames } from './slices/frames';
import { addBlends, addShifts, clearBlends, clearShifts } from './slices/spells/colorShift';
import { addFonts, clearFonts } from './slices/spells/font';
import { addSpecials, clearSpecials } from './slices/spells/special';
import { addTextColors, clearTextColors } from './slices/spells/textColor';
import { addTextGlows, clearTextGlows } from './slices/spells/textGlow';

// Utilities
import { HIGHLIGHT_NEW_SPELLS_OPTIONS, HIGHLIGHT_STYLE_OPTIONS, SPELL_FONTS, SPELL_PROPERTIES, SPELL_TYPES, STORAGE_SUPPORTED } from '../utilities/constants';
import { decToHex, decToHSLObject, zeroPad } from '../utilities/utilities';

const spellDateForSpell = (spell) => {
    const dateModified = spell[SPELL_PROPERTIES.DATE_MODIFIED];
    let spellDate = Date.parse(dateModified.replace(' ', 'T'));

    // Not all browsers support the date having the .12345+00 on the end of the of the date, strip that off and replace with Z instead
    if (isNaN(spellDate)) {
        spellDate = Date.parse(`${dateModified.substring(0, dateModified.indexOf('.'))}Z`);
    }

    return spellDate;
};

export const populateStore = (store, spellsJson, framesJson) => {
    let showUsedSpells = false;
    let highlightNewSpells = HIGHLIGHT_NEW_SPELLS_OPTIONS.PAST_24_HOURS.key;
    let highlightStyle = HIGHLIGHT_STYLE_OPTIONS.NEW_LABEL.key;
    let currentDate = Date.now();
    let lastVisit = currentDate;

    if (STORAGE_SUPPORTED) {
        showUsedSpells = localStorage.getItem('show-used-spells') === 'true';
        highlightNewSpells = localStorage.getItem('highlight-new-spells') || highlightNewSpells;
        highlightStyle = localStorage.getItem('highlight-style') || highlightStyle;
        
        const storageLastVisit = localStorage.getItem('last-visit');

        // If there was a value in localStorage
        if (!!storageLastVisit) {
            // Then update localStorage
            // Only do this if it was populated so we don't use localStorage if they haven't initiated it
            localStorage.setItem('last-visit', currentDate);

            // Update lastVisit to whatever was in storage
            lastVisit = storageLastVisit;
        }
    }

    const frames = (framesJson && framesJson.frames) ? framesJson.frames : undefined;
    const spells = spellsJson;

    const colorShiftsShifts = spells
        .filter(spell => spell[SPELL_PROPERTIES.TYPE] === SPELL_TYPES.HUE_SHIFT)
        .map(spell => ({
            ...spell,
            spellDate: spellDateForSpell(spell),
        }));

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
                lightness,
                spellDate: spellDateForSpell(spell),
            }
        });

    const filters = spells.filter(spell => spell[SPELL_PROPERTIES.TYPE] === SPELL_TYPES.FILTER)
        .map(spell => ({
            ...spell,
            spellDate: spellDateForSpell(spell),
        }));

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
                lightness,
                spellDate: spellDateForSpell(spell),
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
                intensity,
                spellDate: spellDateForSpell(spell),
            }
        });

    const textFonts = spells
        .filter(spell => (
            spell[SPELL_PROPERTIES.TYPE] === SPELL_TYPES.TEXT_FONT
            && SPELL_FONTS[spell[SPELL_PROPERTIES.VALUE]] !== undefined
        ))
        .map(spell => {
            const fontFamily = SPELL_FONTS[spell[SPELL_PROPERTIES.VALUE]];

            return {
                ...spell,
                fontFamily,
                spellDate: spellDateForSpell(spell),
            };
        });

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
    store.dispatch(setHighlightNewSpellsOnly(highlightNewSpells));
    store.dispatch(setHighlightStyleOnly(highlightStyle));
    store.dispatch(setLastVisit(lastVisit));

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
