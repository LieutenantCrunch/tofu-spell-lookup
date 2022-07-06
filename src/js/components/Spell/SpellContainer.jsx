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
                    lg: 'calc(100% - 2em - 300px)'
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
            <Typography variant={'caption'}>Special thanks to GranmaCupcake for providing this page!</Typography>
        </Box>
    );
};
