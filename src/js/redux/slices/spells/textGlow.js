import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';

// Utilities
import { SPELL_PROPERTIES } from '../../../utilities/constants';

const textGlowsAdapter = createEntityAdapter({
    selectId: spell => spell[SPELL_PROPERTIES.SPELL_CODE],
    sortComparer: (a, b) => (a.hue - b.hue)
});

const initialState = textGlowsAdapter.getInitialState();

const textGlowSpellsSlice = createSlice({
    name: 'textGlows',
    initialState,
    reducers: {
        addTextGlows: textGlowsAdapter.addMany,
        clearTextGlows: textGlowsAdapter.removeAll
    }
});

export default textGlowSpellsSlice.reducer;

export const { addTextGlows, clearTextGlows } = textGlowSpellsSlice.actions;

const globalizedSelectors = textGlowsAdapter.getSelectors(state => state.textGlows);

export const selectAllTextGlows = globalizedSelectors.selectAll;
