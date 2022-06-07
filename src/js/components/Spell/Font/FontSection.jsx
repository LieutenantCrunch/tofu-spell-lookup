import React, { useState } from 'react';

// MUI
import IconButton from '@mui/material/IconButton';
import Snackbar from '@mui/material/Snackbar';
import Typography from '@mui/material/Typography';

// MUI Icons
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';
import ContentCopyRoundedIcon from '@mui/icons-material/ContentCopyRounded';

// Other Components
import { FontSelect } from './FontSelect';
import { NameTextField } from './NameTextField';
import { SeriesTextField } from './SeriesTextField';
import { SectionControlContainer } from '../../StyledMui/SectionControlContainer';

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
                    display: 'flex'
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
                        marginBottom: '1em',
                        width: {
                            xs: '66%',
                            sm: '30%'
                        }
                    }}
                />
                <NameTextField
                    sx={{
                        flexGrow: 0,
                        marginBottom: '1em',
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
                        marginBottom: '1em',
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
