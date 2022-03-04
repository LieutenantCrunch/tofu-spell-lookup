import React from 'react';

// MUI
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import {
    selectAllColorShiftHues
} from '../../redux/slices/spells/colorShift';
import { 
    selectCurrentHue,
    setCurrentHue
} from '../../redux/slices/currentSelections';

export const FullHueSelect = ({ id = 'full-hue-select', rootStyle = {} }) => {
    const dispatch = useDispatch();

    const allHues = useSelector(selectAllColorShiftHues);
    const currentHue = useSelector(selectCurrentHue);

    const labelId = `${id}-label`;

    const value = currentHue ? currentHue.id : ''; 

    const handleHueChange = (e) => {
        let selectedSpell = allHues.find(hue => hue.id === e.target.value);

        dispatch(setCurrentHue(selectedSpell));
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
                    onChange={handleHueChange}
                    value={value}
                >
                    {
                        allHues[0]
                        ? allHues.map(hue => {
                            return (
                                <MenuItem
                                    key={hue.id}
                                    value={hue.id}
                                >
                                    <span
                                        style={{
                                            backgroundColor: `hsl(${hue.value},100%,50%)`,
                                            borderRadius: '50%',
                                            height: '1em',
                                            marginRight: '.5em',
                                            width: '1em'
                                        }}
                                    >
                                    </span>
                                    {hue.id}
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
