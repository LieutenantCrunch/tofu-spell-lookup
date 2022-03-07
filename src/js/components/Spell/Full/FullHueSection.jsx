import React from 'react';

// MUI
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';

// MUI Icons
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';

// Other Components
import { FullHueSelect } from './FullHueSelect';
import { HelpIcon } from '../../StyledMui/HelpIcon';
import { SectionControlContainer } from '../../StyledMui/SectionControlContainer';

// Redux
import { useDispatch } from 'react-redux';
import { setCurrentHue } from '../../../redux/slices/currentSelections';

export const FullHueSection = ({ }) => {
    const dispatch = useDispatch();

    const handleClearClick = (e) => {
        dispatch(setCurrentHue(undefined));
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
                            These are your <b>🔆 Color Shifts</b>, which change all frames a consistent color.
                        </>
                    }
                />
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
            <SectionControlContainer>
                <FullHueSelect
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
        </div>
    );
};
