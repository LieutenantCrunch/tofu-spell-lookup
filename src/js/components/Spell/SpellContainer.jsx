import React from 'react';

// MUI
import Divider from '@mui/material/Divider';

// Other Components
import { FontSection } from './Font/FontSection';
import { BlendSection } from './Blend/BlendSection';
import { ShiftSection } from './Shift/ShiftSection';
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
            <ShiftSection />
            <Divider
                flexItem
                style={{
                    margin: '1em 0'
                }}
            />
            <BlendSection />
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
