import React, { useState } from 'react';

// MUI
import IconButton from '@mui/material/IconButton';
import Snackbar from '@mui/material/Snackbar';
import Typography from '@mui/material/Typography';

// MUI Icons
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';
import ContentCopyRoundedIcon from '@mui/icons-material/ContentCopyRounded';

// Other Components
import { TextColorSelect } from './TextColorSelect';
import { SectionControlContainer } from '../../StyledMui/SectionControlContainer';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { selectCurrentTextColor, setCurrentTextColor } from '../../../redux/slices/currentSelections';

// Utilities
import { SPELL_PROPERTIES } from '../../../utilities/constants';

export const TextColorSection = ({ }) => {
    const dispatch = useDispatch();
    const currentTextColor = useSelector(selectCurrentTextColor);
    const [snackbarOpen, setSnackbarOpen] = useState(false);

    const handleClearClick = (e) => {
        dispatch(setCurrentTextColor(undefined));
    };

    const handleCopyClick = async (e) => {
        if (currentTextColor) {
            try {
                await navigator.clipboard.writeText(`tu %${currentTextColor[SPELL_PROPERTIES.SPELL_CODE]} `);
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
                <TextColorSelect
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
                key='textColorCopied'
                message='Spell command copied!'
                onClose={handleSnackbarClose}
                open={snackbarOpen}
            />
        </div>
    );
};
