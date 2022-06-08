import React from 'react';

// MUI
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import {
    selectCurrentBlend,
    selectCurrentBlendSearchHue,
    selectFilteredBlends,
    setCurrentBlend
} from '../../../redux/slices/currentSelections';

// Utilities
import { SPELL_PROPERTIES, USER_FRIENDLY_BLEND_TYPES } from '../../../utilities/constants';
import { checkAngleSeparation, decToHex, zeroPad } from '../../../utilities/utilities';

// How far to search for matching blends
const ACCEPTABLE_DEGREES_OF_SEPARATION = 30;

export const MatchingBlendSelect = ({ id = 'matching-blend-select', sx = {} }) => {
    const dispatch = useDispatch();

    const currentBlend = useSelector(selectCurrentBlend);
    const currentBlendSearchHue = useSelector(selectCurrentBlendSearchHue);
    const filteredBlends = useSelector(selectFilteredBlends);

    // Get the filtered blends near the search hue
    const nearbyBlends = filteredBlends.filter(blend => {
        return checkAngleSeparation(currentBlendSearchHue, blend.hue, ACCEPTABLE_DEGREES_OF_SEPARATION)
    }).sort((a, b) => a.hue - b.hue);

    const nearbyBlendCount = nearbyBlends.length;

    const labelText = `(${nearbyBlendCount}) Matching Spell${nearbyBlendCount !== 1 ? 's' : ''}`;
    const labelId = `${id}-label`;
    
    const value = currentBlend 
        ? (
            nearbyBlends.some(blend => blend[SPELL_PROPERTIES.SPELL_CODE] === currentBlend[SPELL_PROPERTIES.SPELL_CODE])
            ? currentBlend[SPELL_PROPERTIES.SPELL_CODE]
            : ''
        )
        : '';

    const handleBlendChange = (e) => {
        let selectedSpell = filteredBlends.find(blend => blend[SPELL_PROPERTIES.SPELL_CODE] === e.target.value);

        dispatch(setCurrentBlend(selectedSpell));
    };

    return (
        <Box
            sx={sx}
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
                                    key={spellCode}
                                    value={spellCode}
                                >
                                    <span
                                        style={{
                                            backgroundColor: `#${zeroPad(decToHex(blend[SPELL_PROPERTIES.VALUE]), 6)}`,
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
        </Box>
    );
};
