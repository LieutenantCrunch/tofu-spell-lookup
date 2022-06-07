import React, { useState } from 'react';

// MUI
import IconButton from '@mui/material/IconButton';
import Snackbar from '@mui/material/Snackbar';
import Typography from '@mui/material/Typography';

// MUI Icons
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';
import ContentCopyRoundedIcon from '@mui/icons-material/ContentCopyRounded';

// Other Components
import { AllShiftSelect } from './AllShiftSelect';
import { MatchingShiftSelect } from './MatchingShiftSelect';
import { ShiftSlider } from './ShiftSlider';
import { SectionControlContainer } from '../../StyledMui/SectionControlContainer';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { selectSpecificShift, setSpecificShift } from '../../../redux/slices/currentSelections';

// Utilities
import { SPELL_PROPERTIES } from '../../../utilities/constants';

export const ShiftSection = ({ }) => {
    const dispatch = useDispatch();
    const specificShift = useSelector(selectSpecificShift);
    const [snackbarOpen, setSnackbarOpen] = useState(false);

    const handleClearClick = (e) => {
        dispatch(setSpecificShift(undefined));
    };

    const handleCopyClick = async (e) => {
        if (specificShift) {
            try {
                await navigator.clipboard.writeText(`tu %${specificShift[SPELL_PROPERTIES.SPELL_CODE]} `);
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
                    🔅Hue Shifts
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
                <ShiftSlider
                    sx={{
                        margin: '0 1em 1em',
                        width: {
                            xs: '66%',
                            sm: '30%'
                        }
                    }}
                />
                <MatchingShiftSelect
                    sx={{
                        flexShrink: 0,
                        marginBottom: '1em',
                        width: {
                            xs: '66%',
                            sm: '30%'
                        }
                    }}
                />
                <AllShiftSelect
                    sx={{
                        flexShrink: 0,
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
                key='shiftCopied'
                message='Spell command copied!'
                onClose={handleSnackbarClose}
                open={snackbarOpen}
            />
        </div>
    );
};
