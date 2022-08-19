import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';
import { createSelector } from 'reselect';

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

export const selectAllFonts = createSelector(
    state => state.fonts,
    state => state.currentSelections.showUsedSpells,
    ( fonts, showUsedSpells ) => {
        let { ids, entities } = fonts;

        if (showUsedSpells) {
            return fontsAdapter.getSelectors().selectAll(fonts);
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
