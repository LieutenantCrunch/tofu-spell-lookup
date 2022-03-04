import React, { useMemo, useState } from 'react';
import debounce from 'lodash/debounce';

// MUI
import TextField from '@mui/material/TextField';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import {
    selectCurrentName,
    setCurrentName
} from '../../../redux/slices/currentSelections';

export const NameTextField = ({ style = {} }) => {
    const dispatch = useDispatch();

    const currentName = useSelector(selectCurrentName);

    const [name, setName] = useState(currentName);

    const dispatchSetCurrentName = (newName) => {
        dispatch(setCurrentName(newName));
    };

    const debouncedSetCurrentName = useMemo(
        () => debounce(dispatchSetCurrentName, 500)
    , []);

    const handleChange = (e) => {
        let { value: newName } = e.target;

        setName(newName);

        debouncedSetCurrentName(newName);
    };

    return (
        <TextField
            label="Name"
            onChange={handleChange}
            style={style}
            value={name}
        />
    );
};
