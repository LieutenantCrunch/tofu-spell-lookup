import { combineReducers } from 'redux';

// Slices
import searchesReducer from './slices/searches/searches';
import currentSelectionsReducer from './slices/currentSelections';
import framesReducer from './slices/frames';
import colorShiftReducer from './slices/spells/colorShift';
import fontReducer from './slices/spells/font';
import specialReducer from './slices/spells/special';
import textColorReducer from './slices/spells/textColor';
import textGlowReducer from './slices/spells/textGlow';

export const rootReducer = combineReducers({
    currentSelections: currentSelectionsReducer,
    frames: framesReducer,
    colorShifts: colorShiftReducer,
    fonts: fontReducer,
    searches: searchesReducer,
    specials: specialReducer,
    textColors: textColorReducer,
    textGlows: textGlowReducer
});
