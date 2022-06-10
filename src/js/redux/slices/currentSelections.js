import { createSlice } from '@reduxjs/toolkit';
import { isEqual } from 'lodash';
import { createSelector } from 'reselect';

// Other Slices
import { setSearchBlend, setSearchBlendType, setSearchBlendType_Type } from './searches/blend';

// Utilities
import { SPELL_PROPERTIES, SPELL_TYPES } from '../../utilities/constants';
import { checkAngleSeparation } from '../../utilities/utilities';

const initialState = {
    blend: undefined,
    blendFilters: {
        [SPELL_TYPES.COLOR]: true,
        [SPELL_TYPES.DARKEN]: true,
        [SPELL_TYPES.NORMAL]: true,
        [SPELL_TYPES.OVERLAY]: true,
        [SPELL_TYPES.SCREEN]: true,
        [SPELL_TYPES.SOFT_LIGHT]: true,
    },
    blendSearchHue: 0,
    characterImage: undefined,
    continuousShift: undefined,
    frame: {
        "name": "Default",
        "image": "default",
        "defaultFont": "D-DIN Condensed Bold",
        "defaultColor": "hsl(0,0%,0%)",
        "nameOnly": false
    },
    font: undefined,
    name: 'Name',
    series: 'Series',
    special: undefined,
    specificShift: undefined,
    testFont: undefined,
    textColor: undefined
};

const currentSelectionsSlice = createSlice({
    name: 'currentSelections',
    initialState,
    reducers: {
        clearCurrentBlendAndShift: (state, action) => {
            state.blend = undefined;
            state.continuousShift = undefined;
            state.specificShift = undefined;
        },
        setCurrentBlend: (state, action) => {
            state.blend = action.payload;
            
            if (action.payload) {
                state.continuousShift = undefined;
                state.specificShift = undefined;
            }
        },
        setCurrentBlendFilters: (state, action) => {
            let newFilters = action.payload;

            state.blendFilters = newFilters;

            // If the current blend's type is false in the new filters, blank out the current blend
            if (state.blend && !newFilters[state.blend[SPELL_PROPERTIES.TYPE]]) {
                state.blend = undefined;
            }
        },
        setCurrentBlendSearchHue: (state, action) => {
            state.blendSearchHue = action.payload;
        },
        setCurrentCharacterImage: (state, action) => {
            state.characterImage = action.payload;
        },
        setContinuousShift: (state, action) => {
            state.blend = undefined;
            state.continuousShift = action.payload;
            state.specificShift = undefined;
        },
        setCurrentFont: (state, action) => {
            state.font = action.payload;
            state.testFont = undefined;
        },
        setCurrentFrame: (state, action) => {
            state.frame = action.payload;
        },
        setCurrentName: (state, action) => {
            state.name = action.payload;
        },
        setCurrentSeries: (state, action) => {
            state.series = action.payload;
        },
        setSpecificShift: (state, action) => {
            if (action.payload) {
                state.blend = undefined;
            }

            state.continuousShift = action.payload;
            state.specificShift = action.payload;
        },
        setCurrentTestFont: (state, action) => {
            state.font = undefined;
            state.testFont = action.payload;
        },
        setCurrentTextColor: (state, action) => {
            state.textColor = action.payload;
        }
    }
});

export default currentSelectionsSlice.reducer;

const {
    clearCurrentBlendAndShift
} = currentSelectionsSlice.actions;

export const {
    setContinuousShift,
    setCurrentBlend,
    setCurrentBlendFilters,
    setCurrentBlendSearchHue,
    setCurrentCharacterImage,
    setCurrentFont,
    setCurrentFrame,
    setCurrentName,
    setCurrentSeries,
    setCurrentTestFont,
    setCurrentTextColor,
    setSpecificShift
} = currentSelectionsSlice.actions;

