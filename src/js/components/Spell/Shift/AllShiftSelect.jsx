import React from 'react';
import { isMobile } from 'react-device-detect';

// MUI
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

// MUI Icons
import NavigateBeforeRoundedIcon from '@mui/icons-material/NavigateBeforeRounded';
import NavigateNextRoundedIcon from '@mui/icons-material/NavigateNextRounded';

// Other Components
import { SpellCode } from '../../Generic/SpellCode';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import {
    selectAllColorShiftShifts
} from '../../../redux/slices/spells/colorShift';
import {
    clearCurrentTempShift,
    selectSpecificShift,
    setCurrentTempShift,
    setSpecificShift
} from '../../../redux/slices/currentSelections';

// Utilities
import { SPELL_PROPERTIES, SPELL_TYPES } from '../../../utilities/constants';

export const AllShiftSelect = ({ id = 'all-shift-select', sx = {} }) => {
    const dispatch = useDispatch();

    const allShifts = useSelector(selectAllColorShiftShifts);
    const specificShift = useSelector(selectSpecificShift);

    const labelId = `${id}-label`;

    const value = (
        specificShift
        ? (
            specificShift[SPELL_PROPERTIES.SPELL_CODE] === 'fake' ? '' : specificShift[SPELL_PROPERTIES.SPELL_CODE]
        )
        : ''
    );

    const handleNextClick = (e) => {
        if (specificShift && specificShift[SPELL_PROPERTIES.SPELL_CODE] !== 'fake') {
            const totalSpells = allShifts.length;
            const specificSpellCode = specificShift[SPELL_PROPERTIES.SPELL_CODE];

            for (let i = 0; i < totalSpells; i++) {
                let spell = allShifts[i];
                
                if (spell[SPELL_PROPERTIES.SPELL_CODE] === specificSpellCode) {
                    if (i < totalSpells - 1) {
                        dispatch(setSpecificShift(allShifts[i + 1]));
                    }
                    else {
                        dispatch(setSpecificShift(allShifts[0]));
                    }

                    break;
                }
            }
        }
        else {
            dispatch(setSpecificShift(allShifts[0]));
        }
    };

    const handlePreviousClick = (e) => {
        const totalSpells = allShifts.length;

        if (specificShift && specificShift[SPELL_PROPERTIES.SPELL_CODE] !== 'fake') {
            const specificSpellCode = specificShift[SPELL_PROPERTIES.SPELL_CODE];

            for (let i = 0; i < totalSpells; i++) {
                let spell = allShifts[i];
                
                if (spell[SPELL_PROPERTIES.SPELL_CODE] === specificSpellCode) {
                    if (i > 0) {
                        dispatch(setSpecificShift(allShifts[i - 1]));
                    }
                    else {
                        dispatch(setSpecificShift(allShifts[totalSpells - 1]));
                    }

                    break;
                }
            }
        }
        else {
            dispatch(setSpecificShift(allShifts[totalSpells - 1]));
        }
    };

    const handleShiftChange = (e) => {
        let selectedSpell = allShifts.find(shift => shift[SPELL_PROPERTIES.SPELL_CODE] === e.target.value);

        if (!selectedSpell) {
            selectedSpell = {
                [SPELL_PROPERTIES.SPELL_CODE]: 'fake',
                [SPELL_PROPERTIES.TYPE]: SPELL_TYPES.HUE_SHIFT,
                [SPELL_PROPERTIES.VALUE]: 0
            }
        }

        dispatch(setSpecificShift(selectedSpell))
    };

    const handleShiftMouseEnter = (e) => {
        if (!isMobile) {
            if (e.currentTarget.dataset && e.currentTarget.dataset.spellCode) {
                let tempSpell = allShifts.find(shift => shift[SPELL_PROPERTIES.SPELL_CODE] === e.currentTarget.dataset.spellCode);

                dispatch(setCurrentTempShift(tempSpell));
            }
        }
    };

    const handleShiftMouseLeave = (e) => {
        if (!isMobile) {
            if (e.currentTarget.dataset && e.currentTarget.dataset.spellCode) {
                dispatch(clearCurrentTempShift(e.currentTarget.dataset.spellCode));
            }
        }
    };

    return (
        <Box
            style={{
                display: 'flex',
                flexWrap: 'nowrap'
            }}
            sx={sx}
        >
            <IconButton
                onClick={handlePreviousClick}
                style={{
                    borderRadius: '4px 0 0 4px'
                }}
            >
                <NavigateBeforeRoundedIcon />
            </IconButton>
            <FormControl fullWidth>
                <InputLabel id={labelId}>All Spells</InputLabel>
                <Select
                    id={id}
                    label="All Spells"
                    labelId={labelId}
                    onChange={handleShiftChange}
                    value={value}
                >
                    {
                        allShifts[0]
                        ? allShifts.map(shift => {
                            const spellCode = shift[SPELL_PROPERTIES.SPELL_CODE];

                            return (
                                <MenuItem
                                    data-spell-code={spellCode}
                                    key={spellCode}
                                    onMouseEnter={handleShiftMouseEnter}
                                    onMouseLeave={handleShiftMouseLeave}
                                    value={spellCode}
                                >
                                    <SpellCode spell={shift} />
                                    <small
                                        style={{
                                            marginLeft: '.5em'
                                        }}
                                    >
                                        {`(${shift[SPELL_PROPERTIES.VALUE]})`}
                                    </small>
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
            <IconButton
                onClick={handleNextClick}
                style={{
                    borderRadius: '0 4px 4px 0'
                }}
            >
                <NavigateNextRoundedIcon />
            </IconButton>
        </Box>
    );
};
