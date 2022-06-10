import React, { useEffect, useState } from 'react';

// MUI
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { selectSearchBlendType, setSearchBlendType } from '../../../redux/slices/searches/blend';

// Utilities
import { USER_FRIENDLY_BLEND_TYPES } from '../../../utilities/constants';

export const BlendSearchType = ({ id = 'blend-search-type', sx = {} }) => {
    const dispatch = useDispatch();
    const searchBlendType = useSelector(selectSearchBlendType);

    const [currentType, setCurrentType] = useState('');
    const labelId = `${id}-label`;

    useEffect(() => {
        if (searchBlendType === undefined && currentType) {
            setCurrentType('');
        }
    }, [searchBlendType, currentType]);

    const handleTypeChange = (e) => {
        let selectedType = e.target.value;

        setCurrentType(selectedType);
        dispatch(setSearchBlendType(selectedType === '' ? undefined : selectedType));
    };

    let blendTypes = Object.keys(USER_FRIENDLY_BLEND_TYPES);
    let value = currentType;

    return (
        <Box
            sx={sx}
        >
            <FormControl fullWidth>
                <InputLabel id={labelId}>Search Blend Type</InputLabel>
                <Select
                    id={id}
                    label="Search Blend Type"
                    labelId={labelId}
                    onChange={handleTypeChange}
                    SelectDisplayProps={{
                        style: {
                            alignItems: 'center',
                            display: 'flex'
                        }
                    }}
                    value={value}
                >
                    <MenuItem
                        key="None"
                        value=""
                    >
                        None
                    </MenuItem>
                    <MenuItem
                        key="Any"
                        value={-1}
                    >
                        Any
                    </MenuItem>
                    <Divider />
                    {
                        blendTypes[0]
                        && blendTypes.map(blendType => {
                            return (
                                <MenuItem
                                    key={blendType}
                                    value={blendType}
                                >
                                    <span>
                                        {USER_FRIENDLY_BLEND_TYPES[blendType]}
                                    </span>
                                </MenuItem>
                            );
                        })
                    }
                </Select>
            </FormControl>
        </Box>
    );
};