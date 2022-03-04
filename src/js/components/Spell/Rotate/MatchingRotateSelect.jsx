import React from 'react';

// MUI
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { 
    selectNearbyRotates,
    selectSpecificRotate,
    setSpecificRotate
} from '../../../redux/slices/currentSelections';

export const MatchingRotateSelect = ({ id = 'matching-rotate-select', rootStyle = {} }) => {
    const dispatch = useDispatch();

    const nearbyRotates = useSelector(selectNearbyRotates);
    const specificRotate = useSelector(selectSpecificRotate);

    const nearbyRotateIds = nearbyRotates.map(rotate => rotate.id);
    const nearbyRotateCount = nearbyRotates.length;

    const labelText = `(${nearbyRotateCount}) Matching Spell${nearbyRotateCount !== 1 ? 's' : ''}`;
    const labelId = `${id}-label`;
    const value = (
        specificRotate
        ? (
            specificRotate.id === 'fake' ? '' : 
            (
                nearbyRotateIds.some(id => id === specificRotate.id)
                ? specificRotate.id
                : ''
            )
        )
        : ''
    );

    const handleRotateChange = (e) => {
        let selectedSpell = nearbyRotates.find(rotate => rotate.id === e.target.value);

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
        <div
            style={rootStyle}
        >
            <FormControl fullWidth>
                <InputLabel id={labelId}>{labelText}</InputLabel>
                <Select
                    id={id}
                    label={labelText}
                    labelId={labelId}
                    onChange={handleRotateChange}
                    value={value}
                >
                    {
                        nearbyRotates[0]
                        ? nearbyRotates.map(rotate => {
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
        </div>
    );
};
