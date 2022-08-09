import { createSlice } from '@reduxjs/toolkit';
import { isEqual } from 'lodash';
import { createSelector } from 'reselect';

// Other Slices
import {
    setSearchBlend,
    setSearchBlend_Type,
    setSearchBlendHue_Type,
    setSearchBlendSaturation_Type,
    setSearchBlendLightness_Type,
    setSearchBlendType_Type
} from './searches/blend';
import {
    setSearchTextColor,
    setSearchTextColor_Type
} from './searches/textColor';

// Utilities
import { SPELL_PROPERTIES, SPELL_TYPES } from '../../utilities/constants';
import { checkAngleSeparation } from '../../utilities/utilities';

const initialState = {
    blendFilters: {
        [SPELL_TYPES.COLOR]: true,
        [SPELL_TYPES.DARKEN]: true,
        [SPELL_TYPES.NORMAL]: true,
        [SPELL_TYPES.OVERLAY]: true,
        [SPELL_TYPES.SCREEN]: true,
        [SPELL_TYPES.SOFT_LIGHT]: true,
    },
    cardCode: '',
    characterImage: undefined,
    continuousShift: undefined,
    frame: {
        "name": "Default",
        "image": "default",
        "defaultFont": "D-DIN Condensed Bold",
        "defaultHue": 0,
        "defaultSaturation": 0,
        "defaultLightness": 0,
        "nameOnly": false
    },
    font: undefined,
    name: 'Name',
    series: 'Series',
    showUsedSpells: false,
    special: undefined,
    specificShift: undefined,
    storageSupported: false,
    tempShift: undefined,
    testFont: undefined
};

const currentSelectionsSlice = createSlice({
    name: 'currentSelections',
    initialState,
    reducers: {
        clearCurrentTempShift: (state, action) => {
            if (state.tempShift) {
                let spellCode = action.payload;

                if (state.tempShift[SPELL_PROPERTIES.SPELL_CODE] === spellCode) {
                    state.tempShift = undefined;
                }
            }
        },
        setCurrentCardCode: (state, action) => {
            state.cardCode = action.payload;
        },
        setCurrentBlendFilters: (state, action) => {
            state.blendFilters = action.payload;
        },
        setCurrentCharacterImage: (state, action) => {
            state.characterImage = action.payload;
        },
        setContinuousShift: (state, action) => {
            state.continuousShift = action.payload;
            state.specificShift = undefined;
            state.tempShift = undefined;
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
            state.continuousShift = action.payload;
            state.specificShift = action.payload;
            state.tempShift = undefined;
        },
        setCurrentTempShift: (state, action) => {
            state.tempShift = action.payload;
        },
        setCurrentTestFont: (state, action) => {
            state.font = undefined;
            state.testFont = action.payload;
        },
        setShowUsedSpells: (state, action) => {
            state.showUsedSpells = action.payload;
            
            if (state.storageSupported) {
                localStorage.setItem('show-used-spells', action.payload)
            }
        },
        setShowUsedSpellsOnly: (state, action) => {
            state.showUsedSpells = action.payload;
        },
        setStorageSupported: (state, action) => {
            state.storageSupported = action.payload;
        }
    }
});

export default currentSelectionsSlice.reducer;

export const {
    clearCurrentTempShift,
    setContinuousShift,
    setCurrentBlendFilters,
    setCurrentCardCode,
    setCurrentCharacterImage,
    setCurrentFont,
    setCurrentFrame,
    setCurrentName,
    setCurrentSeries,
    setCurrentTempShift,
    setCurrentTestFont,
    setShowUsedSpells,
    setShowUsedSpellsOnly,
    setSpecificShift,
    setStorageSupported
} = currentSelectionsSlice.actions;

