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
import { FontSelect } from './FontSelect';
import { NameTextField } from './NameTextField';
import { SeriesTextField } from './SeriesTextField';
import { SectionControlContainer } from '../../StyledMui/SectionControlContainer';
import { StaticFontSelect } from './StaticFontSelect';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { selectCurrentCardCode, selectCurrentFont, setCurrentFont } from '../../../redux/slices/currentSelections';

// Utilities
import { SPELL_PROPERTIES } from '../../../utilities/constants';

export const FontSection = ({ }) => {
    const dispatch = useDispatch();
    const currentCardCode = useSelector(selectCurrentCardCode);
    const currentFont = useSelector(selectCurrentFont);
    const [snackbarOpen, setSnackbarOpen] = useState(false);

    const handleClearClick = (e) => {
        dispatch(setCurrentFont(undefined));
    };

    const handleCopyClick = async (e) => {
        if (currentFont) {
            try {
                await navigator.clipboard.writeText(`t!u %${currentFont[SPELL_PROPERTIES.SPELL_CODE]} ${currentCardCode}`);
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
                    Fonts
                </Typography>
                <IconButton
                    aria-label="clear font"
                    color="error"
                    onClick={handleClearClick}
                    title="Clear Font"
                >
                    <ClearRoundedIcon />
                </IconButton>
            </div>
            <SectionControlContainer>
                <FontSelect
                    sx={{
                        flexGrow: 0,
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
                <NameTextField
                    sx={{
                        flexGrow: 0,
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
                <SeriesTextField
                    label="Series"
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
                    <Typography>Test</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <SectionControlContainer>
                        <StaticFontSelect
                            sx={{
                                flexGrow: 0,
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
                key='fontCopied'
                message='Spell command copied!'
                onClose={handleSnackbarClose}
                open={snackbarOpen}
            />
        </div>
    );
};
