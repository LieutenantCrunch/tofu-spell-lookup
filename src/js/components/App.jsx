import React, { useEffect } from 'react';

// API
import { APIHelper } from '../utilities/apiHelper';

// MUI
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

// Other Components
import { FrameContainer } from './Frame/FrameContainer';
import { SpellContainer } from './Spell/SpellContainer';

// Redux
import { store } from '../redux/store';
import { clearStore } from '../redux/utility';

export const App = ({ }) => {
    useEffect(() => {
        const abortController = new AbortController();

        APIHelper.readApiKey().then(result => {
            if (result) {
                // If the API Key was read successfully, clear the store, and then load the spells from the API
                clearStore(store);

                fetch(`${APIHelper.url}TODO_USER_ID`, {
                    method: 'GET',
                    headers: {
                        'API-TOKEN': APIHelper.key
                    },
                    signal: abortController.signal
                })
                .then(response => response.json())
                .then(result => console.log(result))
                .catch(err => console.error(`Error fetching spells:\n${err.message}`));
            }
        });

        return () => {
            abortController.abort();
        };
    }, []);

    return <>
        <Toolbar
            sx={{
                bgcolor: 'error.dark',
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
        <Container
            maxWidth={false}
            style={{
                maxWidth:'1275px'
            }}
        >
            <Box
                sx={{
                    bgcolor: 'background.default',
                    color: 'text.primary'
                }}
                style={{
                    border: 'solid 1px rgba(0,0,0,.25)',
                    borderRadius: '10px',
                    boxShadow: '0px 0px 6px 0px rgba(0,0,0,.5)',
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'space-evenly',
                    width: '100%'
                }}
            >
                <FrameContainer />
                <SpellContainer />
            </Box>
        </Container>
    </>;
};
