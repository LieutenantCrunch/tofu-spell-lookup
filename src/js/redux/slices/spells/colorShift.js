import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';

const hueAdapter = createEntityAdapter({
    selectId: spell => spell.id,
    sortComparer: (a, b) => (a.value - b.value)
})

const rotateAdapter = createEntityAdapter({
    selectId: spell => spell.id,
    sortComparer: (a, b) => (a.value - b.value)
});

let initialHueState = hueAdapter.getInitialState();
let initialRotateState = rotateAdapter.getInitialState();

const initialState = {
    hues: initialHueState,
    rotates: initialRotateState
};

const colorShiftSpellsSlice = createSlice({
    name: 'colorShifts',
    initialState,
    reducers: {
        addHues: (state, action) => {
            hueAdapter.addMany(state.hues, action.payload);
        },
        addRotates: (state, action) => {
            rotateAdapter.addMany(state.rotates, action.payload)
        }
    }
});

export default colorShiftSpellsSlice.reducer;

export const { addHues, addRotates } = colorShiftSpellsSlice.actions;

const globalizedHueSelectors = hueAdapter.getSelectors(state => state.colorShifts.hues);
const globalizedRotateSelectors = rotateAdapter.getSelectors(state => state.colorShifts.rotates);

export const selectAllColorShiftHues = globalizedHueSelectors.selectAll;
export const selectAllColorShiftRotates = globalizedRotateSelectors.selectAll;
export const selectHueById = globalizedHueSelectors.selectById;
export const selectRotateById = globalizedRotateSelectors.selectById;
