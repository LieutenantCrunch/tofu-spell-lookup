import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';
import { createSelector } from 'reselect';

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

export const selectAllTextColors = createSelector(
    state => state.textColors,
    state => state.currentSelections.showUsedSpells,
    ( textColors, showUsedSpells ) => {
        let { ids, entities } = textColors;

        if (showUsedSpells) {
            return textColorsAdapter.getSelectors().selectAll(textColors);
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
