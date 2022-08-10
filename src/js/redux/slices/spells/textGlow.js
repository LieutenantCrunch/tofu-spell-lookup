import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';
import { createSelector } from 'reselect';

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

export const selectAllTextGlows = createSelector(
    [state => state.textGlows,
    state => state.currentSelections.showUsedSpells],
    ( textGlows, showUsedSpells ) => {
        let { ids, entities } = textGlows;

        if (showUsedSpells) {
            return textGlowsAdapter.getSelectors().selectAll(textGlows);
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
