import React, { useState } from 'react';

// MUI
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Snackbar from '@mui/material/Snackbar';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';

// MUI Icons
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';
import ContentCopyRoundedIcon from '@mui/icons-material/ContentCopyRounded';

// Other Components
import { BlendFilters } from './BlendFilters';
import { BlendSearchHSL } from './BlendSearchHSL';
import { BlendSearchType } from './BlendSearchType';
import { BlendSelect } from './BlendSelect';
import { MatchingBlendSelect } from './MatchingBlendSelect';
import { SectionControlContainer } from '../../StyledMui/SectionControlContainer';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { selectCurrentBlend, setCurrentBlend } from '../../../redux/slices/currentSelections';
import { setSearchBlend } from '../../../redux/slices/searches/blend';

// Utilities
import { SPELL_PROPERTIES } from '../../../utilities/constants';

export const BlendSection = ({ }) => {
    const dispatch = useDispatch();
    const currentBlend = useSelector(selectCurrentBlend);
    const [snackbarOpen, setSnackbarOpen] = useState(false);

    const handleClearClick = (e) => {
        dispatch(setCurrentBlend(undefined));
        dispatch(setSearchBlend(undefined));
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
                <Tooltip
                    arrow
                    placement="top"
                    title="Copy Spell Command"
                >
                    <IconButton
                        onClick={handleCopyClick}
                    >
                        <ContentCopyRoundedIcon />
                    </IconButton>
                </Tooltip>
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
            <SectionControlContainer>
                <BlendSelect
                    sx={{
                        flexShrink: 0,
                        width: {
                            xs: '66%',
                            sm: '30%'
                        }
                    }}
                />
            </SectionControlContainer>
            <SectionControlContainer>
                <fieldset
                    style={{
                        border: 'solid 1px rgba(255,255,255,.23)',
                        borderRadius: '4px'
                    }}
                >
                    <Box
                        component="legend"
                        style={{
                            padding: '0 .5em'
                        }}
                        sx={{ typography: 'body2' }}
                    >
                        Filter By Type
                    </Box>
                    <BlendFilters />
                </fieldset>
            </SectionControlContainer>
            <SectionControlContainer
                component="fieldset"
                style={{
                    alignItems: 'flex-start',
                    border: 'solid 1px rgba(255,255,255,.23)',
                    borderRadius: '4px',
                    margin: '0 0 1em'
                }}
            >
                <Box
                    component="legend"
                    style={{
                        padding: '0 .5em'
                    }}
                    sx={{ typography: 'body2' }}
                >
                    Search
                </Box>
                <BlendSearchType
                    sx={{
                        flexShrink: 0,
                        marginBottom: {
                            xs: '1em',
                            sm: '0'
                        },
                        width: {
                            xs: '66%',
                            sm: '30%'
                        }
                    }}
                />
                <BlendSearchHSL
                    sx={{
                        marginBottom: {
                            xs: '1em',
                            sm: '0'
                        },
                        width: {
                            xs: '66%',
                            sm: '30%'
                        }
                    }}
                />
                <MatchingBlendSelect
                    sx={{
                        flexShrink: 0,
                        width: {
                            xs: '66%',
                            sm: '30%'
                        }
                    }}
                />
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
