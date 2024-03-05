import React from 'react';

// MUI
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';

// Other Components
import { BlendSection } from './Blend/BlendSection';
import { CharacterUrlSection } from '../Character/CharacterUrlSection';
import { FontSection } from './Font/FontSection';
import { HelpSection } from '../Help/HelpSection';
import { ShiftSection } from './Shift/ShiftSection';
import { SpecialSection } from './SpecialSection';
import { TextColorSection } from './TextColor/TextColorSection';
import { TextGlowSection } from './TextGlow/TextGlowSection';

export const SpellContainer = ({ }) => {
    return (
        <Box
            style={{
                alignItems: 'flex-start',
                boxSizing: 'border-box',
                display: 'flex',
                flexDirection: 'column',
                padding: '1em'
            }}
            sx={{
                width: {
                    xs: 'auto',
                    lg: 'calc(100% - 2em - 450px)'
                }
            }}
        >
            <ShiftSection />
            <Divider
                flexItem
                style={{
                    borderColor: '#ffffff',
                    margin: '1em 0'
                }}
            />
            <BlendSection />
            <Divider
                flexItem
                style={{
                    borderColor: '#ffffff',
                    margin: '1em 0'
                }}
            />
            <TextColorSection />
            <Divider
                flexItem
                style={{
                    borderColor: '#ffffff',
                    margin: '1em 0'
                }}
            />
            <TextGlowSection />
            <Divider
                flexItem
                style={{
                    borderColor: '#ffffff',
                    margin: '1em 0'
                }}
            />
            <FontSection />
            <Divider
                flexItem
                style={{
                    borderColor: '#ffffff',
                    margin: '1em 0'
                }}
            />
            {/*
            <SpecialSection />
            <Divider
                flexItem
                style={{
                    borderColor: '#ffffff',
                    margin: '1em 0'
                }}
            />
            */}
            <CharacterUrlSection />
            <Divider
                flexItem
                style={{
                    borderColor: '#ffffff',
                    margin: '1em 0'
                }}
            />
            <HelpSection />
        </Box>
    );
};
