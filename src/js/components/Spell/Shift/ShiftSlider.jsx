import React, { useCallback, useEffect, useMemo, useState } from 'react';
import debounce from 'lodash/debounce';
import throttle from 'lodash/throttle';

// MUI
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import Typography from '@mui/material/Typography';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { 
    selectContinuousShift,
    selectSpecificShift,
    setContinuousShift,
    setSpecificShift
} from '../../../redux/slices/currentSelections';
import {
    selectSearchBlend
} from '../../../redux/slices/searches/blend';

// Utilities
import { SPELL_PROPERTIES, SPELL_TYPES } from '../../../utilities/constants';

export const ShiftSlider = ({ sx = {} }) => {
    const dispatch = useDispatch();

    const continuousShift = useSelector(selectContinuousShift);
    const searchBlend = useSelector(selectSearchBlend);
    const specificShift = useSelector(selectSpecificShift);

    const [searchValue, setSearchValue] = useState(0);

    // continuousShift, specificShift
    useEffect(() => {
        if (!continuousShift && !specificShift) {
            setSearchValue(0);
        }
    }, [continuousShift, specificShift]);

    // searchBlend
    useEffect(() => {
        // If the searchBlend changes, reset the search value to 0
        if (searchBlend) {
            setSearchValue(0);
        }
    }, [searchBlend]);

    // specificShift
    useEffect(() => {
        // If the specificShift changes, update the searchValue to match
        if (specificShift) {
            setSearchValue(specificShift[SPELL_PROPERTIES.VALUE]);
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
        <Box
            style={{
                display: 'flex',
                flexDirection: 'column'
            }}
            sx={sx}
        >
            <Typography
                gutterBottom
                variant="subtitle2"
            >
                1: Adjust the frame's hue
            </Typography>
            <div
                style={{
                    alignItems: 'center',
                    display: 'flex',
                    flexGrow: 1,
                    padding: '0 1em'
                }}
            >
                <Slider
                    aria-label="hue-shift"
                    min={0}
                    max={360}
                    onChange={handleSearchChange}
                    value={searchValue}
                    valueLabelDisplay="auto"
                />
            </div>
        </Box>
    );
};
