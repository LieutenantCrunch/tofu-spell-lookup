import { createSlice } from '@reduxjs/toolkit';

// Utilities
import { SPELL_PROPERTIES, SPELL_TYPES } from '../../../utilities/constants';

const initialState = {
    hue: 0,
    saturation: 0,
    lightness: 0,
    tempTextColor: undefined,
    textColor: undefined
};

const textColorSlice = createSlice({
    name: 'textColor',
    initialState,
    reducers: {
        clearSearchTempTextColor: (state, action) => {
            if (state.tempTextColor) {
                let spellCode = action.payload;

                if (state.tempTextColor[SPELL_PROPERTIES.SPELL_CODE] === spellCode) {
                    state.tempTextColor = undefined;
                }
            }
        },
        setSearchTempTextColor: (state, action) => {
            state.tempTextColor = action.payload;
        },
        setSearchTextColor: (state, action) => {
            if (action.payload === 'fake') { // If we need to create a fake spell
                // Use this value to create a fake spell to set on Redux
                let fakeSpell = {
                    [SPELL_PROPERTIES.SPELL_CODE]: 'fake',
                    [SPELL_PROPERTIES.TYPE]: SPELL_TYPES.TEXT_COLOR,
                    hue: state.hue,
                    saturation: state.saturation,
                    lightness: state.lightness
                };

                state.textColor = fakeSpell;
                state.tempTextColor = undefined;
            }
            else { // Else set the spell that was sent in
                state.textColor = action.payload;
                state.tempTextColor = undefined;

                if (action.payload) {
                    let spell = action.payload;

                    state.hue = spell.hue;
                    state.saturation = spell.saturation;
                    state.lightness = spell.lightness;
                }
                // Else catch with middleware and set the hue/saturation/lightness to the right color based on the frame
            }
        },
        setSearchTextColorHue: (state, action) => {
            state.hue = action.payload;
            state.textColor = undefined;
        },
        setSearchTextColorSaturation: (state, action) => {
            state.saturation = action.payload;
            state.textColor = undefined;
        },
        setSearchTextColorLightness: (state, action) => {
            state.lightness = action.payload;
            state.textColor = undefined;
        }
    }
});

export default textColorSlice.reducer;

export const {
    clearSearchTempTextColor,
    setSearchTempTextColor,
    setSearchTextColor,
    setSearchTextColorHue,
    setSearchTextColorSaturation,
    setSearchTextColorLightness
} = textColorSlice.actions;

export const setSearchTextColor_Type = setSearchTextColor.toString();

export const selectSearchTempTextColor = state => state.searches.textColor.tempTextColor;
export const selectSearchTextColor = state => state.searches.textColor.textColor;
export const selectSearchTextColorHue = state => state.searches.textColor.hue;
export const selectSearchTextColorSaturation = state => state.searches.textColor.saturation;
export const selectSearchTextColorLightness = state => state.searches.textColor.lightness;
