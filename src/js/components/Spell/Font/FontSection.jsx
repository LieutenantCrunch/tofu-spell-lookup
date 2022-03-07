import React from 'react';

// MUI
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';

// MUI Icons
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';

// Other Components
import { FontSelect } from './FontSelect';
import { NameTextField } from './NameTextField';
import { SeriesTextField } from './SeriesTextField';
import { SectionControlContainer } from '../../StyledMui/SectionControlContainer';

// Redux
import { useDispatch } from 'react-redux';
import { setCurrentFont } from '../../../redux/slices/currentSelections';

export const FontSection = ({ }) => {
    const dispatch = useDispatch();

    const handleClearClick = (e) => {
        dispatch(setCurrentFont(undefined));
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
                    Fonts
                </Typography>
                <IconButton
                    aria-label="clear font"
                    onClick={handleClearClick}
                    title="Clear Font"
                >
                    <ClearRoundedIcon />
                </IconButton>
            </div>
            <SectionControlContainer>
                <FontSelect
                    sx={{
                        flexGrow: 0,
                        marginBottom: '1em',
                        width: {
                            xs: '66%',
                            sm: '30%'
                        }
                    }}
                />
                <NameTextField
                    sx={{
                        flexGrow: 0,
                        marginBottom: '1em',
                        width: {
                            xs: '66%',
                            sm: '30%'
                        }
                    }}
                />
                <SeriesTextField
                    label="Series"
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
