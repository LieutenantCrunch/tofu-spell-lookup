import framesJson from '../../data/frames.json';
import spellsJson from '../../data/spells.json';

import { addFrames } from './slices/frames';
import { addHues, addRotates, clearHues, clearRotates } from './slices/spells/colorShift';
import { addFonts, clearFonts } from './slices/spells/font';
import { addSpecials, clearSpecials } from './slices/spells/special';
import { addTextColors, clearTextColors } from './slices/spells/textColor';

const { frames } = framesJson;
const { colorShift, font, special, textColor } = spellsJson;

const colorShiftHues = colorShift.filter(spell => spell.type === 'hue');
const colorShiftRotates = colorShift.filter(spell => spell.type === 'rotate');

export const populateStore = (store) => {
    store.dispatch(addFrames(frames));
    store.dispatch(addHues(colorShiftHues));
    store.dispatch(addRotates(colorShiftRotates));
    store.dispatch(addFonts(font));
    store.dispatch(addSpecials(special));
    store.dispatch(addTextColors(textColor));

    return store;
};

export const clearStore = (store) => {
    // Do not clear frames, they are not fetched from the API
    store.dispatch(clearHues());
    store.dispatch(clearRotates());
    store.dispatch(clearFonts());
    store.dispatch(clearSpecials());
    store.dispatch(clearTextColors());

    return store;
};
