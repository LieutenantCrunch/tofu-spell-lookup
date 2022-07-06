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
import { AllShiftSelect } from './AllShiftSelect';
import { MatchingShiftSelect } from './MatchingShiftSelect';
import { PlaceholderBox } from '../../PlaceholderBox';
import { ShiftSlider } from './ShiftSlider';
import { SectionControlContainer } from '../../StyledMui/SectionControlContainer';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import {
    selectSpecificShift,
    setSpecificShift,
    setCurrentTempShift
} from '../../../redux/slices/currentSelections';

// Utilities
import { SPELL_PROPERTIES } from '../../../utilities/constants';

export const ShiftSection = ({ }) => {
    const dispatch = useDispatch();
    const specificShift = useSelector(selectSpecificShift);
    const [snackbarOpen, setSnackbarOpen] = useState(false);

    const handleClearClick = (e) => {
        dispatch(setSpecificShift(undefined));
        dispatch(setCurrentTempShift(undefined));
    };

    const handleCopyClick = async (e) => {
        if (specificShift) {
            try {
                await navigator.clipboard.writeText(`t!u %${specificShift[SPELL_PROPERTIES.SPELL_CODE]} `);
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
                    🔅Color Shifts
                </Typography>
                <IconButton
                    aria-label="clear shift"
                    color="error"
                    onClick={handleClearClick}
                    title="Clear Shift"
                >
                    <ClearRoundedIcon />
                </IconButton>
            </div>
            <SectionControlContainer>
                <AllShiftSelect
                    sx={{
                        flexShrink: 0,
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
                        <ShiftSlider
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
                        <MatchingShiftSelect
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
                key='shiftCopied'
                message='Spell command copied!'
                onClose={handleSnackbarClose}
                open={snackbarOpen}
            />
        </div>
    );
};
