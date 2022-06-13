import { createSlice } from '@reduxjs/toolkit';

// Utilities
import { SPELL_PROPERTIES, SPELL_TYPES } from '../../../utilities/constants';

const initialState = {
    hue: 0,
    lightness: 0,
    saturation: 0,
    textColor: undefined
};

const textColorSlice = createSlice({
    name: 'textColor',
    initialState,
    reducers: {
        setSearchTextColor: (state, action) => {
            if (action.payload === 'fake') { // If we need to create a fake spell
                // Use this value to create a fake spell to set on Redux
                let fakeSpell = {
                    [SPELL_PROPERTIES.SPELL_CODE]: 'fake',
                    [SPELL_PROPERTIES.TYPE]: SPELL_TYPES.TEXT_COLOR,
                    hue: state.hue,
                    lightness: state.lightness,
                    saturation: state.saturation
                };

                state.textColor = fakeSpell;
            }
            else { // Else set the spell that was sent in
                state.textColor = action.payload;

                if (action.payload) {
                    let spell = action.payload;

                    state.hue = spell.hue;
                    state.lightness = spell.lightness;
                    state.saturation = spell.saturation;
                }
                // Else catch with middleware and set the hue/saturation/lightness to the right color based on the frame
            }
        },
        setSearchTextColorHue: (state, action) => {
            state.hue = action.payload;
            state.textColor = undefined;
        },
        setSearchTextColorLightness: (state, action) => {
            state.lightness = action.payload;
            state.textColor = undefined;
        },
        setSearchTextColorSaturation: (state, action) => {
            state.saturation = action.payload;
            state.textColor = undefined;
        }
    }
});

export default textColorSlice.reducer;

export const {
    setSearchTextColor,
    setSearchTextColorHue,
    setSearchTextColorLightness,
    setSearchTextColorSaturation
} = textColorSlice.actions;

export const setSearchTextColor_Type = setSearchTextColor.toString();

export const selectSearchTextColor = state => state.searches.textColor.textColor;
export const selectSearchTextColorHue = state => state.searches.textColor.hue;
export const selectSearchTextColorLightness = state => state.searches.textColor.lightness;
export const selectSearchTextColorSaturation = state => state.searches.textColor.saturation;
