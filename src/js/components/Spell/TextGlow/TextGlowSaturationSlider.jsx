import React, { useCallback, useEffect, useMemo, useState } from 'react';
import debounce from 'lodash/debounce';
import throttle from 'lodash/throttle';

// Other Components
import { HSLSlider } from '../../StyledMui/HSLSlider';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { selectCurrentFrame } from '../../../redux/slices/currentSelections';
import { selectSearchTextGlow, selectSearchTextGlowHue, setSearchTextGlow, setSearchTextGlowSaturation } from '../../../redux/slices/searches/textGlow';

// Utilities
import {
    frameDefaults,
} from '../../../utilities/utilities';

export const TextGlowSaturationSlider = ({ id = 'text-glow-saturation-slider', sx = {} }) => {
    const dispatch = useDispatch();
    const currentFrame = useSelector(selectCurrentFrame);
    const searchTextGlow = useSelector(selectSearchTextGlow);
    const searchTextGlowHue = useSelector(selectSearchTextGlowHue);

    const initialSearchValue = currentFrame.defaultSaturation ?? frameDefaults.defaultSaturation;
    const [searchValue, setSearchValue] = useState(initialSearchValue);

    // searchTextGlow
    useEffect(() => {
        if (searchTextGlow) {
            setSearchValue(searchTextGlow.saturation);
        }
    }, [searchTextGlow]);

    // Throttle how often the search text glow saturation is updated for better performance
    const dispatchSetSearchTextGlowSaturation = (newTextGlowSearchSaturation) => {
        dispatch(setSearchTextGlowSaturation(newTextGlowSearchSaturation));
    };

    const throttledSetSearchTextGlowSaturation= useCallback(throttle(dispatchSetSearchTextGlowSaturation, 10), []);

    /*
    Only want to update redux and search for matching text glows when they stop sliding the slider
    */
    const dispatchSetSearchTextGlow = () => {
        dispatch(setSearchTextGlow('fake'));
    };

    const debouncedSetSearchTextGlow = useMemo(
        () => debounce(dispatchSetSearchTextGlow, 500)
    , []);

    const handleSearchChange = (e, newValue) => {
        // Set the state value to newValue so the slider updates
        setSearchValue(newValue);

        // Set the search text glow hue at a throttled rate
        throttledSetSearchTextGlowSaturation(newValue);

        // Update the search criteria in the store, but only after half a second has passed since an update has fired
        debouncedSetSearchTextGlow();
    };

    return (
        <HSLSlider
            aria-label={id}
            min={0}
            max={100}
            onChange={handleSearchChange}
            style={{
                backgroundImage: `linear-gradient(to right, hsl(${searchTextGlowHue}, 0%, 50%), hsl(${searchTextGlowHue}, 100%, 50%)`,
                borderRadius: '4px',
                padding: 0
            }}
            sx={sx}
            value={searchValue}
            valueLabelDisplay="auto"
        />
    );
};
