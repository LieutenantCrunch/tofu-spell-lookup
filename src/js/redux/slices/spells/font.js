import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';

// Utilities
import { SPELL_FONTS, SPELL_PROPERTIES } from '../../../utilities/constants';

const fontsAdapter = createEntityAdapter({
    selectId: spell => spell[SPELL_PROPERTIES.SPELL_CODE],
    sortComparer: (a, b) => (SPELL_FONTS[a[SPELL_PROPERTIES.VALUE]].localeCompare(SPELL_FONTS[b[SPELL_PROPERTIES.VALUE]]))
});

const initialState = fontsAdapter.getInitialState();

const fontSpellsSlice = createSlice({
    name: 'fonts',
    initialState,
    reducers: {
        addFonts: fontsAdapter.addMany,
        clearFonts: fontsAdapter.removeAll
    }
});

export default fontSpellsSlice.reducer;

export const { addFonts, clearFonts } = fontSpellsSlice.actions;

const globalizedSelectors = fontsAdapter.getSelectors(state => state.fonts);

export const selectAllFonts = globalizedSelectors.selectAll;
