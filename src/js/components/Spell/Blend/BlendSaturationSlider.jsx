import React, { useCallback, useEffect, useMemo, useState } from 'react';
import debounce from 'lodash/debounce';
import throttle from 'lodash/throttle';

// Other Components
import { HSLSlider } from '../../StyledMui/HSLSlider';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { selectSearchBlend, selectSearchBlendHue, setSearchBlend, setSearchBlendSaturation } from '../../../redux/slices/searches/blend';


export const BlendSaturationSlider = ({ id = 'blend-saturation-slider', sx = {} }) => {
    const dispatch = useDispatch();
    const searchBlend = useSelector(selectSearchBlend);
    const searchBlendHue = useSelector(selectSearchBlendHue);

    const [searchValue, setSearchValue] = useState(100);

    // searchBlend
    useEffect(() => {
        if (searchBlend) {
            setSearchValue(searchBlend.saturation);
        }
    }, [searchBlend]);

    // Throttle how often the search blend saturation is updated for better performance
    const dispatchSetSearchBlendSaturation = (newBlendSearchSaturation) => {
        dispatch(setSearchBlendSaturation(newBlendSearchSaturation));
    };

    const throttledSetSearchBlendSaturation= useCallback(throttle(dispatchSetSearchBlendSaturation, 10), []);

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
        throttledSetSearchBlendSaturation(newValue);

        // Update the search criteria in the store, but only after half a second has passed since an update has fired
        debouncedSetSearchBlend();
    };

    return (
        <HSLSlider
            aria-label={id}
            min={0}
            max={100}
            onChange={handleSearchChange}
            style={{
                backgroundImage: `linear-gradient(to right, hsl(${searchBlendHue}, 0%, 50%), hsl(${searchBlendHue}, 100%, 50%)`,
                borderRadius: '4px',
                padding: 0
            }}
            sx={sx}
            value={searchValue}
            valueLabelDisplay="auto"
        />
    );
};
