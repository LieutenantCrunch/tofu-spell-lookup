import React from 'react';

// MUI
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';

// MUI Icons
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';

// Other Components
import { FullHueSelect } from './FullHueSelect';

// Redux
import { useDispatch } from 'react-redux';
import { setCurrentHue } from '../../redux/slices/currentSelections';

export const FullHueSection = ({ }) => {
    const dispatch = useDispatch();

    const handleClearClick = (e) => {
        dispatch(setCurrentHue(undefined));
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
                Full Hues
            </Typography>
            <IconButton
                aria-label="clear hue"
                onClick={handleClearClick}
                title="Clear Hue"
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
            <FullHueSelect
                rootStyle={{
                    width: '30%'
                }}
            />
        </div>
    </>;
};
