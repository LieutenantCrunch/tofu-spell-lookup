import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    hue: null,
    rotate: null,
    frame: 'Default',
    font: null,
    special: null,
    textColor: null
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
            state.rotate = null;
        },
        setCurrentRotate: (state, action) => {
            state.hue = null;
            state.rotate = action.payload;
        }
    }
});

export default currentSelectionsSlice.reducer;

export const {
    setCurrentFrame,
    setCurrentHue,
    setCurrentRotate
} = currentSelectionsSlice.actions;

export const selectCurrentFrame = state => state.currentSelections.frame;
export const selectCurrentHue = state => state.currentSelections.hue;
export const selectCurrentRotate = state => state.currentSelections.rotate;