export const selectContinuousShift = state => state.currentSelections.continuousShift;
export const selectCurrentBlend = state => state.currentSelections.blend;
export const selectCurrentBlendFilters = state => state.currentSelections.blendFilters;
export const selectCurrentBlendSearchHue = state => state.currentSelections.blendSearchHue;
export const selectCurrentCharacterImage = state => state.currentSelections.characterImage;
export const selectCurrentFont = state => state.currentSelections.font;
export const selectCurrentFrame = state => state.currentSelections.frame;
export const selectCurrentName = state => state.currentSelections.name;
export const selectCurrentSeries = state => state.currentSelections.series;
export const selectCurrentTestFont = state => state.currentSelections.testFont;
export const selectCurrentTextColor = state => state.currentSelections.textColor;
export const selectSpecificShift = state => state.currentSelections.specificShift;

// How far to search for matching shifts
const ACCEPTABLE_DEGREES_OF_SEPARATION = 10;

export const selectNearbyShifts = createSelector(
    state => state.colorShifts.shifts,
    state => state.currentSelections.specificShift,
    ( shifts, specificShift ) => {
        if (specificShift) {
            let specificValue = specificShift[SPELL_PROPERTIES.VALUE];
            let shiftsArray = Object.values(shifts.entities);

            return shiftsArray.filter(shift => checkAngleSeparation(specificValue, shift[SPELL_PROPERTIES.VALUE], ACCEPTABLE_DEGREES_OF_SEPARATION)).sort((a, b) => a[SPELL_PROPERTIES.VALUE] - b[SPELL_PROPERTIES.VALUE]);
        }

        return [];
    }
);

export const selectFilteredBlends = createSelector(
    state => state.colorShifts.blends,
    state => state.currentSelections.blendFilters,
    ( blends, blendFilters) => {
        // If there is at least one blendFilter set to true
        if (Object.values(blendFilters).some(value => value)) {
            let { ids, entities } = blends;

            // The ids are sorted, the entities are not
            return ids.reduce((returnArray, id) => {
                const blend = entities[id];
                const spellType = blend[SPELL_PROPERTIES.TYPE];

                if (blendFilters[spellType]) {
                    returnArray.push(blend);
                }

                return returnArray;
            }, []);
        }

        return [];
    },
    {
        memoizeOptions: {
            maxSize: 63,
            equalityCheck: isEqual,
            resultEqualityCheck: isEqual
        }
    }
);

// Middleware
const setCurrentBlend_Type = setCurrentBlend.toString();
const setContinuousShift_Type = setContinuousShift.toString();
const setSpecificShift_Type = setSpecificShift.toString();

export const currentSelectionsMiddleware = storeApi => next => action => {
    let { dispatch, getState } = storeApi;

    if (typeof action === 'function') {
        return action(dispatch, getState);
    }
    else {
        switch (action.type) {
            // Blank out the search blend type when the continuous shift, blend spell, or shift spell are set
            case setContinuousShift_Type: {
                dispatch(setSearchBlendType(undefined));
                break;
            }
            case setCurrentBlend_Type: {
                dispatch(setSearchBlend(action.payload));
                break;
            }
            case setSpecificShift_Type: {
                if (action.payload) {
                    dispatch(setSearchBlendType(undefined));
                }

                break;
            }
            // When the search blend type is set, update the blend filters and blank out the continuuous shift, blend spell, and shift spell
            case setSearchBlendType_Type: {
                let blendType = action.payload;

                if (blendType !== undefined) {
                    let checked = blendType === -1;

                    let newFilters = {
                        [SPELL_TYPES.COLOR]: checked,
                        [SPELL_TYPES.DARKEN]: checked,
                        [SPELL_TYPES.NORMAL]: checked,
                        [SPELL_TYPES.OVERLAY]: checked,
                        [SPELL_TYPES.SCREEN]: checked,
                        [SPELL_TYPES.SOFT_LIGHT]: checked
                    };

                    if (!checked) {
                        newFilters[blendType] = true;
                    }

                    dispatch(setCurrentBlendFilters(newFilters));
                    dispatch(clearCurrentBlendAndShift());
                }

                break;
            }
            default:
                break;
        }

        return next(action);
    }
};