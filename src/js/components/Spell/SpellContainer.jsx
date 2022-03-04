import React from 'react';

// MUI
import Divider from '@mui/material/Divider';

// Other Components
import { FontSection } from './FontSection';
import { FullHueSection } from './FullHueSection';
import { HueRotationSection } from './HueRotationSection';
import { SpecialSection } from './SpecialSection';
import { TextColorSection } from './TextColorSection';

export const SpellContainer = ({ }) => {
    return (
        <div
            style={{
                alignItems: 'flex-start',
                display: 'flex',
                flexDirection: 'column',
                flexGrow: 1,
                padding: '1em'
            }}
        >
            <HueRotationSection />
            <Divider
                flexItem
                style={{
                    margin: '1em 0'
                }}
            />
            <FullHueSection />
            <Divider
                flexItem
                style={{
                    margin: '1em 0'
                }}
            />
            <FontSection />
            <Divider
                flexItem
                style={{
                    margin: '1em 0'
                }}
            />
            {/*
            <SpecialSection />
            <Divider
                flexItem
                style={{
                    margin: '1em 0'
                }}
            />
            */}
            <TextColorSection />
        </div>
    );
};
