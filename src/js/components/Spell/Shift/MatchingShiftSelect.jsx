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
    selectNearbyShifts,
    selectSpecificShift,
    setSpecificShift
} from '../../../redux/slices/currentSelections';

// Utilities
import { SPELL_PROPERTIES, SPELL_TYPES } from '../../../utilities/constants';

export const MatchingShiftSelect = ({ id = 'matching-shift-select', sx = {} }) => {
    const dispatch = useDispatch();

    const nearbyShifts = useSelector(selectNearbyShifts);
    const specificShift = useSelector(selectSpecificShift);

    const nearbyShiftCount = nearbyShifts.length;

    const labelText = `(${nearbyShiftCount}) Matching Spell${nearbyShiftCount !== 1 ? 's' : ''}`;
    const labelId = `${id}-label`;
    const value = (
        specificShift
        ? (
            specificShift[SPELL_PROPERTIES.SPELL_CODE] === 'fake' ? '' : 
            (
                nearbyShifts.some(shift => shift[SPELL_PROPERTIES.SPELL_CODE] === specificShift[SPELL_PROPERTIES.SPELL_CODE])
                ? specificShift[SPELL_PROPERTIES.SPELL_CODE]
                : ''
            )
        )
        : ''
    );

    const handleShiftChange = (e) => {
        let selectedSpell = nearbyShifts.find(shift => shift[SPELL_PROPERTIES.SPELL_CODE] === e.target.value);

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
                <InputLabel id={labelId}>{labelText}</InputLabel>
                <Select
                    id={id}
                    label={labelText}
                    labelId={labelId}
                    onChange={handleShiftChange}
                    value={value}
                >
                    {
                        nearbyShifts[0]
                        ? nearbyShifts.map(shift => {
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
