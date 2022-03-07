import React from 'react';

// MUI
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';

// MUI Icons
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';

// Other Components
import { AllRotateSelect } from './AllRotateSelect';
import { MatchingRotateSelect } from './MatchingRotateSelect';
import { RotateSlider } from './RotateSlider';
import { HelpIcon } from '../../StyledMui/HelpIcon';
import { SectionControlContainer } from '../../StyledMui/SectionControlContainer';

// Redux
import { useDispatch } from 'react-redux';
import { setSpecificRotate } from '../../../redux/slices/currentSelections';

export const HueRotationSection = ({ }) => {
    const dispatch = useDispatch();

    const handleClearClick = (e) => {
        dispatch(setSpecificRotate(undefined));
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
                    title="Hue Rotations"
                    description={
                        <>
                            These are your <b>🔅 Color Shifts</b>, which change from frame to frame. The Matching Spells select shows spells close to the current appearance.
                        </>
                    }
                />
                <Typography
                    variant="h6"
                >
                    Hue Rotations
                </Typography>
                <IconButton
                    aria-label="clear rotation"
                    onClick={handleClearClick}
                    title="Clear Rotation"
                >
                    <ClearRoundedIcon />
                </IconButton>
            </div>
            <SectionControlContainer>
                <RotateSlider
                    sx={{
                        margin: '0 1em 1em',
                        width: {
                            xs: '66%',
                            sm: '30%'
                        }
                    }}
                />
                <MatchingRotateSelect
                    sx={{
                        flexShrink: 0,
                        marginBottom: '1em',
                        width: {
                            xs: '66%',
                            sm: '30%'
                        }
                    }}
                />
                <AllRotateSelect
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