export const selectContinuousShift = state => state.currentSelections.continuousShift;
export const selectCurrentBlendFilters = state => state.currentSelections.blendFilters;
export const selectCurrentCardCode = state => state.currentSelections.cardCode;
export const selectCurrentCharacterImage = state => state.currentSelections.characterImage;
export const selectCurrentFont = state => state.currentSelections.font;
export const selectCurrentFrame = state => state.currentSelections.frame;
export const selectCurrentName = state => state.currentSelections.name;
export const selectCurrentSeries = state => state.currentSelections.series;
export const selectCurrentTempShift = state => state.currentSelections.tempShift;
export const selectCurrentTestFont = state => state.currentSelections.testFont;
export const selectShowUsedSpells = state => state.currentSelections.showUsedSpells;
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
const setContinuousShift_Type = setContinuousShift.toString();
const setCurrentBlendFilters_Type = setCurrentBlendFilters.toString();
const setCurrentFrame_Type = setCurrentFrame.toString();
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
                dispatch(setSearchBlend(undefined));
                break;
            }
            case setCurrentBlendFilters_Type: {
                let newFilters = action.payload;
                let state = getState();

                let searchBlend = state.searches.blend.blend;

                // If they change the filters
                // and there's a searchBlend set and its type isn't checked
                if (searchBlend && !newFilters[searchBlend[SPELL_PROPERTIES.TYPE]]) {
                    // Clear it out
                    dispatch(setSearchBlend(undefined));
                }

                break;
            }
            case setCurrentFrame_Type: {
                // If the currentText color doesn't match current frame, do nothing
                // Else, if the new frame doesn't match current frame, create fake text color spell
                const state = getState();

                // Current Frame
                let { defaultHue: cfHue, defaultSaturation: cfSaturation, defaultLightness: cfLightness } = state.currentSelections.frame;

                // Current Text Color
                let { hue, saturation, lightness } = state.searches.textColor;

                // New Frame
                let { defaultHue: newHue, defaultSaturation: newSaturation, defaultLightness: newLightness } = action.payload;

                if (hue === cfHue && saturation === cfSaturation && lightness === cfLightness) {
                    if (newHue !== cfHue || newSaturation !== cfSaturation || newLightness !== cfLightness) {
                        let fakeSpell = {
                            [SPELL_PROPERTIES.SPELL_CODE]: 'fake',
                            [SPELL_PROPERTIES.TYPE]: SPELL_TYPES.TEXT_COLOR,
                            hue: newHue,
                            saturation: newSaturation,
                            lightness: newLightness
                        };

                        dispatch(setSearchTextColor(fakeSpell));
                    }
                }

                break;
            }
            case setSpecificShift_Type: {
                if (action.payload) {
                    dispatch(setSearchBlend(undefined));
                }

                break;
            }
            // When the search blend is set, as long as it's not undefined, clear the current shifts
            case setSearchBlend_Type: {
                let blend = action.payload;

                if (blend !== undefined) {
                    dispatch(setSpecificShift(undefined));
                }

                break;
            }
            case setSearchBlendHue_Type:
            case setSearchBlendSaturation_Type: 
            case setSearchBlendLightness_Type: {
                dispatch(setSpecificShift(undefined));
                break;
            }
            // When they set the searchBlendType, if it's defined clear out all blend filters except the one that is selected
            case setSearchBlendType_Type: {
                let blendType = action.payload;

                // If a blend type was specified
                if (blendType !== undefined) {
                    // and if the type is ALL, then all types should be checked
                    // Else, none should be checked
                    let checked = blendType === SPELL_TYPES.ALL;

                    let newFilters = {
                        [SPELL_TYPES.COLOR]: checked,
                        [SPELL_TYPES.DARKEN]: checked,
                        [SPELL_TYPES.NORMAL]: checked,
                        [SPELL_TYPES.OVERLAY]: checked,
                        [SPELL_TYPES.SCREEN]: checked,
                        [SPELL_TYPES.SOFT_LIGHT]: checked
                    };

                    // Except the specific type being sent in
                    if (!checked) {
                        newFilters[blendType] = true;
                    }

                    // Update the blend filters
                    dispatch(setCurrentBlendFilters(newFilters));

                    // And clear the current shifts
                    dispatch(setSpecificShift(undefined));
                }
            }
            case setSearchTextColor_Type: {
                if (!action.payload) {
                    const state = getState();

                    let { defaultHue, defaultSaturation, defaultLightness } = state.currentSelections.frame;

                    action.payload = {
                        [SPELL_PROPERTIES.SPELL_CODE]: 'fake',
                        [SPELL_PROPERTIES.TYPE]: SPELL_TYPES.TEXT_COLOR,
                        hue: defaultHue,
                        saturation: defaultSaturation,
                        lightness: defaultLightness
                    };
                }
                break;
            }
            default:
                break;
        }

        return next(action);
    }
};