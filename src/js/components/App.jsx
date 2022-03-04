import React from 'react';

// MUI
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

import { FrameContainer } from './Frame/FrameContainer';
import { SpellContainer } from './Spell/SpellContainer';

export const App = ({ }) => {
    return <>
        <Toolbar
            sx={{
                bgcolor: 'background.default',
                borderRadius: '0 0 10px 10px',
                boxShadow: '0px 0px 6px 0px rgba(0,0,0,.5)',
                color: 'text.primary',
                display: 'flex',
                justifyContent: 'center',
                marginBottom: '1em'
            }}
        >
            <Typography variant="subtitle1">
                Please Note: This only provides an approximation of what your card will look like and is not 100% accurate.
            </Typography>
        </Toolbar>
        <Container>
            <Box
                sx={{
                    bgcolor: 'background.default',
                    border: 'solid 1px rgba(0,0,0,.25)',
                    borderRadius: '10px',
                    boxShadow: '0px 0px 6px 0px rgba(0,0,0,.5)',
                    color: 'text.primary',
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'space-evenly'
                }}
            >
                <FrameContainer />
                <SpellContainer />
            </Box>
        </Container>
    </>;
};
