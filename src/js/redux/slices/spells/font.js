import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';


const fontsAdapter = createEntityAdapter({
    selectId: spell => spell.id,
    sortComparer: (a, b) => a.name.localeCompare(b.name)
});

const initialState = fontsAdapter.getInitialState();

const fontSpellsSlice = createSlice({
    name: 'fonts',
    initialState,
    reducers: {
        addFonts: fontsAdapter.addMany
    }
});

export default fontSpellsSlice.reducer;

export const { addFonts } = fontSpellsSlice.actions;

const globalizedSelectors = fontsAdapter.getSelectors(state => state.fonts);

export const selectAllFonts = globalizedSelectors.selectAll;
