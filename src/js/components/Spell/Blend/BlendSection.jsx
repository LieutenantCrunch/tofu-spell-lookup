import React, { useState } from 'react';

// MUI
import IconButton from '@mui/material/IconButton';
import Snackbar from '@mui/material/Snackbar';
import Typography from '@mui/material/Typography';

// MUI Icons
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';
import ContentCopyRoundedIcon from '@mui/icons-material/ContentCopyRounded';

// Other Components
import { BlendFilters } from './BlendFilters';
import { BlendSelect } from './BlendSelect';
import { SectionControlContainer } from '../../StyledMui/SectionControlContainer';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { selectCurrentBlend, setCurrentBlend } from '../../../redux/slices/currentSelections';

// Utilities
import { SPELL_PROPERTIES } from '../../../utilities/constants';

export const BlendSection = ({ }) => {
    const dispatch = useDispatch();
    const currentBlend = useSelector(selectCurrentBlend);
    const [snackbarOpen, setSnackbarOpen] = useState(false);

    const handleClearClick = (e) => {
        dispatch(setCurrentBlend(undefined));
    };

    const handleCopyClick = async (e) => {
        if (currentBlend) {
            try {
                await navigator.clipboard.writeText(`tu %${currentBlend[SPELL_PROPERTIES.SPELL_CODE]} `);
                setSnackbarOpen(true);
            }
            catch (err) {
                console.error(`Error copying spell to clipboard:\n${err.message}`);
            }
        }
    };

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    return (
        <div
            style={{
                width: '100%'
            }}
        >
            <div
                style={{
                    alignItems: 'center',
                    display: 'flex',
                    marginBottom: '1em'
                }}
            >
                <IconButton
                    onClick={handleCopyClick}
                >
                    <ContentCopyRoundedIcon />
                </IconButton>
                <Typography
                    variant="h6"
                >
                    🔆Blends
                </Typography>
                <IconButton
                    aria-label="clear blend"
                    color="error"
                    onClick={handleClearClick}
                    title="Clear Blend"
                >
                    <ClearRoundedIcon />
                </IconButton>
            </div>
            <SectionControlContainer
                sx={{
                    alignItems: 'flex-start',
                    flexDirection: 'column'
                }}
            >
                <BlendSelect
                    sx={{
                        flexGrow: 0,
                        marginBottom: '1em',
                        width: {
                            xs: '66%',
                            sm: '30%'
                        }
                    }}
                />
                <BlendFilters />
            </SectionControlContainer>
            <Snackbar
                autoHideDuration={1500}
                key='blendCopied'
                message='Spell command copied!'
                onClose={handleSnackbarClose}
                open={snackbarOpen}
            />
        </div>
    );
};
