import React, { useEffect, useCallback, useMemo, useState } from 'react';
import debounce from 'lodash/debounce';
import throttle from 'lodash/throttle';

// MUI
import Slider from '@mui/material/Slider';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { 
    selectCurrentHue,
    selectContinuousRotate,
    selectNearbyRotates,
    selectSpecificRotate,
    setCurrentHue, 
    setContinuousRotate,
    setSpecificRotate
} from '../../redux/slices/currentSelections';
import {
    selectAllColorShiftHues,
    selectAllColorShiftRotates,
    selectHueById, 
    selectRotateById
} from '../../redux/slices/spells/colorShift';

// Other Components
import { AllRotateSelect } from './AllRotateSelect';
import { MatchingRotateSelect } from './MatchingRotateSelect';

export const ColorShiftSection = ({ }) => {
    const dispatch = useDispatch();

    const allHues = useSelector(selectAllColorShiftHues);
    const allRotates = useSelector(selectAllColorShiftRotates);

    const currentHue = useSelector(selectCurrentHue);
    const continuousRotate = useSelector(selectContinuousRotate);
    const specificRotate = useSelector(selectSpecificRotate);

    const selectedHue = useSelector(state => selectHueById(state, currentHue));
    //const selectedRotate = useSelector(state => selectRotateById(state, currentRotate));

    const nearbyRotates = useSelector(selectNearbyRotates);

    const [searchValue, setSearchValue] = useState(0);

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

    const throttledSetContinuousRotate = useCallback(throttle(dispatchSetContinuousRotate, 250), []);

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
        //throttledSetContinuousRotate(newValue);
        dispatchSetContinuousRotate(fakeSpell);

        // Set the fake spell as the specific rotate in the store, but only after half a second has passed since an update has fired
        debouncedSetSpecificRotate(fakeSpell);
    };

    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'space-between',
                width: '100%'
            }}
        >
            <Slider
                aria-label="hue-rotation"
                min={0}
                max={359}
                onChange={handleSearchChange}
                style={{
                    width: '30%'
                }}
                value={searchValue}
                valueLabelDisplay="auto"
            />
            <MatchingRotateSelect
                rootStyle={{
                    width: '30%'
                }}
            />
            <AllRotateSelect
                rootStyle={{
                    width: '30%'
                }}
            />
        </div>
    );
};
