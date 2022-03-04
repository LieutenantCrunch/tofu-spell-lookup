import React from 'react';

// MUI
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

import { FrameContainer } from './Frame/FrameContainer';
import { SpellContainer } from './Spell/SpellContainer';

export const App = ({ }) => {
    return <>
        <Toolbar
            style={{
                display: 'flex',
                justifyContent: 'center'
            }}
        >
            <Typography variant="subtitle1">
                Please Note: This only provides an approximation of what your card will look like and is not 100% accurate.
            </Typography>
        </Toolbar>
        <Container>
            <div
                style={{
                    border: 'solid 1px rgba(0,0,0,.25)',
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'space-evenly'
                }}
            >
                <FrameContainer />
                <SpellContainer />
            </div>
        </Container>
    </>;
};
