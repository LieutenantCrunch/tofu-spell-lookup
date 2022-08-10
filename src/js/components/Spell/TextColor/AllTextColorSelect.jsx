import React from 'react';
import { isMobile } from 'react-device-detect';

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

// Other Components
import { SpellCode } from '../../Generic/SpellCode';

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

    const handleNextClick = (e) => {
        if (searchTextColor && searchTextColor[SPELL_PROPERTIES.SPELL_CODE] !== 'fake') {
            const totalSpells = allTextColors.length;
            const specificSpellCode = searchTextColor[SPELL_PROPERTIES.SPELL_CODE];

            for (let i = 0; i < totalSpells; i++) {
                let spell = allTextColors[i];
                
                if (spell[SPELL_PROPERTIES.SPELL_CODE] === specificSpellCode) {
                    if (i < totalSpells - 1) {
                        dispatch(setSearchTextColor(allTextColors[i + 1]));
                    }
                    else {
                        dispatch(setSearchTextColor(allTextColors[0]));
                    }

                    break;
                }
            }
        }
        else {
            dispatch(setSearchTextColor(allTextColors[0]));
        }
    };

    const handlePreviousClick = (e) => {
        const totalSpells = allTextColors.length;

        if (searchTextColor && searchTextColor[SPELL_PROPERTIES.SPELL_CODE] !== 'fake') {
            const specificSpellCode = searchTextColor[SPELL_PROPERTIES.SPELL_CODE];

            for (let i = 0; i < totalSpells; i++) {
                let spell = allTextColors[i];
                
                if (spell[SPELL_PROPERTIES.SPELL_CODE] === specificSpellCode) {
                    if (i > 0) {
                        dispatch(setSearchTextColor(allTextColors[i - 1]));
                    }
                    else {
                        dispatch(setSearchTextColor(allTextColors[totalSpells - 1]));
                    }

                    break;
                }
            }
        }
        else {
            dispatch(setSearchTextColor(allTextColors[totalSpells - 1]));
        }
    };

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
                                            flexShrink: 0,
                                            height: '1em',
                                            marginRight: '.5em',
                                            width: '1em'
                                        }}
                                    >
                                    </span>
                                    <SpellCode spell={textColor} />
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
