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
    selectAllColorShiftShifts
} from '../../../redux/slices/spells/colorShift';
import { 
    selectSpecificShift,
    setSpecificShift
} from '../../../redux/slices/currentSelections';

// Utilities
import { SPELL_PROPERTIES } from '../../../utilities/constants';

export const AllShiftSelect = ({ id = 'all-shift-select', sx = {} }) => {
    const dispatch = useDispatch();

    const allShifts = useSelector(selectAllColorShiftShifts);
    const specificShift = useSelector(selectSpecificShift);

    const labelId = `${id}-label`;

    const value = (
        specificShift
        ? (
            specificShift[SPELL_PROPERTIES.SPELL_CODE] === 'fake' ? '' : specificShift[SPELL_PROPERTIES.SPELL_CODE]
        )
        : ''
    );

    const handleShiftChange = (e) => {
        let selectedSpell = allShifts.find(shift => shift[SPELL_PROPERTIES.SPELL_CODE] === e.target.value);

        if (!selectedSpell) {
            selectedSpell = {
                [SPELL_PROPERTIES.SPELL_CODE]: 'fake',
                [SPELL_PROPERTIES.TYPE]: SPELL_TYPES.HUE_SHIFT,
                [SPELL_PROPERTIES.VALUE]: 0
            }
        }

        dispatch(setSpecificShift(selectedSpell))
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
                    onChange={handleShiftChange}
                    value={value}
                >
                    {
                        allShifts[0]
                        ? allShifts.map(shift => {
                            const spellCode = shift[SPELL_PROPERTIES.SPELL_CODE];

                            return (
                                <MenuItem
                                    key={spellCode}
                                    value={spellCode}
                                >
                                    {`%${spellCode}`}
                                    <small>
                                        &nbsp;{`(${shift[SPELL_PROPERTIES.VALUE]})`}
                                    </small>
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
