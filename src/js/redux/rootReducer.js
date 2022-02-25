import { combineReducers } from 'redux';

// Slices
import currentSelectionsReducer from './slices/currentSelections';
import framesReducer from './slices/frames';
import colorShiftReducer from './slices/spells/colorShift';
import fontReducer from './slices/spells/font';
import specialReducer from './slices/spells/special';
import textColorReducer from './slices/spells/textColor';

export const rootReducer = combineReducers({
    currentSelections: currentSelectionsReducer,
    frames: framesReducer,
    colorShifts: colorShiftReducer,
    fonts: fontReducer,
    specials: specialReducer,
    textColors: textColorReducer
});
