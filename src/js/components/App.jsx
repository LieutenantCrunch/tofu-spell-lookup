import React from 'react';

import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';

import { FrameContainer } from './Frame/FrameContainer';
import { SpellContainer } from './Spell/SpellContainer';

export const App = ({ }) => {
    return <>
        <Toolbar />
        <Container>
            <div
                style={{
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
