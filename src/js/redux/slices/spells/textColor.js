import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';

const textColorsAdapter = createEntityAdapter({
    selectId: spell => spell.id,
    sortComparer: (a, b) => a.value.localeCompare(b.value)
});

const initialState = textColorsAdapter.getInitialState();

const textColorSpellsSlice = createSlice({
    name: 'textColors',
    initialState,
    reducers: {
        addTextColors: textColorsAdapter.addMany,
        clearTextColors: textColorsAdapter.removeAll
    }
});

export default textColorSpellsSlice.reducer;

export const { addTextColors, clearTextColors } = textColorSpellsSlice.actions;

const globalizedSelectors = textColorsAdapter.getSelectors(state => state.textColors);

export const selectAllTextColors = globalizedSelectors.selectAll;
