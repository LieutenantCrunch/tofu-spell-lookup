import { createSlice } from '@reduxjs/toolkit';
import { createSelector } from 'reselect';

// Utilities
import { SPELL_PROPERTIES } from '../../utilities/constants';
import { checkAngleSeparation } from '../../utilities/utilities';

const initialState = {
    blend: undefined,
    characterImage: undefined,
    continuousShift: undefined,
    frame: {
        "name": "Default",
        "image": "default",
        "defaultFont": "SourceSansPro SemiBold",
        "defaultColor": "hsl(0,0%,0%)",
        "nameOnly": false
    },
    font: undefined,
    name: 'Name',
    series: 'Series',
    special: undefined,
    specificShift: undefined,
    textColor: undefined
};

const currentSelectionsSlice = createSlice({
    name: 'currentSelections',
    initialState,
    reducers: {
        setCurrentBlend: (state, action) => {
            state.blend = action.payload;
            state.continuousShift = undefined;
            state.specificShift = undefined;
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
            state.blend = undefined;
            state.continuousShift = action.payload;
            state.specificShift = action.payload;
        },
        setCurrentTextColor: (state, action) => {
            state.textColor = action.payload;
        }
    }
});

export default currentSelectionsSlice.reducer;

export const {
    setContinuousShift,
    setCurrentBlend,
    setCurrentCharacterImage,
    setCurrentFont,
    setCurrentFrame,
    setCurrentName,
    setCurrentSeries,
    setCurrentTextColor,
    setSpecificShift
} = currentSelectionsSlice.actions;

export const selectContinuousShift = state => state.currentSelections.continuousShift;
export const selectCurrentBlend = state => state.currentSelections.blend;
export const selectCurrentCharacterImage = state => state.currentSelections.characterImage;
export const selectCurrentFont = state => state.currentSelections.font;
export const selectCurrentFrame = state => state.currentSelections.frame;
export const selectCurrentName = state => state.currentSelections.name;
export const selectCurrentSeries = state => state.currentSelections.series;
export const selectCurrentTextColor = state => state.currentSelections.textColor;
export const selectSpecificShift = state => state.currentSelections.specificShift;

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
