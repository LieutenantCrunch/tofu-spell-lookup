import React from 'react';

// MUI
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';

// MUI Icons
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';

// Other Components
import { BlendSelect } from './BlendSelect';
import { HelpIcon } from '../../StyledMui/HelpIcon';
import { SectionControlContainer } from '../../StyledMui/SectionControlContainer';

// Redux
import { useDispatch } from 'react-redux';
import { setCurrentBlend } from '../../../redux/slices/currentSelections';

export const BlendSection = ({ }) => {
    const dispatch = useDispatch();

    const handleClearClick = (e) => {
        dispatch(setCurrentBlend(undefined));
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
                    title="🔆 Blends"
                    description={
                        <>
                            These are your <b>🔆 Color Shifts</b>, which change all frames a consistent color.
                        </>
                    }
                />
                <Typography
                    variant="h6"
                >
                    🔆 Blends
                </Typography>
                <IconButton
                    aria-label="clear blend"
                    color="error"
                    onClick={handleClearClick}
                    title="Clear Blend"
                >
                    <ClearRoundedIcon />
                </IconButton>
            </div>
            <SectionControlContainer>
                <BlendSelect
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
