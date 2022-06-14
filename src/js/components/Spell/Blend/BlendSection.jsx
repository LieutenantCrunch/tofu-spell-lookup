import React, { useState } from 'react';

// MUI
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Snackbar from '@mui/material/Snackbar';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';

// MUI Icons
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';
import ContentCopyRoundedIcon from '@mui/icons-material/ContentCopyRounded';
import ExpandMoreRoundedIcon from '@mui/icons-material/ExpandMoreRounded';

// Other Components
import { BlendFilters } from './BlendFilters';
import { BlendSearchHSL } from './BlendSearchHSL';
import { BlendSearchType } from './BlendSearchType';
import { AllBlendSelect } from './AllBlendSelect';
import { MatchingBlendSelect } from './MatchingBlendSelect';
import { SectionControlContainer } from '../../StyledMui/SectionControlContainer';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import {
    selectSearchBlend,
    setSearchBlend,
    setSearchTempBlend
} from '../../../redux/slices/searches/blend';

// Utilities
import { SPELL_PROPERTIES } from '../../../utilities/constants';

export const BlendSection = ({ }) => {
    const dispatch = useDispatch();
    const searchBlend = useSelector(selectSearchBlend);
    const [snackbarOpen, setSnackbarOpen] = useState(false);

    const handleClearClick = (e) => {
        dispatch(setSearchBlend(undefined));
        dispatch(setSearchTempBlend(undefined));
    };

    const handleCopyClick = async (e) => {
        if (searchBlend && searchBlend[SPELL_PROPERTIES.SPELL_CODE] !== 'fake') {
            try {
                await navigator.clipboard.writeText(`tu %${searchBlend[SPELL_PROPERTIES.SPELL_CODE]} `);
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
                    🔆Color Shifts (Blends)
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
                <AllBlendSelect
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
            <Accordion
                style={{
                    backgroundColor: 'inherit',
                    borderRadius: '4px',
                    width: '100%'
                }}
            >
                <AccordionSummary
                    expandIcon={<ExpandMoreRoundedIcon />}
                >
                    <Typography>Search</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <SectionControlContainer>
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
                </AccordionDetails>
            </Accordion>
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
