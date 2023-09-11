import React, { useCallback, useEffect, useMemo, useState } from 'react';
import debounce from 'lodash/debounce';
import throttle from 'lodash/throttle';

// Other Components
import { HSLSlider } from '../../StyledMui/HSLSlider';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { selectCurrentFrame } from '../../../redux/slices/currentSelections';
import { selectSearchTextGlow, setSearchTextGlowHue, setSearchTextGlow } from '../../../redux/slices/searches/textGlow';

// Utilities
import {
    FRAME_DEFAULTS,
} from '../../../utilities/constants';

export const TextGlowHueSlider = ({ id = 'text-glow-hue-slider', sx = {} }) => {
    const dispatch = useDispatch();
    const currentFrame = useSelector(selectCurrentFrame);
    const searchTextGlow = useSelector(selectSearchTextGlow);

    const initialSearchValue = currentFrame.defaultHue ?? FRAME_DEFAULTS.defaultHue;

    const [searchValue, setSearchValue] = useState(initialSearchValue);

    // searchTextGlow
    useEffect(() => {
        if (searchTextGlow) {
            setSearchValue(searchTextGlow.hue);
        }
    }, [searchTextGlow]);

    // Throttle how often the search textGlow hue is updated for better performance
    const dispatchSetSearchTextGlowHue = (newSearchTextGlowHue) => {
        dispatch(setSearchTextGlowHue(newSearchTextGlowHue));
    };

    const throttledSetSearchTextGlowHue= useCallback(throttle(dispatchSetSearchTextGlowHue, 10), []);

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
        throttledSetSearchTextGlowHue(newValue);

        // Update the search criteria in the store, but only after half a second has passed since an update has fired
        debouncedSetSearchTextGlow();
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
};
