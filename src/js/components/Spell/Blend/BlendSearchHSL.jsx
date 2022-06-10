import React from 'react';

// MUI
import Box from '@mui/material/Box';

// Other Components
import { BlendColorIndicator } from './BlendColorIndicator';
import { BlendHueSlider } from './BlendHueSlider';
import { BlendLightnessSlider } from './BlendLightnessSlider';
import { BlendSaturationSlider } from './BlendSaturationSlider';

export const BlendSearchHSL = ({ sx = {} }) => {
    return (
        <Box
            sx={{
                display: 'flex',
                height: '3em',
                ...sx
            }}
        >
            <div
                style={{
                    display: 'flex',
                    height: '100%',
                    flexDirection: 'column',
                    flexGrow: 1,
                    justifyContent: 'space-between'
                }}
            >
                <BlendHueSlider />
                <BlendSaturationSlider />
                <BlendLightnessSlider />
            </div>
            <div
                style={{
                    marginLeft: '.5em',
                    padding: '.5em'
                }}
            >
                <BlendColorIndicator />
            </div>
        </Box>
    );
};
