import React, { useState } from 'react';

// MUI
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import IconButton from '@mui/material/IconButton';
import Snackbar from '@mui/material/Snackbar';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';

// MUI Icons
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';
import ContentCopyRoundedIcon from '@mui/icons-material/ContentCopyRounded';
import ExpandMoreRoundedIcon from '@mui/icons-material/ExpandMoreRounded';

// Other Components
import { MatchingTextColorSelect } from './MatchingTextColorSelect';
import { PlaceholderBox } from '../../PlaceholderBox';
import { AllTextColorSelect } from './AllTextColorSelect';
import { TextColorSearchHSL } from './TextColorSearchHSL';
import { SectionControlContainer } from '../../StyledMui/SectionControlContainer';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { selectCurrentCardCode } from '../../../redux/slices/currentSelections';
import {
    selectSearchTextColor,
    setSearchTempTextColor,
    setSearchTextColor
} from '../../../redux/slices/searches/textColor';

// Utilities
import { SPELL_PROPERTIES } from '../../../utilities/constants';

export const TextColorSection = ({ }) => {
    const dispatch = useDispatch();
    const currentCardCode = useSelector(selectCurrentCardCode);
    const searchTextColor = useSelector(selectSearchTextColor);
    const [snackbarOpen, setSnackbarOpen] = useState(false);

    const handleClearClick = (e) => {
        dispatch(setSearchTextColor(undefined));
        dispatch(setSearchTempTextColor(undefined));
    };

    const handleCopyClick = async (e) => {
        if (searchTextColor && searchTextColor[SPELL_PROPERTIES.SPELL_CODE] !== 'fake') {
            try {
                await navigator.clipboard.writeText(`t!u %${searchTextColor[SPELL_PROPERTIES.SPELL_CODE]} ${currentCardCode}`);
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
                    Text Color
                </Typography>
                <IconButton
                    aria-label="clear text color"
                    color="error"
                    onClick={handleClearClick}
                    title="Clear Text Color"
                >
                    <ClearRoundedIcon />
                </IconButton>
            </div>
            <SectionControlContainer>
                <AllTextColorSelect
                    sx={{
                        flexGrow: 0,
                        width: {
                            xs: '66%',
                            sm: '30%'
                        }
                    }}
                />
            </SectionControlContainer>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreRoundedIcon />}
                >
                    <Typography>Search</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <SectionControlContainer>
                        <TextColorSearchHSL
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
                        <MatchingTextColorSelect
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
                key='textColorCopied'
                message='Spell command copied!'
                onClose={handleSnackbarClose}
                open={snackbarOpen}
            />
        </div>
    );
};
