import { createSlice } from '@reduxjs/toolkit';
import { createSelector } from 'reselect';
import { checkAngleSeparation } from '../../components/utilities/utilities';

const initialState = {
    hue: undefined,
    continuousRotate: undefined,
    frame: {
        "name": "Default",
        "image": "default"
    },
    font: undefined,
    special: undefined,
    specificRotate: undefined,
    textColor: undefined
};

const currentSelectionsSlice = createSlice({
    name: 'currentSelections',
    initialState,
    reducers: {
        setCurrentFrame: (state, action) => {
            state.frame = action.payload;
        },
        setCurrentHue: (state, action) => {
            state.hue = action.payload;
            state.continuousRotate = undefined
            state.specificRotate = undefined;
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
        }
    }
});

export default currentSelectionsSlice.reducer;

export const {
    setCurrentFrame,
    setCurrentHue,
    setContinuousRotate,
    setSpecificRotate
} = currentSelectionsSlice.actions;

export const selectCurrentFrame = state => state.currentSelections.frame;
export const selectCurrentHue = state => state.currentSelections.hue;
export const selectContinuousRotate = state => state.currentSelections.continuousRotate;
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
