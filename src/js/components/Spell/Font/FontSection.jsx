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
import { FontSelect } from './FontSelect';
import { NameTextField } from './NameTextField';
import { SeriesTextField } from './SeriesTextField';
import { SectionControlContainer } from '../../StyledMui/SectionControlContainer';
import { StaticFontSelect } from './StaticFontSelect';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { selectCurrentFont, setCurrentFont } from '../../../redux/slices/currentSelections';

// Utilities
import { SPELL_PROPERTIES } from '../../../utilities/constants';

export const FontSection = ({ }) => {
    const dispatch = useDispatch();
    const currentFont = useSelector(selectCurrentFont);
    const [snackbarOpen, setSnackbarOpen] = useState(false);

    const handleClearClick = (e) => {
        dispatch(setCurrentFont(undefined));
    };

    const handleCopyClick = async (e) => {
        if (currentFont) {
            try {
                await navigator.clipboard.writeText(`tu %${currentFont[SPELL_PROPERTIES.SPELL_CODE]} `);
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
                    Test
                </Box>
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
