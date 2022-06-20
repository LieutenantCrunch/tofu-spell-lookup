import React from 'react';
import { isMobileOnly } from 'react-device-detect';

// MUI
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';

// MUI Icons
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';
import ExpandMoreRoundedIcon from '@mui/icons-material/ExpandMoreRounded';
import PersonOutlineRoundedIcon from '@mui/icons-material/PersonOutlineRounded';

// Other Components
import { CharacterUrlTextField } from './CharacterUrlTextField';
import { SectionControlContainer } from '../StyledMui/SectionControlContainer';

// Redux
import { useDispatch } from 'react-redux';
import { setCurrentCharacterImage } from '../../redux/slices/currentSelections';

export const CharacterUrlSection = ({ }) => {
    const dispatch = useDispatch();

    const handleClearClick = (e) => {
        dispatch(setCurrentCharacterImage(undefined));
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
                    display: 'flex',
                    marginBottom: '1em'
                }}
            >
                <PersonOutlineRoundedIcon 
                    style={{
                        padding: '8px'
                    }}
                />
                <Typography
                    variant="h6"
                >
                    Character
                </Typography>
                <IconButton
                    aria-label="clear character"
                    color="error"
                    onClick={handleClearClick}
                    title="Clear Character"
                >
                    <ClearRoundedIcon />
                </IconButton>
            </div>
            <SectionControlContainer>
                <CharacterUrlTextField
                    sx={{
                        flexGrow: 0,
                        width: '66%'
                    }}
                />
            </SectionControlContainer>
        </div>
    );
};
