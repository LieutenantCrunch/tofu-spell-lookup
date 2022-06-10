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
    selectFilteredBlends
} from '../../../redux/slices/currentSelections';
import {
    selectSearchBlend,
    setSearchBlend
} from '../../../redux/slices/searches/blend';

// Utilities
import { SPELL_PROPERTIES, USER_FRIENDLY_BLEND_TYPES } from '../../../utilities/constants';

export const AllBlendSelect = ({ id = 'blend-select', sx = {} }) => {
    const dispatch = useDispatch();

    const filteredBlends = useSelector(selectFilteredBlends);
    const searchBlend = useSelector(selectSearchBlend); // ##specificShift

    const labelId = `${id}-label`;

    let value = (
        searchBlend
        ? (
            searchBlend[SPELL_PROPERTIES.SPELL_CODE] === 'fake' ? '' : searchBlend[SPELL_PROPERTIES.SPELL_CODE]
        )
        : ''
    );

    const handleBlendChange = (e) => {
        let selectedSpell = filteredBlends.find(blend => blend[SPELL_PROPERTIES.SPELL_CODE] === e.target.value);

        dispatch(setSearchBlend(selectedSpell));
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
        </Box>
    );
};
