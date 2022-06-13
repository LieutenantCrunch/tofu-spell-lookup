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
import { MatchingTextColorSelect } from './MatchingTextColorSelect';
import { PlaceholderBox } from '../../PlaceholderBox';
import { AllTextColorSelect } from './AllTextColorSelect';
import { TextColorSearchHSL } from './TextColorSearchHSL';
import { SectionControlContainer } from '../../StyledMui/SectionControlContainer';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { selectSearchTextColor, setSearchTextColor } from '../../../redux/slices/searches/textColor';

// Utilities
import { SPELL_PROPERTIES } from '../../../utilities/constants';

export const TextColorSection = ({ }) => {
    const dispatch = useDispatch();
    const searchTextColor = useSelector(selectSearchTextColor);
    const [snackbarOpen, setSnackbarOpen] = useState(false);

    const handleClearClick = (e) => {
        dispatch(setSearchTextColor(undefined));
    };

    const handleCopyClick = async (e) => {
        if (searchTextColor && searchTextColor[SPELL_PROPERTIES.SPELL_CODE] !== 'fake') {
            try {
                await navigator.clipboard.writeText(`tu %${searchTextColor[SPELL_PROPERTIES.SPELL_CODE]} `);
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
