import { createSlice } from '@reduxjs/toolkit';

// Utilities
import { SPELL_PROPERTIES } from '../../../utilities/constants';

const initialState = {
    blendCriteria: undefined,
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
            if (action.payload === undefined) {
                //Object.assign(state, initialState);
                state.blendType = undefined;
            }
            else if (action.payload[SPELL_PROPERTIES.TYPE] !== undefined) {
                let { hue, saturation, lightness } = action.payload;

                let blendCriteria = {
                    blendType: action.payload[SPELL_PROPERTIES.TYPE],
                    hue,
                    lightness,
                    saturation
                };

                Object.assign(state, blendCriteria);

                state.blendCriteria = blendCriteria;
            }
            else {
                Object.assign(state, action.payload);
            }
        },
        updateSearchBlendCriteria: (state, action) => {
            // As long as there's a blend type
            if (state.blendType !== undefined) {
                let { blendType, hue, saturation, lightness } = state;

                state.blendCriteria = {
                    blendType,
                    hue,
                    saturation,
                    lightness
                };
            }
        },
        setSearchBlendType: (state, action) => {
            state.blendType = action.payload;

            // If they're clearing out the blend type, clear out the search modified as well
            if (action.payload === undefined) {
                state.blendCriteria = undefined;
            }
            // Else, update it to trigger any necessary updates
            else {
                let { blendType, hue, saturation, lightness } = state;

                state.blendCriteria = {
                    blendType,
                    hue,
                    saturation,
                    lightness
                };
            }
        },
        setSearchBlendHue: (state, action) => {
            state.hue = action.payload;
        },
        setSearchBlendLightness: (state, action) => {
            state.lightness = action.payload;
        },
        setSearchBlendSaturation: (state, action) => {
            state.saturation = action.payload;
        }
    }
});

export default blendSlice.reducer;

export const {
    setSearchBlend,
    updateSearchBlendCriteria,
    setSearchBlendType,
    setSearchBlendHue,
    setSearchBlendLightness,
    setSearchBlendSaturation
} = blendSlice.actions;

export const setSearchBlendType_Type = setSearchBlendType.toString();

export const selectSearchBlend = state => state.searches.blend;
export const selectSearchBlendCriteria = state => state.searches.blend.blendCriteria;
export const selectSearchBlendType = state => state.searches.blend.blendType;
export const selectSearchBlendHue = state => state.searches.blend.hue;
export const selectSearchBlendLightness = state => state.searches.blend.lightness;
export const selectSearchBlendSaturation = state => state.searches.blend.saturation;
