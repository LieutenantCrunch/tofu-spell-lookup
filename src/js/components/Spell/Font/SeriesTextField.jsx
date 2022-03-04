import React, { useMemo, useState } from 'react';
import debounce from 'lodash/debounce';

// MUI
import TextField from '@mui/material/TextField';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import {
    selectCurrentSeries,
    setCurrentSeries
} from '../../../redux/slices/currentSelections';

export const SeriesTextField = ({ style = {} }) => {
    const dispatch = useDispatch();

    const currentSeries = useSelector(selectCurrentSeries);

    const [series, setSeries] = useState(currentSeries);

    const dispatchSetCurrentSeries = (newSeries) => {
        dispatch(setCurrentSeries(newSeries));
    };

    const debouncedSetCurrentSeries = useMemo(
        () => debounce(dispatchSetCurrentSeries, 500)
    , []);

    const handleChange = (e) => {
        let { value: newSeries } = e.target;

        setSeries(newSeries);

        debouncedSetCurrentSeries(newSeries);
    };

    return (
        <TextField
            label="Series"
            onChange={handleChange}
            style={style}
            value={series}
        />
    );
};
