import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';
import { isEqual } from 'lodash';
import { createSelector } from 'reselect';

// Utilities
import { SPELL_PROPERTIES } from '../../../utilities/constants';
import { checkAngleSeparation } from '../../../utilities/utilities';

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

export const selectAllColorShiftShifts = createSelector(
    [state => state.colorShifts.shifts,
    state => state.currentSelections.showUsedSpells],
    ( shifts, showUsedSpells ) => {
        let { ids, entities } = shifts;

        if (showUsedSpells) {
            return shiftsAdapter.getSelectors().selectAll(shifts);
        }

        // The ids are sorted, the entities are not
        return ids.reduce((returnArray, id) => {
            const spell = entities[id];

            if (!spell[SPELL_PROPERTIES.USED]) {
                returnArray.push(spell);
            }

            return returnArray;
        }, []);
    }
);

export const selectAllColorShiftBlends = createSelector(
    [state => state.colorShifts.blends,
    state => state.currentSelections.showUsedSpells],
    ( shifts, showUsedSpells ) => {
        let { ids, entities } = shifts;

        if (showUsedSpells) {
            return shiftsAdapter.getSelectors().selectAll(shifts);
        }

        // The ids are sorted, the entities are not
        return ids.reduce((returnArray, id) => {
            const spell = entities[id];

            if (!spell[SPELL_PROPERTIES.USED]) {
                returnArray.push(spell);
            }

            return returnArray;
        }, []);
    }
);

export const selectFilteredBlends = createSelector(
    [selectAllColorShiftBlends,
    state => state.currentSelections.blendFilters],
    ( blends, blendFilters) => {
        // If there is at least one blendFilter set to true
        if (Object.values(blendFilters).some(value => value)) {
            return blends.reduce((returnArray, blend) => {
                const spellType = blend[SPELL_PROPERTIES.TYPE];

                if (blendFilters[spellType]) {
                    returnArray.push(blend);
                }

                return returnArray;
            }, []);
        }

        return [];
    },
    {
        memoizeOptions: {
            maxSize: 63,
            equalityCheck: isEqual,
            resultEqualityCheck: isEqual
        }
    }
);

// How far to search for matching shifts
const ACCEPTABLE_DEGREES_OF_SEPARATION = 10;

export const selectNearbyShifts = createSelector(
    [selectAllColorShiftShifts,
    state => state.currentSelections.specificShift],
    ( shifts, specificShift ) => {
        if (specificShift) {
            let specificValue = specificShift[SPELL_PROPERTIES.VALUE];

            // These should already be sorted, shouldn't need to sort again
            return shifts.filter(shift => checkAngleSeparation(specificValue, shift[SPELL_PROPERTIES.VALUE], ACCEPTABLE_DEGREES_OF_SEPARATION));
        }

        return [];
    }
);
