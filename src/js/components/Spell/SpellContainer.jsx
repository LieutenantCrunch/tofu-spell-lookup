import React from 'react';

// MUI
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Typography from "@mui/material/Typography";

// Other Components
import { BlendSection } from './Blend/BlendSection';
import { CharacterUrlSection } from '../Character/CharacterUrlSection';
import { FontSection } from './Font/FontSection';
import { HelpSection } from '../Help/HelpSection';
import { ShiftSection } from './Shift/ShiftSection';
// import { SpecialSection } from './SpecialSection';
import { TextColorSection } from './TextColor/TextColorSection';
import { TextGlowSection } from './TextGlow/TextGlowSection';

export const SpellContainer = ({ }) => {
    return (
        <Box
            sx={{
                flex: '1 1 0',
                width: '100%',
                boxSizing: 'border-box',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                padding: '1em'
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
            <Divider
                flexItem
                style={{
                    borderColor: '#ffffff',
                    margin: '1em 0'
                }}
            />
            <Typography variant={'caption'}>
                Special thanks to GranmaCupcake for providing this page!
            </Typography>
        </Box>
    );
};
