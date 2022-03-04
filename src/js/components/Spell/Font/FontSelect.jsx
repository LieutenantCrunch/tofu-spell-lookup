import React from 'react';

// MUI
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { selectAllFonts } from '../../../redux/slices/spells/font';
import { 
    selectCurrentFont,
    setCurrentFont
} from '../../../redux/slices/currentSelections';

export const FontSelect = ({ id = 'font-select', rootStyle = {} }) => {
    const dispatch = useDispatch();

    const allFonts = useSelector(selectAllFonts);
    const currentFont = useSelector(selectCurrentFont);

    const labelId = `${id}-label`;

    const value = currentFont ? currentFont.id : ''; 

    const handleFontChange = (e) => {
        let selectedSpell = allFonts.find(font => font.id === e.target.value);

        dispatch(setCurrentFont(selectedSpell));
    };

    return (
        <div
            style={rootStyle}
        >
            <FormControl fullWidth>
                <InputLabel id={labelId}>All Spells</InputLabel>
                <Select
                    id={id}
                    label="All Spells"
                    labelId={labelId}
                    onChange={handleFontChange}
                    value={value}
                >
                    {
                        allFonts[0]
                        ? allFonts.map(font => {
                            return (
                                <MenuItem
                                    key={font.id}
                                    value={font.id}
                                >
                                    <span
                                        style={{
                                            marginRight: '.5em'
                                        }}
                                    >
                                        {font.id}:
                                    </span>
                                    <span
                                        style={{
                                            fontFamily: `'${font.name}'`,
                                            fontSize: '1.5em',
                                        }}
                                    >
                                        {font.name}
                                    </span>
                                </MenuItem>
                            );
                        })
                        : (
                            <MenuItem
                                key="None"
                                value="None"
                            >
                                None
                            </MenuItem>
                        )
                    }
                </Select>
            </FormControl>
        </div>
    );
};
