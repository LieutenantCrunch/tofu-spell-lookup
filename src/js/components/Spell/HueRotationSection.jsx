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

// Redux
import { useDispatch } from 'react-redux';
import { setSpecificRotate } from '../../redux/slices/currentSelections';

export const HueRotationSection = ({ }) => {
    const dispatch = useDispatch();

    const handleClearClick = (e) => {
        dispatch(setSpecificRotate(undefined));
    };

    return <>
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
        <div
            style={{
                alignItems: 'center',
                display: 'flex',
                justifyContent: 'space-between'
            }}
        >
            <RotateSlider
                style={{
                    margin: '0 1em',
                    width: '30%'
                }}
            />
            <MatchingRotateSelect
                rootStyle={{
                    width: '30%'
                }}
            />
            <AllRotateSelect
                rootStyle={{
                    width: '30%'
                }}
            />
        </div>
    </>;
};
