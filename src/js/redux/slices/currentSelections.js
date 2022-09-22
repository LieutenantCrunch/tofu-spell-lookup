import { createSlice } from '@reduxjs/toolkit';

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
import { HIGHLIGHT_NEW_SPELLS_OPTIONS, HIGHLIGHT_STYLE_OPTIONS, SPELL_PROPERTIES, SPELL_TYPES, STORAGE_SUPPORTED } from '../../utilities/constants';

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
    highlightNewSpells: HIGHLIGHT_NEW_SPELLS_OPTIONS.PAST_24_HOURS.key,
    highlightStyle: HIGHLIGHT_STYLE_OPTIONS.NEW_LABEL.key,
    lastVisit: Date.now(),
    name: 'Name',
    series: 'Series',
    showUsedSpells: false,
    special: undefined,
    specificShift: undefined,
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
        setHighlightNewSpells: (state, action) => {
            state.highlightNewSpells = action.payload;

            if (STORAGE_SUPPORTED) {
                localStorage.setItem('highlight-new-spells', action.payload);

                // If they turn on Last Visit, make sure there's a value stored
                // Normally the last-visit is set on page load if they're using last-visit, so we only need to set it if it's not already been used
                if (action.payload === HIGHLIGHT_NEW_SPELLS_OPTIONS.LAST_VISIT.key) {
                    const storageLastVisit = localStorage.getItem('last-visit');

                    if (!(!!storageLastVisit)) {
                        localStorage.setItem('last-visit', state.lastVisit);
                    }
                }
            }
        },
        setHighlightNewSpellsOnly: (state, action) => {
            state.highlightNewSpells = action.payload;
        },
        setHighlightStyle: (state, action) => {
            state.highlightStyle = action.payload;

            if (STORAGE_SUPPORTED) {
                localStorage.setItem('highlight-style', action.payload);
            }
        },
        setHighlightStyleOnly: (state, action) => {
            state.highlightStyle = action.payload;
        },
        setLastVisit: (state, action) => {
            state.lastVisit = action.payload;
        },
        setShowUsedSpells: (state, action) => {
            state.showUsedSpells = action.payload;
            
            if (STORAGE_SUPPORTED) {
                localStorage.setItem('show-used-spells', action.payload);
            }
        },
        setShowUsedSpellsOnly: (state, action) => {
            state.showUsedSpells = action.payload;
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
    setHighlightNewSpells,
    setHighlightNewSpellsOnly,
    setHighlightStyle,
    setHighlightStyleOnly,
    setLastVisit,
    setShowUsedSpells,
    setShowUsedSpellsOnly,
    setSpecificShift,
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
export const selectHighlightNewSpells = state => state.currentSelections.highlightNewSpells;
export const selectHighlightStyle = state => state.currentSelections.highlightStyle;
export const selectLastVisit = state => state.currentSelections.lastVisit;
export const selectShowUsedSpells = state => state.currentSelections.showUsedSpells;
export const selectSpecificShift = state => state.currentSelections.specificShift;

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
