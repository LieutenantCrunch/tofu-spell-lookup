import React from 'react';

// MUI
import Divider from '@mui/material/Divider';

// Other Components
import { BlendSection } from './Blend/BlendSection';
import { CharacterUrlSection } from '../Character/CharacterUrlSection';
import { FontSection } from './Font/FontSection';
import { HelpSection } from '../Help/HelpSection';
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
            <Divider
                flexItem
                style={{
                    margin: '1em 0'
                }}
            />
            <CharacterUrlSection />
            <Divider
                flexItem
                style={{
                    margin: '1em 0'
                }}
            />
            <HelpSection />
        </div>
    );
};
