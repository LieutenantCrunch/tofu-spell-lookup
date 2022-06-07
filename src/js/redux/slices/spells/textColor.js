import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';

// Utilities
import { SPELL_PROPERTIES } from '../../../utilities/constants';

const textColorsAdapter = createEntityAdapter({
    selectId: spell => spell[SPELL_PROPERTIES.SPELL_CODE],
    sortComparer: (a, b) => (a.hue - b.hue)
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
