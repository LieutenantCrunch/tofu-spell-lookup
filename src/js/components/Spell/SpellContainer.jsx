import React from 'react';

// MUI
import Divider from '@mui/material/Divider';

// Other Components
import { FontSection } from './Font/FontSection';
import { FullHueSection } from './Full/FullHueSection';
import { HueRotationSection } from './Rotate/HueRotationSection';
import { SpecialSection } from './SpecialSection';
import { TextColorSection } from './TextColor/TextColorSection';

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
