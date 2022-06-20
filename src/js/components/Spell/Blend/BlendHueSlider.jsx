import React, { useCallback, useEffect, useMemo, useState } from 'react';
import debounce from 'lodash/debounce';
import throttle from 'lodash/throttle';

// Other Components
import { HSLSlider } from '../../StyledMui/HSLSlider';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { selectSearchBlend, setSearchBlendHue, setSearchBlend } from '../../../redux/slices/searches/blend';

export const BlendHueSlider = ({ id = 'blend-hue-slider', sx = {} }) => {
    const dispatch = useDispatch();
    const searchBlend = useSelector(selectSearchBlend);

    const [searchValue, setSearchValue] = useState(0);

    // searchBlend
    useEffect(() => {
        if (searchBlend) {
            setSearchValue(searchBlend.hue);
        }
    }, [searchBlend]);

    // Throttle how often the search blend hue is updated for better performance
    const dispatchSetSearchBlendHue = (newSearchBlendHue) => {
        dispatch(setSearchBlendHue(newSearchBlendHue));
    };

    const throttledSetSearchBlendHue= useCallback(throttle(dispatchSetSearchBlendHue, 10), []);

    /*
    Only want to update redux and search for matching blends when they stop sliding the slider
    */
    const dispatchSetSearchBlend = () => {
        dispatch(setSearchBlend('fake'));
    };

    const debouncedSetSearchBlend = useMemo(
        () => debounce(dispatchSetSearchBlend, 500)
    , []);

    const handleSearchChange = (e, newValue) => {
        // Set the state value to newValue so the slider updates
        setSearchValue(newValue);

        // Set the search blend hue at a throttled rate
        throttledSetSearchBlendHue(newValue);

        // Update the search criteria in the store, but only after half a second has passed since an update has fired
        debouncedSetSearchBlend();
    };

    return (
        <HSLSlider
            aria-label={id}
            min={0}
            max={360}
            onChange={handleSearchChange}
            style={{
                backgroundImage: 'linear-gradient(to right, hsl(0, 100%, 50%), hsl(30, 100%, 50%), hsl(60, 100%, 50%), hsl(90, 100%, 50%), hsl(120, 100%, 50%), hsl(150, 100%, 50%), hsl(180, 100%, 50%), hsl(210, 100%, 50%), hsl(240, 100%, 50%), hsl(270, 100%, 50%), hsl(300, 100%, 50%), hsl(330, 100%, 50%), hsl(360, 100%, 50%))',
                borderRadius: '4px',
                padding: 0
            }}
            sx={sx}
            value={searchValue}
            valueLabelDisplay="auto"
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
