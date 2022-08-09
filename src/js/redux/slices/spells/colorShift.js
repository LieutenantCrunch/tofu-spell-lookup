import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';
import { createSelector } from 'reselect';

// Utilities
import { SPELL_PROPERTIES } from '../../../utilities/constants';

const shiftsAdapter = createEntityAdapter({
    selectId: spell => spell[SPELL_PROPERTIES.SPELL_CODE],
    sortComparer: (a, b) => (a[SPELL_PROPERTIES.VALUE] - b[SPELL_PROPERTIES.VALUE])
})

const blendsAdapter = createEntityAdapter({
    selectId: spell => spell[SPELL_PROPERTIES.SPELL_CODE],
    sortComparer: (a, b) => (a.hue - b.hue)
});

let initialShiftsState = shiftsAdapter.getInitialState();
let initialBlendsState = blendsAdapter.getInitialState();

const initialState = {
    shifts: initialShiftsState,
    blends: initialBlendsState
};

const colorShiftSpellsSlice = createSlice({
    name: 'colorShifts',
    initialState,
    reducers: {
        addShifts: (state, action) => {
            shiftsAdapter.addMany(state.shifts, action.payload);
        },
        addBlends: (state, action) => {
            blendsAdapter.addMany(state.blends, action.payload)
        },
        clearShifts: (state, action) => {
            shiftsAdapter.removeAll(state.shifts);
        },
        clearBlends: (state, action) => {
            blendsAdapter.removeAll(state.blends);
        }
    }
});

export default colorShiftSpellsSlice.reducer;

export const { addShifts: addShifts, addBlends, clearShifts, clearBlends } = colorShiftSpellsSlice.actions;

const globalizedShiftSelectors = shiftsAdapter.getSelectors(state => state.colorShifts.shifts);
const globalizedBlendSelectors = blendsAdapter.getSelectors(state => state.colorShifts.blends);

//export const selectAllColorShiftShifts = globalizedShiftSelectors.selectAll;
//export const selectAllColorShiftBlends = globalizedBlendSelectors.selectAll;
export const selectShiftById = globalizedShiftSelectors.selectById;
export const selectBlendById = globalizedBlendSelectors.selectById;

export const selectAllColorShiftShifts = createSelector(
    state => state.colorShifts.shifts,
    state => state.currentSelections.showUsedSpells,
    ( shifts, showUsedSpells ) => {
        let shiftsArray = Object.values(shifts.entities);

        if (!showUsedSpells) {
            return shiftsArray.filter(shift => !shift[SPELL_PROPERTIES.USED]).sort((a, b) => a[SPELL_PROPERTIES.VALUE] - b[SPELL_PROPERTIES.VALUE]);
        }

        return shiftsArray;
    }
);

