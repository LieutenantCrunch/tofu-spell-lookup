import React, { useCallback, useEffect, useMemo, useState } from 'react';
import debounce from 'lodash/debounce';
import throttle from 'lodash/throttle';

// Other Components
import { HSLSlider } from '../../StyledMui/HSLSlider';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { selectCurrentFrame } from '../../../redux/slices/currentSelections';
import {
    selectSearchTextGlow,
    selectSearchTextGlowHue,
    setSearchTextGlow,
    setSearchTextGlowLightness
} from '../../../redux/slices/searches/textGlow';

// Utilities
import {
    FRAME_DEFAULTS,
} from '../../../utilities/constants';

export const TextGlowLightnessSlider = ({ id = 'text-glow-lightness-slider', sx = {} }) => {
    const dispatch = useDispatch();
    const currentFrame = useSelector(selectCurrentFrame);
    const searchTextGlow = useSelector(selectSearchTextGlow);
    const searchTextGlowHue = useSelector(selectSearchTextGlowHue);

    const initialSearchValue = currentFrame.defaultLightness ?? FRAME_DEFAULTS.defaultLightness;

    const [searchValue, setSearchValue] = useState(initialSearchValue);

    // searchTextGlow
    useEffect(() => {
        if (searchTextGlow) {
            setSearchValue(searchTextGlow.lightness);
        }
    }, [searchTextGlow]);

    // Throttle how often the search text glow lightness is updated for better performance
    const dispatchSetSearchTextGlowLightness = (newTextGlowSearchLightness) => {
        dispatch(setSearchTextGlowLightness(newTextGlowSearchLightness));
    };

    const throttledSetSearchTextGlowLightness= useCallback(throttle(dispatchSetSearchTextGlowLightness, 10), []);

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
        throttledSetSearchTextGlowLightness(newValue);

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
                backgroundImage: `linear-gradient(to right, hsl(${searchTextGlowHue}, 100%, 0%), hsl(${searchTextGlowHue}, 100%, 50%), hsl(${searchTextGlowHue}, 100%, 100%)`,
                borderRadius: '4px',
                padding: 0
            }}
            sx={sx}
            value={searchValue}
            valueLabelDisplay="auto"
        />
    );
};
