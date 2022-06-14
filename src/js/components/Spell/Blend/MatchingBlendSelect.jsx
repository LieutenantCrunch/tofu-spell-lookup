import React from 'react';

// MUI
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Typography from '@mui/material/Typography';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import {
    selectFilteredBlends
} from '../../../redux/slices/currentSelections';

import {
    clearSearchTempBlend,
    selectSearchBlend,
    setSearchBlend,
    setSearchTempBlend
} from '../../../redux/slices/searches/blend';

// Utilities
import { SPELL_PROPERTIES, USER_FRIENDLY_BLEND_TYPES } from '../../../utilities/constants';
import { checkAngleSeparation, checkValueSeparation } from '../../../utilities/utilities';

// How far to search for matching blends
const ACCEPTABLE_DEGREES_OF_SEPARATION = 30;
const ACCEPTABLE_PERCENT_DIFFERENCE = 10;

export const MatchingBlendSelect = ({ id = 'matching-blend-select', sx = {} }) => {
    const dispatch = useDispatch();

    const filteredBlends = useSelector(selectFilteredBlends);
    const searchBlend = useSelector(selectSearchBlend);

    // Get the filtered blends near the searchBlend
    const nearbyBlends = searchBlend 
    ? filteredBlends.filter(blend => {
            let { hue: searchHue, saturation: searchSaturation, lightness: searchLightness } = searchBlend;
            let { hue: blendHue, saturation: blendSaturation, lightness: blendLightness } = blend;

            let hueMatches = checkAngleSeparation(searchHue, blendHue, ACCEPTABLE_DEGREES_OF_SEPARATION);
            let saturationMatches = checkValueSeparation(searchSaturation, blendSaturation, ACCEPTABLE_PERCENT_DIFFERENCE);
            let lightnessMatches = checkValueSeparation(searchLightness, blendLightness, ACCEPTABLE_PERCENT_DIFFERENCE);

            return hueMatches && saturationMatches && lightnessMatches;
        }).sort((a, b) => a.hue - b.hue)
    : [];

    const nearbyBlendCount = nearbyBlends.length;

    const labelText = `(${nearbyBlendCount}) Matching Spell${nearbyBlendCount !== 1 ? 's' : ''}`;
    const labelId = `${id}-label`;

    const value = (
        searchBlend
        ? (
            searchBlend[SPELL_PROPERTIES.SPELL_CODE] === 'fake'
            ? ''
            : (
                nearbyBlends.some(blend => blend[SPELL_PROPERTIES.SPELL_CODE] === searchBlend[SPELL_PROPERTIES.SPELL_CODE])
                ? searchBlend[SPELL_PROPERTIES.SPELL_CODE]
                : ''
            )
        )
        : ''
    );

    const handleBlendChange = (e) => {
        let selectedSpell = filteredBlends.find(blend => blend[SPELL_PROPERTIES.SPELL_CODE] === e.target.value);

        if (!selectedSpell) {
            dispatch(setSearchBlend('fake'));
        }
        else {
            dispatch(setSearchBlend(selectedSpell));
        }
    };

    const handleBlendMouseEnter = (e) => {
        if (e.currentTarget.dataset && e.currentTarget.dataset.spellCode) {
            let tempSpell = filteredBlends.find(blend => blend[SPELL_PROPERTIES.SPELL_CODE] === e.currentTarget.dataset.spellCode);

            dispatch(setSearchTempBlend(tempSpell));
        }
    };

    const handleBlendMouseLeave = (e) => {
        if (e.currentTarget.dataset && e.currentTarget.dataset.spellCode) {
            dispatch(clearSearchTempBlend(e.currentTarget.dataset.spellCode));
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
                3: Check for matching spells
            </Typography>
            <div
                style={{
                    alignItems: 'center',
                    display: 'flex',
                    flexGrow: 1
                }}
            >
                <FormControl fullWidth>
                    <InputLabel id={labelId}>{labelText}</InputLabel>
                    <Select
                        id={id}
                        label={labelText}
                        labelId={labelId}
                        onChange={handleBlendChange}
                        SelectDisplayProps={{
                            style: {
                                alignItems: 'center',
                                display: 'flex'
                            }
                        }}
                        value={value}
                    >
                        {
                            nearbyBlends[0]
                            ? nearbyBlends.map(blend => {
                                const spellCode = blend[SPELL_PROPERTIES.SPELL_CODE];

                                return (
                                    <MenuItem
                                        data-spell-code={spellCode}
                                        key={spellCode}
                                        onMouseEnter={handleBlendMouseEnter}
                                        onMouseLeave={handleBlendMouseLeave}
                                        value={spellCode}
                                    >
                                        <span
                                            style={{
                                                backgroundColor: blend.backgroundColor,
                                                borderRadius: '50%',
                                                display: 'inline-block',
                                                height: '1em',
                                                marginRight: '.5em',
                                                width: '1em'
                                            }}
                                        >
                                        </span>
                                        <span>
                                            {`%${spellCode} `}
                                            <small
                                                style={{
                                                    marginLeft: '.5em'
                                                }}
                                            >
                                                {`(${USER_FRIENDLY_BLEND_TYPES[blend[SPELL_PROPERTIES.TYPE]]})`}
                                            </small>
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
            </div>
        </Box>
    );
};
