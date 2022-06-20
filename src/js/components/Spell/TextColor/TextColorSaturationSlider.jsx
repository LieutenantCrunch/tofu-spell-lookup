import React, { useCallback, useEffect, useMemo, useState } from 'react';
import debounce from 'lodash/debounce';
import throttle from 'lodash/throttle';

// Other Components
import { HSLSlider } from '../../StyledMui/HSLSlider';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { selectCurrentFrame } from '../../../redux/slices/currentSelections';
import { selectSearchTextColor, selectSearchTextColorHue, setSearchTextColor, setSearchTextColorSaturation } from '../../../redux/slices/searches/textColor';


export const TextColorSaturationSlider = ({ id = 'text-color-saturation-slider', sx = {} }) => {
    const dispatch = useDispatch();
    const currentFrame = useSelector(selectCurrentFrame);
    const searchTextColor = useSelector(selectSearchTextColor);
    const searchTextColorHue = useSelector(selectSearchTextColorHue);

    const initialSearchValue = currentFrame.defaultSaturation;

    const [searchValue, setSearchValue] = useState(initialSearchValue);

    // searchTextColor
    useEffect(() => {
        if (searchTextColor) {
            setSearchValue(searchTextColor.saturation);
        }
    }, [searchTextColor]);

    // Throttle how often the search text color saturation is updated for better performance
    const dispatchSetSearchTextColorSaturation = (newTextColorSearchSaturation) => {
        dispatch(setSearchTextColorSaturation(newTextColorSearchSaturation));
    };

    const throttledSetSearchTextColorSaturation= useCallback(throttle(dispatchSetSearchTextColorSaturation, 10), []);

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
        throttledSetSearchTextColorSaturation(newValue);

        // Update the search criteria in the store, but only after half a second has passed since an update has fired
        debouncedSetSearchTextColor();
    };

    return (
        <HSLSlider
            aria-label={id}
            min={0}
            max={100}
            onChange={handleSearchChange}
            style={{
                backgroundImage: `linear-gradient(to right, hsl(${searchTextColorHue}, 0%, 50%), hsl(${searchTextColorHue}, 100%, 50%)`,
                borderRadius: '4px',
                padding: 0
            }}
            sx={sx}
            value={searchValue}
            valueLabelDisplay="auto"
        />
    );
};
