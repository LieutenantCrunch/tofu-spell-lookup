import React from 'react';

// MUI
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';

// MUI Icons
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';

// Other Components
import { AllShiftSelect } from './AllShiftSelect';
import { MatchingShiftSelect } from './MatchingShiftSelect';
import { ShiftSlider } from './ShiftSlider';
import { HelpIcon } from '../../StyledMui/HelpIcon';
import { SectionControlContainer } from '../../StyledMui/SectionControlContainer';

// Redux
import { useDispatch } from 'react-redux';
import { setSpecificShift } from '../../../redux/slices/currentSelections';

export const ShiftSection = ({ }) => {
    const dispatch = useDispatch();

    const handleClearClick = (e) => {
        dispatch(setSpecificShift(undefined));
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
                <HelpIcon
                    title="🔅 Hue Shifts"
                    description={
                        <>
                            These are your <b>🔅 Color Shifts</b>, which change from frame to frame. The Matching Spells select shows spells close to the current appearance.
                        </>
                    }
                />
                <Typography
                    variant="h6"
                >
                    🔅 Hue Shifts
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
        </div>
    );
};
