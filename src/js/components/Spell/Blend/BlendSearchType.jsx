import React, { useEffect, useState } from 'react';

// MUI
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Typography from '@mui/material/Typography';

// MUI Icons
import NavigateBeforeRoundedIcon from '@mui/icons-material/NavigateBeforeRounded';
import NavigateNextRoundedIcon from '@mui/icons-material/NavigateNextRounded';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import {
    selectSearchBlend,
    selectSearchBlendType,
    setSearchBlend,
    setSearchBlendType
} from '../../../redux/slices/searches/blend';

// Utilities
import { SPELL_PROPERTIES, SPELL_TYPES, USER_FRIENDLY_BLEND_TYPES } from '../../../utilities/constants';

const blendTypes = Object.keys(USER_FRIENDLY_BLEND_TYPES);
const totalTypes = blendTypes.length;

export const BlendSearchType = ({ id = 'blend-search-type', sx = {} }) => {
    const dispatch = useDispatch();
    const searchBlend = useSelector(selectSearchBlend);
    const searchBlendType = useSelector(selectSearchBlendType);

    const [currentType, setCurrentType] = useState(undefined);
    const labelId = `${id}-label`;

    // searchBlend, searchBlendType
    useEffect(() => {
        if (searchBlend) {
            setCurrentType(searchBlend[SPELL_PROPERTIES.TYPE])
        }
        else if (searchBlendType) {
            setCurrentType(searchBlendType)
        }
        else {
            setCurrentType(undefined);
        }
    }, [searchBlend, searchBlendType]);

    const handleNextClick = (e) => {
        if (currentType) {
            for (let i = 0; i < totalTypes; i++) {
                let blendType = blendTypes[i];
                
                if (blendType === currentType) {
                    if (i < totalTypes - 1) {
                        setCurrentType(blendTypes[i + 1])
                        dispatch(setSearchBlendType(blendTypes[i + 1]));
                        dispatch(setSearchBlend('fake'));
                    }
                    else {
                        setCurrentType(blendTypes[0])
                        dispatch(setSearchBlendType(blendTypes[0]));
                        dispatch(setSearchBlend('fake'));
                    }

                    break;
                }
            }
        }
        else {
            setCurrentType(blendTypes[0])
            dispatch(setSearchBlendType(blendTypes[0]));
            dispatch(setSearchBlend('fake'));
        }
    };

    const handlePreviousClick = (e) => {
        if (currentType) {
            for (let i = 0; i < totalTypes; i++) {
                let blendType = blendTypes[i];
                
                if (blendType === currentType) {
                    if (i > 0) {
                        setCurrentType(blendTypes[i - 1]);
                        dispatch(setSearchBlendType(blendTypes[i - 1]));
                        dispatch(setSearchBlend('fake'));
                    }
                    else {
                        setCurrentType(blendTypes[totalTypes - 1])
                        dispatch(setSearchBlendType(blendTypes[totalTypes - 1]));
                        dispatch(setSearchBlend('fake'));
                    }

                    break;
                }
            }
        }
        else {
            setCurrentType(blendTypes[totalTypes - 1])
            dispatch(setSearchBlendType(blendTypes[totalTypes - 1]));
            dispatch(setSearchBlend('fake'));
        }
    };

    const handleTypeChange = (e) => {
        let selectedType = e.target.value;

        setCurrentType(selectedType);

        dispatch(setSearchBlendType(selectedType));

        dispatch(setSearchBlend('fake'));
    };

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
            <Box
                style={{
                    display: 'flex',
                    flexWrap: 'nowrap'
                }}
            >
                <IconButton
                    onClick={handlePreviousClick}
                    style={{
                        borderRadius: '4px 0 0 4px'
                    }}
                >
                    <NavigateBeforeRoundedIcon />
                </IconButton>
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
                <IconButton
                    onClick={handleNextClick}
                    style={{
                        borderRadius: '0 4px 4px 0'
                    }}
                >
                    <NavigateNextRoundedIcon />
                </IconButton>
            </Box>
        </Box>
    );
};
