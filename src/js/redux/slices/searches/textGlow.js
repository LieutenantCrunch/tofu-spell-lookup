import { createSlice } from '@reduxjs/toolkit';

// Utilities
import { SPELL_PROPERTIES, SPELL_TYPES } from '../../../utilities/constants';

const initialState = {
    hue: 0,
    saturation: 0,
    lightness: 0,
    intensity: 0,
    tempTextGlow: undefined,
    textGlow: undefined
};

const textGlowSlice = createSlice({
    name: 'textGlow',
    initialState,
    reducers: {
        clearSearchTempTextGlow: (state, action) => {
            if (state.tempTextGlow) {
                let spellCode = action.payload;

                if (state.tempTextGlow[SPELL_PROPERTIES.SPELL_CODE] === spellCode) {
                    state.tempTextGlow = undefined;
                }
            }
        },
        setSearchTempTextGlow: (state, action) => {
            state.tempTextGlow = action.payload;
        },
        setSearchTextGlow: (state, action) => {
            if (action.payload === 'fake') { // If we need to create a fake spell
                // Use this value to create a fake spell to set on Redux
                let fakeSpell = {
                    [SPELL_PROPERTIES.SPELL_CODE]: 'fake',
                    [SPELL_PROPERTIES.TYPE]: SPELL_TYPES.TEXT_GLOW,
                    hue: state.hue,
                    saturation: state.saturation,
                    lightness: state.lightness,
                    intensity: 2
                };

                state.textGlow = fakeSpell;
                state.tempTextGlow = undefined;
            }
            else { // Else set the spell that was sent in
                state.textGlow = action.payload;
                state.tempTextGlow = undefined;

                if (action.payload) {
                    let spell = action.payload;

                    state.hue = spell.hue;
                    state.saturation = spell.saturation;
                    state.lightness = spell.lightness;
                    state.intensity = spell.intensity;
                }
                else {
                    state.intensity = 0;
                }
            }
        },
        setSearchTextGlowHue: (state, action) => {
            state.hue = action.payload;
            state.intensity = 2;
            state.textGlow = undefined;
        },
        setSearchTextGlowSaturation: (state, action) => {
            state.saturation = action.payload;
            state.intensity = 2;
            state.textGlow = undefined;
        },
        setSearchTextGlowLightness: (state, action) => {
            state.lightness = action.payload;
            state.intensity = 2;
            state.textGlow = undefined;
        },
        setSearchTextGlowIntensity: (state, action) => {
            state.intensity = action.payload;
            state.textGlow = undefined;
        }
    }
});

export default textGlowSlice.reducer;

export const {
    clearSearchTempTextGlow,
    setSearchTempTextGlow,
    setSearchTextGlow,
    setSearchTextGlowHue,
    setSearchTextGlowSaturation,
    setSearchTextGlowLightness,
    setSearchTextGlowIntensity
} = textGlowSlice.actions;

export const setSearchTextGlow_Type = setSearchTextGlow.toString();

export const selectSearchTempTextGlow = state => state.searches.textGlow.tempTextGlow;
export const selectSearchTextGlow = state => state.searches.textGlow.textGlow;
export const selectSearchTextGlowHue = state => state.searches.textGlow.hue;
export const selectSearchTextGlowSaturation = state => state.searches.textGlow.saturation;
export const selectSearchTextGlowLightness = state => state.searches.textGlow.lightness;
export const selectSearchTextGlowIntensity = state => state.searches.textGlow.intensity;
