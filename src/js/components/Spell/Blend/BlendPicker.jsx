import React, { useEffect, useMemo, useState } from 'react';
import debounce from 'lodash/debounce';

// MUI
//import Input from '@mui/material/Input';
import Slider from '@mui/material/Slider';
import { styled } from '@mui/material/styles';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { selectCurrentBlendSearchHue, setCurrentBlendSearchHue } from '../../../redux/slices/currentSelections';

// Utilities
import { SPELL_PROPERTIES, SPELL_TYPES } from '../../../utilities/constants';

const HueSlider = styled(Slider)({
    /* // This causes a new css class every time searchValue updates, so while it may look cool, it's terrible for performance
    '& .MuiSlider-valueLabel': {
        background: 'unset',
        backgroundColor: `hsl(${searchValue}, 100%, 50%)`,
        textShadow: '0 0 2px #000000'
    },*/
    '& .MuiSlider-rail': {
        backgroundImage: 'linear-gradient(to right, hsl(0, 100%, 50%), hsl(30, 100%, 50%), hsl(60, 100%, 50%), hsl(90, 100%, 50%), hsl(120, 100%, 50%), hsl(150, 100%, 50%), hsl(180, 100%, 50%), hsl(210, 100%, 50%), hsl(240, 100%, 50%), hsl(270, 100%, 50%), hsl(300, 100%, 50%), hsl(330, 100%, 50%), hsl(360, 100%, 50%))',
        opacity: 1
    },
    '& .MuiSlider-thumb': {
        background: 'unset',
        borderStyle: 'solid'
    },
    '& .MuiSlider-track': {
        background: 'unset',
        border: 'unset'
    }
});

export const BlendPicker = ({ id = 'blend-picker', sx = {} }) => {
    const dispatch = useDispatch();

    const [searchValue, setSearchValue] = useState(0);

    /*
    Only want to update redux and search for matching blends when they stop sliding the slider
    */
    const dispatchSetCurrentBlendSearchHue = (newBlendSearchHue) => {
        dispatch(setCurrentBlendSearchHue(newBlendSearchHue));
    };

    const debouncedSetCurrentBlendSearchHue = useMemo(
        () => debounce(dispatchSetCurrentBlendSearchHue, 500)
    , []);

    const handleSearchChange = (e, newValue) => {
        // Set the state value to newValue so the slider updates
        setSearchValue(newValue);

        // Set the search value in the store, but only after half a second has passed since an update has fired
        debouncedSetCurrentBlendSearchHue(newValue);
    };

    return (
        <HueSlider
            aria-label="blend-select"
            min={0}
            max={360}
            onChange={handleSearchChange}
            sx={sx}
            value={searchValue}
        />
    );

    /* // Color Input Approach:
    const [currentColor, setCurrentColor] = useState('#B5E61D');

    const handleColorInput = (e) => {
        setCurrentColor(e.target.value);
    };

    return (
        <Input
            disableUnderline
            id={id}
            inputProps={{
                style: {
                    margin: 0,
                    padding: 0
                }
            }}
            onInput={handleColorInput}
            sx={{
                ...sx,
                border: '1px solid rgba(255,255,255,.23)',
                borderRadius: '4px',
                padding: '.5em'
            }}
            type="color"
            value={currentColor}
        />
    );*/
};