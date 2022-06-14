import React from 'react';

// MUI
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

// MUI Icons
import NavigateBeforeRoundedIcon from '@mui/icons-material/NavigateBeforeRounded';
import NavigateNextRoundedIcon from '@mui/icons-material/NavigateNextRounded';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { selectCurrentTestFont, setCurrentTestFont } from '../../../redux/slices/currentSelections';

// Utilities
import { SPELL_FONTS } from '../../../utilities/constants';

const allFonts = Object.values(SPELL_FONTS).sort((a, b) => (a.localeCompare(b)));
const totalFonts = allFonts.length;

export const StaticFontSelect = ({ id = 'static-font-select', sx = {} }) => {
    const dispatch = useDispatch();
    const currentTestFont = useSelector(selectCurrentTestFont);

    const labelId = `${id}-label`;

    const handleFontChange = (e) => {
        dispatch(setCurrentTestFont(e.target.value));
    };

    const handleNextClick = (e) => {
        if (currentTestFont) {
            for (let i = 0; i < totalFonts; i++) {
                let font = allFonts[i];
                
                if (font === currentTestFont) {
                    if (i < totalFonts - 1) {
                        dispatch(setCurrentTestFont(allFonts[i + 1]));
                    }
                    else {
                        dispatch(setCurrentTestFont(allFonts[0]));
                    }

                    break;
                }
            }
        }
        else {
            dispatch(setCurrentTestFont(allFonts[0]));
        }
    };

    const handlePreviousClick = (e) => {
        if (currentTestFont) {
            for (let i = 0; i < totalFonts; i++) {
                let font = allFonts[i];
                
                if (font === currentTestFont) {
                    if (i > 0) {
                        dispatch(setCurrentTestFont(allFonts[i - 1]));
                    }
                    else {
                        dispatch(setCurrentTestFont(allFonts[totalFonts - 1]));
                    }

                    break;
                }
            }
        }
        else {
            dispatch(setCurrentTestFont(allFonts[totalFonts - 1]));
        }
    };

    const value = currentTestFont ? currentTestFont : '';

    return (
        <Box
            style={{
                display: 'flex',
                flexWrap: 'nowrap'
            }}
            sx={sx}
        >
            <IconButton
                onClick={handlePreviousClick}
                style={{
                    borderRadius: '4px 0 0 4px'
                }}
            >
                <NavigateBeforeRoundedIcon />
            </IconButton>
            <FormControl fullWidth>
                <InputLabel id={labelId}>All Possible Fonts</InputLabel>
                <Select
                    id={id}
                    label="All Possible Fonts"
                    labelId={labelId}
                    onChange={handleFontChange}
                    value={value}
                >
                    {
                        allFonts[0]
                        ? allFonts.map(font => {
                            return (
                                <MenuItem
                                    key={font}
                                    value={font}
                                >
                                    <span
                                        style={{
                                            fontFamily: `'${font}'`,
                                            fontSize: '1.5em',
                                        }}
                                    >
                                        {font}
                                    </span>
                                </MenuItem>
                            );
                        })
                        : (
                            <MenuItem
                                key="None"
                                value="None"
                            >
                                None
                            </MenuItem>
                        )
                    }
                </Select>
            </FormControl>
            <IconButton
                onClick={handleNextClick}
                style={{
                    borderRadius: '0 4px 4px 0'
                }}
            >
                <NavigateNextRoundedIcon />
            </IconButton>
        </Box>
    );
};