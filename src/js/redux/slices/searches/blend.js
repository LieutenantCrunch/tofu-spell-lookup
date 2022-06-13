import { createSlice } from '@reduxjs/toolkit';

// Utilities
import { SPELL_PROPERTIES, SPELL_TYPES } from '../../../utilities/constants';

const initialState = {
    blend: undefined,
    blendType: undefined,
    hue: 0,
    saturation: 100,
    lightness: 50
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
                    saturation: state.saturation,
                    lightness: state.lightness
                };

                state.blend = fakeSpell;
            }
            else { // Else set the spell that was sent in
                state.blend = action.payload;

                if (action.payload) {
                    let blend = action.payload;

                    state.blendType = blend[SPELL_PROPERTIES.TYPE];
                    state.hue = blend.hue;
                    state.saturation = blend.saturation;
                    state.lightness = blend.lightness;
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
            state.blendType = state.blendType || SPELL_TYPES.COLOR; // If they begin by tweaking the hue, the blend type might not be set, so set it to color
        },
        setSearchBlendSaturation: (state, action) => {
            state.saturation = action.payload;
            state.blend = undefined;
            state.blendType = state.blendType || SPELL_TYPES.COLOR; // If they begin by tweaking the hue, the blend type might not be set, so set it to color
        },
        setSearchBlendLightness: (state, action) => {
            state.lightness = action.payload;
            state.blend = undefined;
            state.blendType = state.blendType || SPELL_TYPES.COLOR; // If they begin by tweaking the hue, the blend type might not be set, so set it to color
        }
    }
});

export default blendSlice.reducer;

export const {
    setSearchBlend,
    setSearchBlendHue,
    setSearchBlendSaturation,
    setSearchBlendLightness,
    setSearchBlendType
} = blendSlice.actions;

export const setSearchBlend_Type = setSearchBlend.toString();
export const setSearchBlendHue_Type = setSearchBlendHue.toString();
export const setSearchBlendSaturation_Type = setSearchBlendSaturation.toString();
export const setSearchBlendLightness_Type = setSearchBlendLightness.toString();
export const setSearchBlendType_Type = setSearchBlendType.toString();

export const selectSearchBlend = state => state.searches.blend.blend;
export const selectSearchBlendHue = state => state.searches.blend.hue;
export const selectSearchBlendSaturation = state => state.searches.blend.saturation;
export const selectSearchBlendLightness = state => state.searches.blend.lightness;
export const selectSearchBlendType = state => state.searches.blend.blendType;
