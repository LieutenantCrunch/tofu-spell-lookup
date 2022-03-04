import React from 'react';

// MUI
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';

// MUI Icons
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';

// Other Components
import { AllRotateSelect } from './AllRotateSelect';
import { MatchingRotateSelect } from './MatchingRotateSelect';
import { RotateSlider } from './RotateSlider';
import { SectionControlContainer } from '../SectionControlContainer';

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
