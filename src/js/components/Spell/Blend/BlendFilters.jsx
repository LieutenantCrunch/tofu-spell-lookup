import React, { useEffect, useState } from 'react';

// MUI
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { selectCurrentBlendFilters, setCurrentBlendFilters } from '../../../redux/slices/currentSelections';

// Utilities
import { SPELL_TYPES } from '../../../utilities/constants';

export const BlendFilters = ({ }) => {
    const dispatch = useDispatch();
    const currentBlendFilters = useSelector(selectCurrentBlendFilters);

    const [filters, setFilters] = useState({
        [SPELL_TYPES.COLOR]: true,
        [SPELL_TYPES.DARKEN]: true,
        [SPELL_TYPES.NORMAL]: true,
        [SPELL_TYPES.OVERLAY]: true,
        [SPELL_TYPES.SCREEN]: true,
        [SPELL_TYPES.SOFT_LIGHT]: true
    });

    // currentBlendFilters
    useEffect(() => {
        // Only update filters if the ones from Redux doesn't match
        if (JSON.stringify(filters) !== JSON.stringify(currentBlendFilters)) {
            setChecked(currentBlendFilters)
        }
    }, [currentBlendFilters]);

    const handleAllChange = (e) => {
        let { checked } = e.target;

        let newFilters = {
            [SPELL_TYPES.COLOR]: checked,
            [SPELL_TYPES.DARKEN]: checked,
            [SPELL_TYPES.NORMAL]: checked,
            [SPELL_TYPES.OVERLAY]: checked,
            [SPELL_TYPES.SCREEN]: checked,
            [SPELL_TYPES.SOFT_LIGHT]: checked
        }

        setFilters(newFilters);
        dispatch(setCurrentBlendFilters(newFilters));
    };

    const handleIndividualChange = (e) => {
        let { checked, dataset } = e.target;
        let { index } = dataset;
        let intValue = parseInt(index);

        let newFilters = {
            ...filters,
            [intValue]: checked
        };

        setFilters(newFilters);
        dispatch(setCurrentBlendFilters(newFilters));
    };

    const allChecked = filters[SPELL_TYPES.COLOR] && 
        filters[SPELL_TYPES.DARKEN] && 
        filters[SPELL_TYPES.NORMAL] && 
        filters[SPELL_TYPES.OVERLAY] && 
        filters[SPELL_TYPES.SCREEN] && 
        filters[SPELL_TYPES.SOFT_LIGHT];
    
    const allIndeterminate = Object.values(filters).reduce((prev, current, i, arr) => {
        // If we're at the first spot in the array, return the first value as a string, t for true, f for false
        let s = current ? 't' : 'f';

        // Since there is no initial value passed to reduce, it will use the first value in the array as the initial value and start at index 1
        if (typeof prev === 'boolean') {
            prev = prev ? 't' : 'f';
        }

        // If the current value does not match the previous value, then we have an indeterminate case.
        // Truncate the array and return 'i'
        if (s !== prev) {
            // If we're not at the end of the array
            if (i != arr.length - 1) {
                arr.splice(i + 1);
            }

            return 'i';
        }

        // Otherwise, we can keep returning whatever the current value is
        return s;
    }) === 'i';

    return (
        <div
            style={{
                display: 'flex'
            }}
        >
            <FormGroup>
                <FormControlLabel 
                    label="All"
                    control={
                        <Checkbox 
                            checked={allChecked}
                            indeterminate={allIndeterminate}
                            onChange={handleAllChange}
                        />
                    }
                />
                <div
                    style={{
                        border: '1px solid rgba(255,255,255,.23)',
                        marginLeft: '1em',
                        paddingLeft: '16px'
                    }}
                >
                    <FormControlLabel 
                        label="Color"
                        control={
                            <Checkbox 
                                checked={filters[SPELL_TYPES.COLOR]}
                                inputProps={{
                                    'data-index': `${SPELL_TYPES.COLOR}`
                                }}
                                onChange={handleIndividualChange}
                            />
                        }
                    />
                    <FormControlLabel 
                        label="Darken"
                        control={
                            <Checkbox 
                                checked={filters[SPELL_TYPES.DARKEN]}
                                inputProps={{
                                    'data-index': `${SPELL_TYPES.DARKEN}`
                                }}
                                onChange={handleIndividualChange}
                            />
                        }
                    />
                    <FormControlLabel 
                        label="Normal"
                        control={
                            <Checkbox 
                                checked={filters[SPELL_TYPES.NORMAL]}
                                inputProps={{
                                    'data-index': `${SPELL_TYPES.NORMAL}`
                                }}
                                onChange={handleIndividualChange}
                            />
                        }
                    />
                    <FormControlLabel 
                        label="Overlay"
                        control={
                            <Checkbox 
                                checked={filters[SPELL_TYPES.OVERLAY]}
                                inputProps={{
                                    'data-index': `${SPELL_TYPES.OVERLAY}`
                                }}
                                onChange={handleIndividualChange}
                            />
                        }
                    />
                    <FormControlLabel 
                        label="Screen"
                        control={
                            <Checkbox 
                                checked={filters[SPELL_TYPES.SCREEN]}
                                inputProps={{
                                    'data-index': `${SPELL_TYPES.SCREEN}`
                                }}
                                onChange={handleIndividualChange}
                            />
                        }
                    />
                    <FormControlLabel 
                        label="Soft Light"
                        control={
                            <Checkbox 
                                checked={filters[SPELL_TYPES.SOFT_LIGHT]}
                                inputProps={{
                                    'data-index': `${SPELL_TYPES.SOFT_LIGHT}`
                                }}
                                onChange={handleIndividualChange}
                            />
                        }
                    />
                </div>
            </FormGroup>
        </div>
    );
};
