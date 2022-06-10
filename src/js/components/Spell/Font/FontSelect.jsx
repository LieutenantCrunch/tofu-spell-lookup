import React from 'react';

// MUI
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { selectAllFonts } from '../../../redux/slices/spells/font';
import { 
    selectCurrentFont,
    setCurrentFont
} from '../../../redux/slices/currentSelections';

// Utilities
import { SPELL_PROPERTIES, SPELL_FONTS } from '../../../utilities/constants';

export const FontSelect = ({ id = 'font-select', sx = {} }) => {
    const dispatch = useDispatch();

    const allFonts = useSelector(selectAllFonts);
    const currentFont = useSelector(selectCurrentFont);

    const labelId = `${id}-label`;

    const value = currentFont ? currentFont[SPELL_PROPERTIES.SPELL_CODE] : ''; 

    const handleFontChange = (e) => {
        let selectedSpell = allFonts.find(font => font[SPELL_PROPERTIES.SPELL_CODE] === e.target.value);

        dispatch(setCurrentFont(selectedSpell));
    };

    return (
        <Box
            sx={sx}
        >
            <FormControl fullWidth>
                <InputLabel id={labelId}>All Spells</InputLabel>
                <Select
                    id={id}
                    label="All Spells"
                    labelId={labelId}
                    onChange={handleFontChange}
                    value={value}
                >
                    {
                        allFonts[0]
                        ? allFonts.map(font => {
                            return (
                                <MenuItem
                                    key={font[SPELL_PROPERTIES.SPELL_CODE]}
                                    value={font[SPELL_PROPERTIES.SPELL_CODE]}
                                >
                                    <span
                                        style={{
                                            marginRight: '.5em'
                                        }}
                                    >
                                        {`%${font[SPELL_PROPERTIES.SPELL_CODE]}:`}
                                    </span>
                                    <span
                                        style={{
                                            fontFamily: `'${font.fontFamily}'`,
                                            fontSize: '1.5em',
                                        }}
                                    >
                                        {font.fontFamily}
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
