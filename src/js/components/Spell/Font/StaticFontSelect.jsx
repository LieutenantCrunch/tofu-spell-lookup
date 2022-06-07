import React from 'react';

// MUI
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { selectCurrentTestFont, setCurrentTestFont } from '../../../redux/slices/currentSelections';

// Utilities
import { SPELL_FONTS } from '../../../utilities/constants';

const allFonts = Object.values(SPELL_FONTS).sort((a, b) => (a.localeCompare(b)));

export const StaticFontSelect = ({ id = 'static-font-select', sx = {} }) => {
    const dispatch = useDispatch();
    const currentTestFont = useSelector(selectCurrentTestFont);

    const labelId = `${id}-label`;

    const handleFontChange = (e) => {
        dispatch(setCurrentTestFont(e.target.value));
    };

    const value = currentTestFont ? currentTestFont : '';

    return (
        <Box sx={sx}>
            <FormControl fullWidth>
                <InputLabel id={labelId}>All Fonts</InputLabel>
                <Select
                    id={id}
                    label="All Fonts"
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
        </Box>
    );
};