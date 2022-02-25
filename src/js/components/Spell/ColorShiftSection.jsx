import React, { useEffect, useCallback, useState } from 'react';
import throttle from 'lodash/throttle';

// MUI
import Slider from '@mui/material/Slider';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { 
    selectCurrentHue,
    selectCurrentRotate,
    setCurrentHue, 
    setCurrentRotate 
} from '../../redux/slices/currentSelections';
import { selectHueById, selectRotateById } from '../../redux/slices/spells/colorShift';

export const ColorShiftSection = ({ }) => {
    const dispatch = useDispatch();

    const currentHue = useSelector(selectCurrentHue);
    const currentRotate = useSelector(selectCurrentRotate);
    const hue = useSelector(state => selectHueById(state, currentHue));
    const rotate = useSelector(state => selectRotateById(state, currentRotate));

    const [searchRotate, setSearchRotate] = useState(0);

    useEffect(() => {
        if (rotate) {
            setSearchRotate(rotate.value);
        }
    }, [rotate]);

    const dispatchSetCurrentRotate = (newValue) => {
        dispatch(setCurrentRotate(newValue));
    }
    const throttledSetCurrentRotate = useCallback(throttle(dispatchSetCurrentRotate, 250), []);

    const handleSearchChange = (e, newValue) => {
        setSearchRotate(newValue);
        throttledSetCurrentRotate(newValue);
    };

    return (
        <div
            style={{
                width: '100%'
            }}
        >
            {
                // Needs the slider for "searching"
                // Needs a select for hues
                // Needs a select for rotates
                // How do I flip between hue and rotate?
            }
            <div
                style={{
                    width: '33%'
                }}
            >
                <Slider
                    aria-label="hue-rotation"
                    min={0}
                    max={359}
                    onChange={handleSearchChange}
                    value={searchRotate}
                />
            </div>
        </div>
    );
};
