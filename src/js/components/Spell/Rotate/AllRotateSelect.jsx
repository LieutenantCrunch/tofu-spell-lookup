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
    selectAllColorShiftRotates
} from '../../../redux/slices/spells/colorShift';
import { 
    selectSpecificRotate,
    setSpecificRotate
} from '../../../redux/slices/currentSelections';

export const AllRotateSelect = ({ id = 'all-rotate-select', sx = {} }) => {
    const dispatch = useDispatch();

    const allRotates = useSelector(selectAllColorShiftRotates);
    const specificRotate = useSelector(selectSpecificRotate);

    const labelId = `${id}-label`;

    const value = (
        specificRotate
        ? (
            specificRotate.id === 'fake' ? '' : specificRotate.id
        )
        : ''
    );

    const handleRotateChange = (e) => {
        let selectedSpell = allRotates.find(rotate => rotate.id === e.target.value);

        if (!selectedSpell) {
            selectedSpell = {
                id: "fake",
                type: "rotate",
                value: 0
            }
        }

        dispatch(setSpecificRotate(selectedSpell))
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
                    onChange={handleRotateChange}
                    value={value}
                >
                    {
                        allRotates[0]
                        ? allRotates.map(rotate => {
                            return (
                                <MenuItem
                                    key={rotate.id}
                                    value={rotate.id}
                                >
                                    {rotate.id}
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
