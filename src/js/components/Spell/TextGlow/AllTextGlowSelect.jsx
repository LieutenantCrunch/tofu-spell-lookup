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

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { selectAllTextGlows } from '../../../redux/slices/spells/textGlow';
import {
    clearSearchTempTextGlow,
    selectSearchTextGlow,
    setSearchTempTextGlow,
    setSearchTextGlow
} from '../../../redux/slices/searches/textGlow';

// Utilities
import { SPELL_PROPERTIES } from '../../../utilities/constants';

export const AllTextGlowSelect = ({ id = 'text-glow-select', sx = {} }) => {
    const dispatch = useDispatch();

    const allTextGlows = useSelector(selectAllTextGlows);
    const searchTextGlow = useSelector(selectSearchTextGlow);

    const labelId = `${id}-label`;

    const value = (
        searchTextGlow
        ? (
            searchTextGlow[SPELL_PROPERTIES.SPELL_CODE] === 'fake' ? '' : searchTextGlow[SPELL_PROPERTIES.SPELL_CODE]
        )
        : ''
    );

    const handleNextClick = (e) => {
        if (searchTextGlow && searchTextGlow[SPELL_PROPERTIES.SPELL_CODE] !== 'fake') {
            const totalSpells = allTextGlows.length;
            const specificSpellCode = searchTextGlow[SPELL_PROPERTIES.SPELL_CODE];

            for (let i = 0; i < totalSpells; i++) {
                let spell = allTextGlows[i];
                
                if (spell[SPELL_PROPERTIES.SPELL_CODE] === specificSpellCode) {
                    if (i < totalSpells - 1) {
                        dispatch(setSearchTextGlow(allTextGlows[i + 1]));
                    }
                    else {
                        dispatch(setSearchTextGlow(allTextGlows[0]));
                    }

                    break;
                }
            }
        }
        else {
            dispatch(setSearchTextGlow(allTextGlows[0]));
        }
    };

    const handlePreviousClick = (e) => {
        const totalSpells = allTextGlows.length;

        if (searchTextGlow && searchTextGlow[SPELL_PROPERTIES.SPELL_CODE] !== 'fake') {
            const specificSpellCode = searchTextGlow[SPELL_PROPERTIES.SPELL_CODE];

            for (let i = 0; i < totalSpells; i++) {
                let spell = allTextGlows[i];
                
                if (spell[SPELL_PROPERTIES.SPELL_CODE] === specificSpellCode) {
                    if (i > 0) {
                        dispatch(setSearchTextGlow(allTextGlows[i - 1]));
                    }
                    else {
                        dispatch(setSearchTextGlow(allTextGlows[totalSpells - 1]));
                    }

                    break;
                }
            }
        }
        else {
            dispatch(setSearchTextGlow(allTextGlows[totalSpells - 1]));
        }
    };

    const handleTextGlowChange = (e) => {
        let selectedSpell = allTextGlows.find(textGlow => textGlow[SPELL_PROPERTIES.SPELL_CODE] === e.target.value);

        dispatch(setSearchTextGlow(selectedSpell));
    };

    const handleTextGlowMouseEnter = (e) => {
        if (!isMobile) {
            if (e.currentTarget.dataset && e.currentTarget.dataset.spellCode) {
                let tempSpell = allTextGlows.find(textGlow => textGlow[SPELL_PROPERTIES.SPELL_CODE] === e.currentTarget.dataset.spellCode);

                dispatch(setSearchTempTextGlow(tempSpell));
            }
        }
    };

    const handleTextGlowMouseLeave = (e) => {
        if (!isMobile) {
                if (e.currentTarget.dataset && e.currentTarget.dataset.spellCode) {
                dispatch(clearSearchTempTextGlow(e.currentTarget.dataset.spellCode));
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
                    onChange={handleTextGlowChange}
                    SelectDisplayProps={{
                        style: {
                            alignItems: 'center',
                            display: 'flex'
                        }
                    }}
                    value={value}
                >
                    {
                        allTextGlows[0]
                        ? allTextGlows.map(textGlow => {
                            const spellCode = textGlow[SPELL_PROPERTIES.SPELL_CODE];

                            return (
                                <MenuItem
                                    data-spell-code={spellCode}
                                    key={spellCode}
                                    onMouseEnter={handleTextGlowMouseEnter}
                                    onMouseLeave={handleTextGlowMouseLeave}
                                    value={spellCode}
                                >
                                    <span
                                        style={{
                                            backgroundColor: textGlow.color,
                                            borderRadius: '50%',
                                            display: 'inline-block',
                                            flexShrink: 0,
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
