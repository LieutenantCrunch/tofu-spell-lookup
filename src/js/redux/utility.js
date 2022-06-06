import framesJson from '../../data/frames.json';
import spellsJson from '../../data/spells.json';

import { addFrames } from './slices/frames';
import { addBlends, addShifts, clearBlends, clearShifts } from './slices/spells/colorShift';
import { addFonts, clearFonts } from './slices/spells/font';
import { addSpecials, clearSpecials } from './slices/spells/special';
import { addTextColors, clearTextColors } from './slices/spells/textColor';

// Utilities
import { SPELL_PROPERTIES, SPELL_TYPES } from '../utilities/constants';

const { frames } = framesJson;
const spells = spellsJson;

const colorShiftsShifts = spells.filter(spell => !spell[SPELL_PROPERTIES.USED] && spell[SPELL_PROPERTIES.TYPE] === SPELL_TYPES.HUE_SHIFT);
const colorShiftsBlends = spells.filter(spell => {
    const used = spell[SPELL_PROPERTIES.USED];

    if (used) {
        return false;
    }

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
});
const filters = spells.filter(spell => !spell[SPELL_PROPERTIES.USED] && spell[SPELL_PROPERTIES.TYPE] === SPELL_TYPES.FILTER);
const textColors = spells.filter(spell => !spell[SPELL_PROPERTIES.USED] && spell[SPELL_PROPERTIES.TYPE] === SPELL_TYPES.TEXT_COLOR);
const textFonts = spells.filter(spell => !spell[SPELL_PROPERTIES.USED] && spell[SPELL_PROPERTIES.TYPE] === SPELL_TYPES.TEXT_FONT);

export const populateStore = (store) => {
    store.dispatch(addBlends(colorShiftsBlends));
    store.dispatch(addFonts(textFonts));
    store.dispatch(addFrames(frames));
    store.dispatch(addShifts(colorShiftsShifts));
    store.dispatch(addSpecials(filters));
    store.dispatch(addTextColors(textColors));

    return store;
};

export const clearStore = (store) => {
    // Do not clear frames, they are not fetched from the API
    store.dispatch(clearBlends());
    store.dispatch(clearFonts());
    store.dispatch(clearShifts());
    store.dispatch(clearSpecials());
    store.dispatch(clearTextColors());

    return store;
};
