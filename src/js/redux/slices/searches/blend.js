import { createSlice } from '@reduxjs/toolkit';

// Utilities
import { SPELL_PROPERTIES, SPELL_TYPES } from '../../../utilities/constants';

const initialState = {
    blend: undefined, // ##specificShift
    blendType: undefined, // ##continuousShift
    hue: 0, // ##continuousShift
    lightness: 50, // ##continuousShift
    saturation: 100 // ##continuousShift
};

const blendSlice = createSlice({
    name: 'blend',
    initialState,
    reducers: {
        setSearchBlend: (state, action) => { // ##setSpecificShift
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
                // ##specificShift
                state.blend = action.payload;

                // ##continuousShift
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
        setSearchBlendType: (state, action) => { // ##setContinuousShift
            // ##continuousShift
            state.blendType = action.payload;

            // ##specificShift
            state.blend = undefined;
        },
        setSearchBlendHue: (state, action) => { // ##setContinuousShift
            // ##continuousShift
            state.hue = action.payload;

            // ##specificShift
            state.blend = undefined;
        },
        setSearchBlendLightness: (state, action) => { // ##setContinuousShift
            // ##continuousShift
            state.lightness = action.payload;

            // ##specificShift
            state.blend = undefined;
        },
        setSearchBlendSaturation: (state, action) => { // ##setContinuousShift
            // ##continuousShift
            state.saturation = action.payload;

            // ##specificShift
            state.blend = undefined;
        }
    }
});

export default blendSlice.reducer;

export const {
    setSearchBlend, // ##setSpecificShift
    setSearchBlendType, // ##setContinuousShift
    setSearchBlendHue, // ##setContinuousShift
    setSearchBlendLightness, // ##setContinuousShift
    setSearchBlendSaturation // ##setContinuousShift
} = blendSlice.actions;

export const setSearchBlend_Type = setSearchBlend.toString(); // ##specificShift
export const setSearchBlendType_Type = setSearchBlendType.toString(); // ##continuousShift
export const setSearchBlendHue_Type = setSearchBlendHue.toString(); // ##continuousShift
export const setSearchBlendLightness_Type = setSearchBlendLightness.toString(); // ##continuousShift
export const setSearchBlendSaturation_Type = setSearchBlendSaturation.toString(); // ##continuousShift

export const selectSearchBlend = state => state.searches.blend.blend; // ##specificShift
export const selectSearchBlendType = state => state.searches.blend.blendType; // ##continuousShift
export const selectSearchBlendHue = state => state.searches.blend.hue; // ##continuousShift
export const selectSearchBlendLightness = state => state.searches.blend.lightness; // ##continuousShift
export const selectSearchBlendSaturation = state => state.searches.blend.saturation; // ##continuousShift
