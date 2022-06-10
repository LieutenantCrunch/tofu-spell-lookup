import React, { useCallback, useEffect, useMemo, useState } from 'react';
import debounce from 'lodash/debounce';
import throttle from 'lodash/throttle';

// Other Components
import { HSLSlider } from '../../StyledMui/HSLSlider';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { selectCurrentBlend } from '../../../redux/slices/currentSelections';
import { selectSearchBlendHue, setSearchBlendLightness, updateSearchBlendCriteria } from '../../../redux/slices/searches/blend';

export const BlendLightnessSlider = ({ id = 'blend-lightness-slider', sx = {} }) => {
    const dispatch = useDispatch();
    const currentBlend = useSelector(selectCurrentBlend);
    const searchBlendHue = useSelector(selectSearchBlendHue);

    const [searchValue, setSearchValue] = useState(50);

    useEffect(() => {
        if (currentBlend) {
            setSearchValue(currentBlend.lightness);
        }
    }, [currentBlend]);

    // Throttle how often the search blend lightness is updated for better performance
    const dispatchSetSearchBlendLightness = (newBlendSearchLightness) => {
        dispatch(setSearchBlendLightness(newBlendSearchLightness));
    };

    const throttledSetSearchBlendLightness= useCallback(throttle(dispatchSetSearchBlendLightness, 10), []);

    /*
    Only want to update redux and search for matching blends when they stop sliding the slider
    */
    const dispatchUpdateSearchBlendCriteria = () => {
        dispatch(updateSearchBlendCriteria());
    };

    const debouncedUpdateSearchBlendCriteria = useMemo(
        () => debounce(dispatchUpdateSearchBlendCriteria, 500)
    , []);

    const handleSearchChange = (e, newValue) => {
        // Set the state value to newValue so the slider updates
        setSearchValue(newValue);

        // Set the search blend hue at a throttled rate
        throttledSetSearchBlendLightness(newValue);

        // Update the search criteria in the store, but only after half a second has passed since an update has fired
        debouncedUpdateSearchBlendCriteria();
    };

    return (
        <HSLSlider
            aria-label="blend-lightness-select"
            min={0}
            max={100}
            onChange={handleSearchChange}
            style={{
                backgroundImage: `linear-gradient(to right, hsl(${searchBlendHue}, 100%, 0%), hsl(${searchBlendHue}, 100%, 50%), hsl(${searchBlendHue}, 100%, 100%)`,
                borderRadius: '4px',
                padding: 0
            }}
            sx={sx}
            value={searchValue}
            valueLabelDisplay="auto"
        />
    );
};