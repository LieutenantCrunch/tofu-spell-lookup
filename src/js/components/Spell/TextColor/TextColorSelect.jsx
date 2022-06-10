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

// Utilities
import { SPELL_PROPERTIES } from '../../../utilities/constants';

export const TextColorSelect = ({ id = 'text-color-select', sx = {} }) => {
    const dispatch = useDispatch();

    const allTextColors = useSelector(selectAllTextColors);
    const currentTextColor = useSelector(selectCurrentTextColor);

    const labelId = `${id}-label`;

    const value = currentTextColor ? currentTextColor[SPELL_PROPERTIES.SPELL_CODE] : ''; 

    const handleTextColorChange = (e) => {
        let selectedSpell = allTextColors.find(textColor => textColor[SPELL_PROPERTIES.SPELL_CODE] === e.target.value);

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
                    SelectDisplayProps={{
                        style: {
                            alignItems: 'center',
                            display: 'flex'
                        }
                    }}
                    value={value}
                >
                    {
                        allTextColors[0]
                        ? allTextColors.map(textColor => {
                            const spellCode = textColor[SPELL_PROPERTIES.SPELL_CODE];

                            return (
                                <MenuItem
                                    key={spellCode}
                                    value={spellCode}
                                >
                                    <span
                                        style={{
                                            backgroundColor: textColor.color,
                                            borderRadius: '50%',
                                            display: 'inline-block',
                                            height: '1em',
                                            marginRight: '.5em',
                                            width: '1em'
                                        }}
                                    >
                                    </span>
                                    {`%${spellCode}`}
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
