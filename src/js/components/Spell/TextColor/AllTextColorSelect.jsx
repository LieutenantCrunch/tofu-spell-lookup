import React from 'react';
import { isMobile } from 'react-device-detect';

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
    clearSearchTempTextColor,
    selectSearchTextColor,
    setSearchTempTextColor,
    setSearchTextColor
} from '../../../redux/slices/searches/textColor';

// Utilities
import { SPELL_PROPERTIES } from '../../../utilities/constants';

export const AllTextColorSelect = ({ id = 'text-color-select', sx = {} }) => {
    const dispatch = useDispatch();

    const allTextColors = useSelector(selectAllTextColors);
    const searchTextColor = useSelector(selectSearchTextColor);

    const labelId = `${id}-label`;

    const value = (
        searchTextColor
        ? (
            searchTextColor[SPELL_PROPERTIES.SPELL_CODE] === 'fake' ? '' : searchTextColor[SPELL_PROPERTIES.SPELL_CODE]
        )
        : ''
    );

    const handleTextColorChange = (e) => {
        let selectedSpell = allTextColors.find(textColor => textColor[SPELL_PROPERTIES.SPELL_CODE] === e.target.value);

        dispatch(setSearchTextColor(selectedSpell));
    };

    const handleTextColorMouseEnter = (e) => {
        if (!isMobile) {
            if (e.currentTarget.dataset && e.currentTarget.dataset.spellCode) {
                let tempSpell = allTextColors.find(textColor => textColor[SPELL_PROPERTIES.SPELL_CODE] === e.currentTarget.dataset.spellCode);

                dispatch(setSearchTempTextColor(tempSpell));
            }
        }
    };

    const handleTextColorMouseLeave = (e) => {
        if (!isMobile) {
                if (e.currentTarget.dataset && e.currentTarget.dataset.spellCode) {
                dispatch(clearSearchTempTextColor(e.currentTarget.dataset.spellCode));
            }
        }
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
                                    data-spell-code={spellCode}
                                    key={spellCode}
                                    onMouseEnter={handleTextColorMouseEnter}
                                    onMouseLeave={handleTextColorMouseLeave}
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
