import React from 'react';

// MUI
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';

// MUI Icons
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';

// Other Components
import { TextColorSelect } from './TextColorSelect';
import { SectionControlContainer } from '../../StyledMui/SectionControlContainer';

// Redux
import { useDispatch } from 'react-redux';
import { setCurrentTextColor } from '../../../redux/slices/currentSelections';

export const TextColorSection = ({ }) => {
    const dispatch = useDispatch();

    const handleClearClick = (e) => {
        dispatch(setCurrentTextColor(undefined));
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
                    Text Color
                </Typography>
                <IconButton
                    aria-label="clear text color"
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
        </div>
    );
};
