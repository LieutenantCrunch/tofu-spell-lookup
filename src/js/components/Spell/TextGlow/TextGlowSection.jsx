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
import { MatchingTextGlowSelect } from './MatchingTextGlowSelect';
import { PlaceholderBox } from '../../PlaceholderBox';
import { AllTextGlowSelect } from './AllTextGlowSelect';
import { TextGlowSearchHSL } from './TextGlowSearchHSL';
import { SectionControlContainer } from '../../StyledMui/SectionControlContainer';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { selectCurrentCardCode } from '../../../redux/slices/currentSelections';
import {
    selectSearchTextGlow,
    setSearchTempTextGlow,
    setSearchTextGlow
} from '../../../redux/slices/searches/textGlow';

// Utilities
import { SPELL_PROPERTIES } from '../../../utilities/constants';

export const TextGlowSection = ({ }) => {
    const dispatch = useDispatch();
    const currentCardCode = useSelector(selectCurrentCardCode);
    const searchTextGlow = useSelector(selectSearchTextGlow);
    const [snackbarOpen, setSnackbarOpen] = useState(false);

    const handleClearClick = (e) => {
        dispatch(setSearchTextGlow(undefined));
        dispatch(setSearchTempTextGlow(undefined));
    };

    const handleCopyClick = async (e) => {
        if (searchTextGlow && searchTextGlow[SPELL_PROPERTIES.SPELL_CODE] !== 'fake') {
            try {
                await navigator.clipboard.writeText(`t!u %${searchTextGlow[SPELL_PROPERTIES.SPELL_CODE]} ${currentCardCode}`);
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
                    Text Glow
                </Typography>
                <IconButton
                    aria-label="clear text glow"
                    color="error"
                    onClick={handleClearClick}
                    title="Clear Text Glow"
                >
                    <ClearRoundedIcon />
                </IconButton>
            </div>
            <SectionControlContainer>
                <AllTextGlowSelect
                    sx={{
                        flexGrow: 0,
                        width: {
                            xs: '66%',
                            sm: '30%'
                        }
                    }}
                />
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
                        <TextGlowSearchHSL
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
                        <MatchingTextGlowSelect
                            sx={{
                                flexShrink: 0,
                                width: {
                                    xs: '66%',
                                    sm: '30%'
                                }
                            }}
                        />
                        <PlaceholderBox
                            sx={{
                                flexShrink: 0,
                                width: {
                                    xs: 0,
                                    sm: '30%'
                                },
                                display: {
                                    xs: 'none',
                                    sm: 'block'
                                }
                            }}
                        />
                    </SectionControlContainer>
                </AccordionDetails>
            </Accordion>
            <Snackbar
                autoHideDuration={1500}
                key='textGlowCopied'
                message='Spell command copied!'
                onClose={handleSnackbarClose}
                open={snackbarOpen}
            />
        </div>
    );
};
