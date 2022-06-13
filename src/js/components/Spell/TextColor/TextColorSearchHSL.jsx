import React from 'react';

// MUI
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

// Other Components
import { TextColorIndicator } from './TextColorIndicator';
import { TextColorHueSlider } from './TextColorHueSlider';
import { TextColorLightnessSlider } from './TextColorLightnessSlider';
import { TextColorSaturationSlider } from './TextColorSaturationSlider';

export const TextColorSearchHSL = ({ sx = {} }) => {
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
                1: Adjust the text color
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
                    <TextColorHueSlider />
                    <TextColorSaturationSlider />
                    <TextColorLightnessSlider />
                </div>
                <div
                    style={{
                        padding: '.5em'
                    }}
                >
                    <TextColorIndicator />
                </div>
            </div>
        </Box>
    );
};
