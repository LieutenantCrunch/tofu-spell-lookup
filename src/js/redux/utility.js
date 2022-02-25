import framesJson from '../../data/frames.json';
import spellsJson from '../../data/spells.json';

import { addFrames } from './slices/frames';
import { addHues, addRotates } from './slices/spells/colorShift';
import { addFonts } from './slices/spells/font';
import { addSpecials } from './slices/spells/special';
import { addTextColors } from './slices/spells/textColor';

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
