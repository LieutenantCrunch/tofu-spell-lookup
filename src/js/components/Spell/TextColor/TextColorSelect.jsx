import React from 'react';

// MUI
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { selectAllTextColors } from '../../../redux/slices/spells/textColor';
import { 
    selectCurrentTextColor,
    setCurrentTextColor
} from '../../../redux/slices/currentSelections';

export const TextColorSelect = ({ id = 'text-color-select', sx = {} }) => {
    const dispatch = useDispatch();

    const allTextColors = useSelector(selectAllTextColors);
    const currentTextColor = useSelector(selectCurrentTextColor);

    const labelId = `${id}-label`;

    const value = currentTextColor ? currentTextColor.id : ''; 

    const handleTextColorChange = (e) => {
        let selectedSpell = allTextColors.find(textColor => textColor.id === e.target.value);

        dispatch(setCurrentTextColor(selectedSpell));
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
                    onChange={handleTextColorChange}
                    value={value}
                >
                    {
                        allTextColors[0]
                        ? allTextColors.map(textColor => {
                            return (
                                <MenuItem
                                    key={textColor.id}
                                    style={{
                                        color: textColor.value,
                                        fontWeight: 'bold'
                                    }}
                                    value={textColor.id}
                                >
                                    {textColor.id}
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
