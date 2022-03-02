import React from 'react';

// MUI
import Divider from '@mui/material/Divider';

// Other Components
import { FullHueSection } from './FullHueSection';
import { HueRotationSection } from './HueRotationSection'

export const ColorShiftSection = ({ }) => {
    return (
        <div
            style={{
                width: '100%'
            }}
        >
            <HueRotationSection />
            <Divider
                style={{
                    margin: '1em 0'
                }}
            />
            <FullHueSection />
        </div>
    );
};
