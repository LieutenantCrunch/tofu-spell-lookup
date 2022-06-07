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
    selectFilteredBlends,
    setCurrentBlend
} from '../../../redux/slices/currentSelections';

// Utilities
import { SPELL_PROPERTIES, USER_FRIENDLY_BLEND_TYPES } from '../../../utilities/constants';
import { decToHex, zeroPad } from '../../../utilities/utilities';

export const BlendSelect = ({ id = 'blend-select', sx = {} }) => {
    const dispatch = useDispatch();

    const filteredBlends = useSelector(selectFilteredBlends);
    const currentBlend = useSelector(selectCurrentBlend);
    let value = currentBlend ? currentBlend[SPELL_PROPERTIES.SPELL_CODE] : ''; 

    const labelId = `${id}-label`;

    const handleBlendChange = (e) => {
        let selectedSpell = filteredBlends.find(blend => blend[SPELL_PROPERTIES.SPELL_CODE] === e.target.value);

        dispatch(setCurrentBlend(selectedSpell));
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
                        filteredBlends[0]
                        ? filteredBlends.map(blend => {
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
                                    <span
                                        style={{
                                            whiteSpace: 'pre'
                                        }}
                                    >
                                        {`%${spellCode} `}
                                        <span
                                            style={{
                                            fontSize: '.75em'
                                            }}
                                        >
                                            {`(${USER_FRIENDLY_BLEND_TYPES[blend[SPELL_PROPERTIES.TYPE]]})`}
                                        </span>
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
