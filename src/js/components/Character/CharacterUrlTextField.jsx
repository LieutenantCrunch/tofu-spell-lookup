import React, { useMemo, useState } from 'react';
import debounce from 'lodash/debounce';

// MUI
import TextField from '@mui/material/TextField';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { selectCurrentCharacterImage, setCurrentCharacterImage } from '../../redux/slices/currentSelections';

export const CharacterUrlTextField = ({ sx = {} }) => {
    const dispatch = useDispatch();
    const currentCharacterImage = useSelector(selectCurrentCharacterImage);

    const [characterImage, setCharacterImage] = useState(currentCharacterImage || '');

    const dispatchSetCurrentCharacterImage = (newCharacterImage) => {
        dispatch(setCurrentCharacterImage(newCharacterImage));
    };

    const debouncedSetCurrentCharacterImage = useMemo(
        () => debounce(dispatchSetCurrentCharacterImage, 500)
    , []);

    const handleChange = (e) => {
        let { value: newCharacterImage } = e.target;

        setCharacterImage(newCharacterImage);

        debouncedSetCurrentCharacterImage(newCharacterImage);
    };

    return (
        <TextField
            label="Image Address (URL)"
            onChange={handleChange}
            sx={sx}
            value={characterImage}
        />
    );
};
