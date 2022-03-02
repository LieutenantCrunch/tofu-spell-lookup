import React from 'react';

// MUI
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
