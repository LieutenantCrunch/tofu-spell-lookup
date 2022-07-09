import React, { useEffect, useMemo, useState } from 'react';
import debounce from 'lodash/debounce';

// MUI
import TextField from '@mui/material/TextField';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { selectCurrentCardCode, setCurrentCardCode } from '../../redux/slices/currentSelections';

export const CardCodeTextField = ({ style = {}, sx = {} }) => {
    const dispatch = useDispatch();
    const currentCardCode = useSelector(selectCurrentCardCode);

    const [cardCode, setCardCode] = useState(currentCardCode || '');

    // currentCardCode
    useEffect(() => {
        // If the currentCardCode gets blanked out, clear the state
        if (!currentCardCode) {
            setCardCode('');
        }
    }, [currentCardCode]);

    const dispatchSetCurrentCardCode = (newCardCode) => {
        dispatch(setCurrentCardCode(newCardCode));
    };

    const debouncedSetCurrentCardCode = useMemo(
        () => debounce(dispatchSetCurrentCardCode, 500)
    , []);

    const handleChange = (e) => {
        let { value: newCardCode } = e.target;

        setCardCode(newCardCode);

        debouncedSetCurrentCardCode(newCardCode);
    };

    return (
        <TextField
            helperText="Will be appended to commands"
            label="Card Code"
            onChange={handleChange}
            size="small"
            style={style}
            sx={sx}
            value={cardCode}
        />
    );
};
