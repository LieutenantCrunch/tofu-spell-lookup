import { createSlice } from '@reduxjs/toolkit';

// Utilities
import { SPELL_PROPERTIES, SPELL_TYPES } from '../../../utilities/constants';

const initialState = {
    blend: undefined,
    blendType: undefined,
    hue: 0,
    lightness: 50,
    saturation: 100
};

const blendSlice = createSlice({
    name: 'blend',
    initialState,
    reducers: {
        setSearchBlend: (state, action) => {
            if (action.payload === 'fake') { // If we need to create a fake spell
                // Use this value to create a fake spell to set on Redux
                let fakeSpell = {
                    [SPELL_PROPERTIES.SPELL_CODE]: 'fake',
                    [SPELL_PROPERTIES.TYPE]: state.blendType || SPELL_TYPES.COLOR, // Either use the currently selected type, or default to Color
                    hue: state.hue,
                    lightness: state.lightness,
                    saturation: state.saturation
                };

                state.blend = fakeSpell;
            }
            else { // Else set the spell that was sent in
                state.blend = action.payload;

                if (action.payload) {
                    let blend = action.payload;

                    state.blendType = blend[SPELL_PROPERTIES.TYPE];
                    state.hue = blend.hue;
                    state.lightness = blend.lightness;
                    state.saturation = blend.saturation;
                }
                else {
                    state.blendType = undefined;
                    // Leave the rest of the properties alone
                }
            }
        },
        setSearchBlendType: (state, action) => {
            state.blendType = action.payload;
            state.blend = undefined;
        },
        setSearchBlendHue: (state, action) => {
            state.hue = action.payload;
            state.blend = undefined;
        },
        setSearchBlendLightness: (state, action) => {
            state.lightness = action.payload;
            state.blend = undefined;
        },
        setSearchBlendSaturation: (state, action) => {
            state.saturation = action.payload;
            state.blend = undefined;
        }
    }
});

export default blendSlice.reducer;

export const {
    setSearchBlend,
    setSearchBlendType,
    setSearchBlendHue,
    setSearchBlendLightness,
    setSearchBlendSaturation
} = blendSlice.actions;

export const setSearchBlend_Type = setSearchBlend.toString();
export const setSearchBlendType_Type = setSearchBlendType.toString();
export const setSearchBlendHue_Type = setSearchBlendHue.toString();
export const setSearchBlendLightness_Type = setSearchBlendLightness.toString();
export const setSearchBlendSaturation_Type = setSearchBlendSaturation.toString();

export const selectSearchBlend = state => state.searches.blend.blend;
export const selectSearchBlendType = state => state.searches.blend.blendType;
export const selectSearchBlendHue = state => state.searches.blend.hue;
export const selectSearchBlendLightness = state => state.searches.blend.lightness;
export const selectSearchBlendSaturation = state => state.searches.blend.saturation;
