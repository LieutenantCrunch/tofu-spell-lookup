import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';

// Utilities
import { SPELL_PROPERTIES } from '../../../utilities/constants';

const specialsAdapter = createEntityAdapter({
    selectId: spell => spell[SPELL_PROPERTIES.SPELL_CODE],
    sortComparer: (a, b) => (a[SPELL_PROPERTIES.VALUE] - b[SPELL_PROPERTIES.VALUE])
});

const initialState = specialsAdapter.getInitialState();

const specialSpellsSlice = createSlice({
    name: 'specials',
    initialState,
    reducers: {
        addSpecials: specialsAdapter.addMany,
        clearSpecials: specialsAdapter.removeAll
    }
});

export default specialSpellsSlice.reducer;

export const { addSpecials, clearSpecials } = specialSpellsSlice.actions;
