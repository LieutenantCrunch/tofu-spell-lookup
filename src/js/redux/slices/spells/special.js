import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';

const specialsAdapter = createEntityAdapter({
    selectId: spell => spell.id,
    sortComparer: (a, b) => a.name.localeCompare(b.name)
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
