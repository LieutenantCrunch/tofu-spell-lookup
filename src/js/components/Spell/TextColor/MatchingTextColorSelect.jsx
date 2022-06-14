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
    selectAllTextColors
} from '../../../redux/slices/spells/textColor';

import {
    clearSearchTempTextColor,
    selectSearchTextColor,
    setSearchTempTextColor,
    setSearchTextColor
} from '../../../redux/slices/searches/textColor';

// Utilities
import { SPELL_PROPERTIES } from '../../../utilities/constants';
import { checkAngleSeparation, checkValueSeparation } from '../../../utilities/utilities';

// How far to search for matching textColors
const ACCEPTABLE_DEGREES_OF_SEPARATION = 30;
const ACCEPTABLE_PERCENT_DIFFERENCE = 10;

export const MatchingTextColorSelect = ({ id = 'matching-text-color-select', sx = {} }) => {
    const dispatch = useDispatch();

    const allTextColors = useSelector(selectAllTextColors);
    const searchTextColor = useSelector(selectSearchTextColor);

    // Get the filtered textColorss near the searchTextColor
    const nearbyTextColors = searchTextColor 
    ? allTextColors.filter(textColor => {
            let { hue: searchHue, saturation: searchSaturation, lightness: searchLightness } = searchTextColor;
            let { hue: textColorHue, saturation: textColorSaturation, lightness: textColorLightness } = textColor;

            let hueMatches = checkAngleSeparation(searchHue, textColorHue, ACCEPTABLE_DEGREES_OF_SEPARATION);
            let saturationMatches = checkValueSeparation(searchSaturation, textColorSaturation, ACCEPTABLE_PERCENT_DIFFERENCE);
            let lightnessMatches = checkValueSeparation(searchLightness, textColorLightness, ACCEPTABLE_PERCENT_DIFFERENCE);

            return hueMatches && saturationMatches && lightnessMatches;
        }).sort((a, b) => a.hue - b.hue)
    : [];

    const nearbyTextColorCount = nearbyTextColors.length;

    const labelText = `(${nearbyTextColorCount}) Matching Spell${nearbyTextColorCount !== 1 ? 's' : ''}`;
    const labelId = `${id}-label`;

    const value = (
        searchTextColor
        ? (
            searchTextColor[SPELL_PROPERTIES.SPELL_CODE] === 'fake'
            ? ''
            : (
                nearbyTextColors.some(textColor => textColor[SPELL_PROPERTIES.SPELL_CODE] === searchTextColor[SPELL_PROPERTIES.SPELL_CODE])
                ? searchTextColor[SPELL_PROPERTIES.SPELL_CODE]
                : ''
            )
        )
        : ''
    );

    const handleTextColorChange = (e) => {
        let selectedSpell = nearbyTextColors.find(textColor => textColor[SPELL_PROPERTIES.SPELL_CODE] === e.target.value);

        if (!selectedSpell) {
            dispatch(setSearchTextColor('fake'));
        }
        else {
            dispatch(setSearchTextColor(selectedSpell));
        }
    };

    const handleTextColorMouseEnter = (e) => {
        if (e.currentTarget.dataset && e.currentTarget.dataset.spellCode) {
            let tempSpell = nearbyTextColors.find(textColor => textColor[SPELL_PROPERTIES.SPELL_CODE] === e.currentTarget.dataset.spellCode);

            dispatch(setSearchTempTextColor(tempSpell));
        }
    };

    const handleTextColorMouseLeave = (e) => {
        if (e.currentTarget.dataset && e.currentTarget.dataset.spellCode) {
            dispatch(clearSearchTempTextColor(e.currentTarget.dataset.spellCode));
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
                            nearbyTextColors[0]
                            ? nearbyTextColors.map(textColor => {
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
                                        {spellCode}
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
