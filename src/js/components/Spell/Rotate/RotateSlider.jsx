import React, { useCallback, useEffect, useMemo, useState } from 'react';
import debounce from 'lodash/debounce';
import throttle from 'lodash/throttle';

// MUI
import Slider from '@mui/material/Slider';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { 
    selectContinuousRotate,
    selectCurrentHue,
    selectSpecificRotate,
    setContinuousRotate,
    setSpecificRotate
} from '../../../redux/slices/currentSelections';

export const RotateSlider = ({ sx = {} }) => {
    const dispatch = useDispatch();

    const continuousRotate = useSelector(selectContinuousRotate);
    const currentHue = useSelector(selectCurrentHue);
    const specificRotate = useSelector(selectSpecificRotate);

    const [searchValue, setSearchValue] = useState(0);

    // continuousRotate, specificRotate
    useEffect(() => {
        if (!continuousRotate && !specificRotate) {
            setSearchValue(0);
        }
    }, [continuousRotate, specificRotate]);

    // currentHue
    useEffect(() => {
        if (currentHue) {
            setSearchValue(0);
        }
    }, [currentHue]);

    // specificRotate
    useEffect(() => {
        // If the specificRotate changes, update the searchValue to match
        if (specificRotate) {
            setSearchValue(specificRotate.value);
        }
    }, [specificRotate]);

    /*
    Want the hue to change as they slide the slider
    Don't want to be constantly calculating values in redux
    Only want to update redux when they stop sliding the slider
        or they select a value from the select
    */
    const dispatchSetContinuousRotate = (newContinuousRotate) => {
        dispatch(setContinuousRotate(newContinuousRotate));
    };

    const dispatchSetSpecificRotate = (newSpecificRotate) => {
        dispatch(setSpecificRotate(newSpecificRotate));
    };

    const debouncedSetSpecificRotate = useMemo(
        () => debounce(dispatchSetSpecificRotate, 500)
    , []);

    const throttledSetContinuousRotate = useCallback(throttle(dispatchSetContinuousRotate, 10), []);

    const handleSearchChange = (e, newValue) => {
        // newValue is an integer between 0 and 359
        // Use this value to create a fake spell to set on Redux
        let fakeSpell = {
            id: "fake",
            type: "rotate",
            value: newValue
        };

        // Set the state value to newValue so the slider updates
        setSearchValue(newValue);

        // Set the fake spell as the continuous rotate in the store
        throttledSetContinuousRotate(fakeSpell);
        //dispatchSetContinuousRotate(fakeSpell);

        // Set the fake spell as the specific rotate in the store, but only after half a second has passed since an update has fired
        debouncedSetSpecificRotate(fakeSpell);
    };

    return (
        <Slider
            aria-label="hue-rotation"
            min={0}
            max={359}
            onChange={handleSearchChange}
            sx={sx}
            value={searchValue}
            valueLabelDisplay="auto"
        />
    );
};
