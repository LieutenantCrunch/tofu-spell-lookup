import React from 'react';

// MUI
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

// Other Components
import { TextGlowIndicator } from './TextGlowIndicator';
import { TextGlowHueSlider } from './TextGlowHueSlider';
import { TextGlowSaturationSlider } from './TextGlowSaturationSlider';
import { TextGlowLightnessSlider } from './TextGlowLightnessSlider';

export const TextGlowSearchHSL = ({ sx = {} }) => {
    return (
        <Box
            style={{
                display: 'flex',
                flexDirection: 'column'
            }}
            sx={sx}
        >
            <Typography
                gutterBottom
                variant="subtitle2"
            >
                1: Adjust the text glow
            </Typography>
            <div
                style={{
                    alignItems: 'center',
                    display: 'flex',
                    flexGrow: 1
                }}
            >
                <div
                    style={{
                        display: 'flex',
                        height: '5em',
                        flexDirection: 'column',
                        flexGrow: 1,
                        justifyContent: 'space-around',
                        padding: '0 1em'
                    }}
                >
                    <TextGlowHueSlider />
                    <TextGlowSaturationSlider />
                    <TextGlowLightnessSlider />
                </div>
                <div
                    style={{
                        padding: '.5em'
                    }}
                >
                    <TextGlowIndicator />
                </div>
            </div>
        </Box>
    );
};
