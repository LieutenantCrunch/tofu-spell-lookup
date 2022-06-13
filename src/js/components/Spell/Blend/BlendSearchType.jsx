import React, { useEffect, useState } from 'react';

// MUI
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Typography from '@mui/material/Typography';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { selectSearchBlend, setSearchBlend, setSearchBlendType } from '../../../redux/slices/searches/blend';

// Utilities
import { SPELL_PROPERTIES, SPELL_TYPES, USER_FRIENDLY_BLEND_TYPES } from '../../../utilities/constants';

export const BlendSearchType = ({ id = 'blend-search-type', sx = {} }) => {
    const dispatch = useDispatch();
    const searchBlend = useSelector(selectSearchBlend);

    const [currentType, setCurrentType] = useState(undefined);
    const labelId = `${id}-label`;

    useEffect(() => {
        if (searchBlend) {
            setCurrentType(searchBlend[SPELL_PROPERTIES.TYPE])
        }
    }, [searchBlend])

    const handleTypeChange = (e) => {
        let selectedType = e.target.value;

        setCurrentType(selectedType);

        dispatch(setSearchBlendType(selectedType));

        dispatch(setSearchBlend('fake'));
    };

    let blendTypes = Object.keys(USER_FRIENDLY_BLEND_TYPES);
    let value = currentType || '';

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
                1: Select the Blend Type
            </Typography>
            <div
                style={{
                    alignItems: 'center',
                    display: 'flex',
                    flexGrow: 1
                }}
            >
                <FormControl fullWidth>
                    <InputLabel id={labelId}>Blend Type</InputLabel>
                    <Select
                        id={id}
                        label="Blend Type"
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
                            value={SPELL_TYPES.ALL}
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
            </div>
        </Box>
    );
};
