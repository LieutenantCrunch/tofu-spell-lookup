import React, { useCallback, useEffect, useMemo, useState } from 'react';
import debounce from 'lodash/debounce';
import throttle from 'lodash/throttle';

// Other Components
import { HSLSlider } from '../../StyledMui/HSLSlider';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { selectCurrentFrame } from '../../../redux/slices/currentSelections';
import { selectSearchTextColor, setSearchTextColorHue, setSearchTextColor } from '../../../redux/slices/searches/textColor';

// Utilities
import {
    frameDefaults,
} from '../../../utilities/utilities';

export const TextColorHueSlider = ({ id = 'text-color-hue-slider', sx = {} }) => {
    const dispatch = useDispatch();
    const currentFrame = useSelector(selectCurrentFrame);
    const searchTextColor = useSelector(selectSearchTextColor);

    const initialSearchValue = currentFrame.defaultHue ?? frameDefaults.defaultHue;

    const [searchValue, setSearchValue] = useState(initialSearchValue);

    // searchTextColor
    useEffect(() => {
        if (searchTextColor) {
            setSearchValue(searchTextColor.hue);
        }
    }, [searchTextColor]);

    // Throttle how often the search textColor hue is updated for better performance
    const dispatchSetSearchTextColorHue = (newSearchTextColorHue) => {
        dispatch(setSearchTextColorHue(newSearchTextColorHue));
    };

    const throttledSetSearchTextColorHue= useCallback(throttle(dispatchSetSearchTextColorHue, 10), []);

    /*
    Only want to update redux and search for matching text colors when they stop sliding the slider
    */
    const dispatchSetSearchTextColor = () => {
        dispatch(setSearchTextColor('fake'));
    };

    const debouncedSetSearchTextColor = useMemo(
        () => debounce(dispatchSetSearchTextColor, 500)
    , []);

    const handleSearchChange = (e, newValue) => {
        // Set the state value to newValue so the slider updates
        setSearchValue(newValue);

        // Set the search text color hue at a throttled rate
        throttledSetSearchTextColorHue(newValue);

        // Update the search criteria in the store, but only after half a second has passed since an update has fired
        debouncedSetSearchTextColor();
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
