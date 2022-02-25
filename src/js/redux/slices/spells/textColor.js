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
        addTextColors: textColorsAdapter.addMany
    }
});

export default textColorSpellsSlice.reducer;

export const { addTextColors } = textColorSpellsSlice.actions;
