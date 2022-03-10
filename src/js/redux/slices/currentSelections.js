import { createSlice } from '@reduxjs/toolkit';
import { createSelector } from 'reselect';
import { checkAngleSeparation } from '../../components/utilities/utilities';

const initialState = {
    hue: undefined,
    continuousRotate: undefined,
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
    specificRotate: undefined,
    textColor: undefined
};

const currentSelectionsSlice = createSlice({
    name: 'currentSelections',
    initialState,
    reducers: {
        setCurrentFont: (state, action) => {
            state.font = action.payload;
        },
        setCurrentFrame: (state, action) => {
            state.frame = action.payload;
        },
        setCurrentHue: (state, action) => {
            state.hue = action.payload;
            state.continuousRotate = undefined
            state.specificRotate = undefined;
        },
        setCurrentName: (state, action) => {
            state.name = action.payload;
        },
        setContinuousRotate: (state, action) => {
            state.hue = undefined;
            state.continuousRotate = action.payload;
            state.specificRotate = undefined;
        },
        setSpecificRotate: (state, action) => {
            state.hue = undefined;
            state.continuousRotate = action.payload;
            state.specificRotate = action.payload;
        },
        setCurrentSeries: (state, action) => {
            state.series = action.payload;
        },
        setCurrentTextColor: (state, action) => {
            state.textColor = action.payload;
        }
    }
});

export default currentSelectionsSlice.reducer;

export const {
    setContinuousRotate,
    setCurrentFont,
    setCurrentFrame,
    setCurrentHue,
    setCurrentName,
    setCurrentSeries,
    setCurrentTextColor,
    setSpecificRotate
} = currentSelectionsSlice.actions;

export const selectContinuousRotate = state => state.currentSelections.continuousRotate;
export const selectCurrentFont = state => state.currentSelections.font;
export const selectCurrentFrame = state => state.currentSelections.frame;
export const selectCurrentHue = state => state.currentSelections.hue;
export const selectCurrentName = state => state.currentSelections.name;
export const selectCurrentSeries = state => state.currentSelections.series;
export const selectCurrentTextColor = state => state.currentSelections.textColor;
export const selectSpecificRotate = state => state.currentSelections.specificRotate;

const ACCEPTABLE_DEGREES_OF_SEPARATION = 10;

export const selectNearbyRotates = createSelector(
    state => state.colorShifts.rotates,
    state => state.currentSelections.specificRotate,
    ( rotates, specificRotate ) => {
        if (specificRotate) {
            let specificValue = specificRotate.value;
            let rotatesArray = Object.values(rotates.entities);

            return rotatesArray.filter(rotate => checkAngleSeparation(specificValue, rotate.value, ACCEPTABLE_DEGREES_OF_SEPARATION));
        }

        return [];
    }
);
