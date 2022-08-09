import React from 'react';
import { isMobile } from 'react-device-detect';

// MUI
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Typography from '@mui/material/Typography';

// MUI Icons
import NavigateBeforeRoundedIcon from '@mui/icons-material/NavigateBeforeRounded';
import NavigateNextRoundedIcon from '@mui/icons-material/NavigateNextRounded';

// Other Components
import { SpellCode } from '../../Generic/SpellCode';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import {
    selectAllTextGlows
} from '../../../redux/slices/spells/textGlow';

import {
    clearSearchTempTextGlow,
    selectSearchTextGlow,
    setSearchTempTextGlow,
    setSearchTextGlow
} from '../../../redux/slices/searches/textGlow';

// Utilities
import { SPELL_PROPERTIES } from '../../../utilities/constants';
import { checkAngleSeparation, checkValueSeparation } from '../../../utilities/utilities';

// How far to search for matching textGlows
const ACCEPTABLE_DEGREES_OF_SEPARATION = 30;
const ACCEPTABLE_PERCENT_DIFFERENCE = 10;

export const MatchingTextGlowSelect = ({ id = 'matching-text-glow-select', sx = {} }) => {
    const dispatch = useDispatch();

    const allTextGlows = useSelector(selectAllTextGlows);
    const searchTextGlow = useSelector(selectSearchTextGlow);

    // Get the filtered textGlows near the searchTextGlow
    const nearbyTextGlows = searchTextGlow 
    ? allTextGlows.filter(textGlow => {
            let { hue: searchHue, saturation: searchSaturation, lightness: searchLightness } = searchTextGlow;
            let { hue: textGlowHue, saturation: textGlowSaturation, lightness: textGlowLightness } = textGlow;

            let hueMatches = checkAngleSeparation(searchHue, textGlowHue, ACCEPTABLE_DEGREES_OF_SEPARATION);
            let saturationMatches = checkValueSeparation(searchSaturation, textGlowSaturation, ACCEPTABLE_PERCENT_DIFFERENCE);
            let lightnessMatches = checkValueSeparation(searchLightness, textGlowLightness, ACCEPTABLE_PERCENT_DIFFERENCE);

            return hueMatches && saturationMatches && lightnessMatches;
        }).sort((a, b) => a.hue - b.hue)
    : [];

    const nearbyTextGlowCount = nearbyTextGlows.length;

    const labelText = `(${nearbyTextGlowCount}) Matching Spell${nearbyTextGlowCount !== 1 ? 's' : ''}`;
    const labelId = `${id}-label`;

    const value = (
        searchTextGlow
        ? (
            searchTextGlow[SPELL_PROPERTIES.SPELL_CODE] === 'fake'
            ? ''
            : (
                nearbyTextGlows.some(textGlow => textGlow[SPELL_PROPERTIES.SPELL_CODE] === searchTextGlow[SPELL_PROPERTIES.SPELL_CODE])
                ? searchTextGlow[SPELL_PROPERTIES.SPELL_CODE]
                : ''
            )
        )
        : ''
    );

    const handleNextClick = (e) => {
        if (nearbyTextGlowCount > 0) {
            if (searchTextGlow && searchTextGlow[SPELL_PROPERTIES.SPELL_CODE] !== 'fake') {
                const specificSpellCode = searchTextGlow[SPELL_PROPERTIES.SPELL_CODE];

                for (let i = 0; i < nearbyTextGlowCount; i++) {
                    let spell = nearbyTextGlows[i];
                    
                    if (spell[SPELL_PROPERTIES.SPELL_CODE] === specificSpellCode) {
                        if (i < nearbyTextGlowCount - 1) {
                            dispatch(setSearchTextGlow(nearbyTextGlows[i + 1]));
                        }
                        else {
                            dispatch(setSearchTextGlow(nearbyTextGlows[0]));
                        }

                        break;
                    }
                }
            }
            else {
                dispatch(setSearchTextGlow(nearbyTextGlows[0]));
            }
        }
    };

    const handlePreviousClick = (e) => {
        if (nearbyTextGlowCount > 0) {
            if (searchTextGlow && searchTextGlow[SPELL_PROPERTIES.SPELL_CODE] !== 'fake') {
                const specificSpellCode = searchTextGlow[SPELL_PROPERTIES.SPELL_CODE];

                for (let i = 0; i < nearbyTextGlowCount; i++) {
                    let spell = nearbyTextGlows[i];
                    
                    if (spell[SPELL_PROPERTIES.SPELL_CODE] === specificSpellCode) {
                        if (i > 0) {
                            dispatch(setSearchTextGlow(nearbyTextGlows[i - 1]));
                        }
                        else {
                            dispatch(setSearchTextGlow(nearbyTextGlows[nearbyTextGlowCount - 1]));
                        }

                        break;
                    }
                }
            }
            else {
                dispatch(setSearchTextGlow(nearbyTextGlows[nearbyTextGlowCount - 1]));
            }
        }
    };

    const handleTextGlowChange = (e) => {
        let selectedSpell = nearbyTextGlows.find(textGlow => textGlow[SPELL_PROPERTIES.SPELL_CODE] === e.target.value);

        if (!selectedSpell) {
            dispatch(setSearchTextGlow('fake'));
        }
        else {
            dispatch(setSearchTextGlow(selectedSpell));
        }
    };

    const handleTextGlowMouseEnter = (e) => {
        if (!isMobile) {
            if (e.currentTarget.dataset && e.currentTarget.dataset.spellCode) {
                let tempSpell = nearbyTextGlows.find(textGlow => textGlow[SPELL_PROPERTIES.SPELL_CODE] === e.currentTarget.dataset.spellCode);

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
                flexDirection: 'column'
            }}
            sx={sx}
        >
            <Typography
                gutterBottom
                variant="subtitle2"
            >
                2: Check for matching spells
            </Typography>
            <Box
                style={{
                    display: 'flex',
                    flexWrap: 'nowrap'
                }}
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
                    <InputLabel id={labelId}>{labelText}</InputLabel>
                    <Select
                        id={id}
                        label={labelText}
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
                            nearbyTextGlows[0]
                            ? nearbyTextGlows.map(textGlow => {
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
                                        <SpellCode spell={textGlow} />
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
        </Box>
    );
};
