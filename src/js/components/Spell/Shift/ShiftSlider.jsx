import React, { useCallback, useEffect, useMemo, useState } from 'react';
import debounce from 'lodash/debounce';
import throttle from 'lodash/throttle';

// MUI
import Slider from '@mui/material/Slider';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { 
    selectContinuousShift,
    selectCurrentBlend,
    selectSpecificShift,
    setContinuousShift,
    setSpecificShift
} from '../../../redux/slices/currentSelections';

// Utilities
import { SPELL_PROPERTIES, SPELL_TYPES } from '../../../utilities/constants';

export const ShiftSlider = ({ sx = {} }) => {
    const dispatch = useDispatch();

    const continuousShift = useSelector(selectContinuousShift);
    const currentBlend = useSelector(selectCurrentBlend);
    const specificShift = useSelector(selectSpecificShift);

    const [searchValue, setSearchValue] = useState(0);

    // continuousShift, specificShift
    useEffect(() => {
        if (!continuousShift && !specificShift) {
            setSearchValue(0);
        }
    }, [continuousShift, specificShift]);

    // currentBlend
    useEffect(() => {
        // If the currentBlend changes, reset the search value to 0
        if (currentBlend) {
            setSearchValue(0);
        }
    }, [currentBlend]);

    // specificShift
    useEffect(() => {
        // If the specificShift changes, update the searchValue to match
        if (specificShift) {
            setSearchValue(specificShift.value);
        }
    }, [specificShift]);

    /*
    Want the hue to change as they slide the slider
    Don't want to be constantly calculating values in redux
    Only want to update redux when they stop sliding the slider
        or they select a value from the select
    */
    const dispatchSetContinuousShift = (newContinuousShift) => {
        dispatch(setContinuousShift(newContinuousShift));
    };

    const dispatchSetSpecificShift = (newSpecificShift) => {
        dispatch(setSpecificShift(newSpecificShift));
    };

    const debouncedSetSpecificShift = useMemo(
        () => debounce(dispatchSetSpecificShift, 500)
    , []);

    const throttledSetContinuousShift = useCallback(throttle(dispatchSetContinuousShift, 10), []);

    const handleSearchChange = (e, newValue) => {
        // newValue is an integer between 0 and 360
        // Use this value to create a fake spell to set on Redux
        let fakeSpell = {
            [SPELL_PROPERTIES.SPELL_CODE]: "fake",
            [SPELL_PROPERTIES.TYPE]: SPELL_TYPES.HUE_SHIFT,
            [SPELL_PROPERTIES.VALUE]: newValue
        };

        // Set the state value to newValue so the slider updates
        setSearchValue(newValue);

        // Set the fake spell as the continuous shift in the store
        throttledSetContinuousShift(fakeSpell);
        //dispatchSetContinuousShift(fakeSpell);

        // Set the fake spell as the specific shift in the store, but only after half a second has passed since an update has fired
        debouncedSetSpecificShift(fakeSpell);
    };

    return (
        <Slider
            aria-label="hue-shift"
            min={0}
            max={360}
            onChange={handleSearchChange}
            sx={sx}
            value={searchValue}
            valueLabelDisplay="auto"
        />
    );
};
