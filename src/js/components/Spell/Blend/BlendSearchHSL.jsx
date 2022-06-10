import React from 'react';

// MUI
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

// Other Components
import { BlendColorIndicator } from './BlendColorIndicator';
import { BlendHueSlider } from './BlendHueSlider';
import { BlendLightnessSlider } from './BlendLightnessSlider';
import { BlendSaturationSlider } from './BlendSaturationSlider';

export const BlendSearchHSL = ({ sx = {} }) => {
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
                2: Adjust the frame's color
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
            </div>
        </Box>
    );
};
