import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';

const framesAdapter = createEntityAdapter({
    selectId: spell => spell.name,
    sortComparer: (a, b) => a.name.localeCompare(b.name)
});

const initialState = framesAdapter.getInitialState();

const framesSlice = createSlice({
    name: 'frames',
    initialState,
    reducers: {
        addFrames: framesAdapter.addMany
    }
});

export default framesSlice.reducer;

export const { addFrames } = framesSlice.actions;

const globalizedSelectors = framesAdapter.getSelectors(state => state.frames);

export const selectAllFrames = globalizedSelectors.selectAll;
export const selectFrameByName = globalizedSelectors.selectById;