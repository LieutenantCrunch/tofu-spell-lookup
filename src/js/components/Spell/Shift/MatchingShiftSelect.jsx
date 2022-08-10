import React from 'react';
import { isMobile } from 'react-device-detect';

// MUI
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Typography from '@mui/material/Typography';

// MUI Icons
import NavigateBeforeRoundedIcon from '@mui/icons-material/NavigateBeforeRounded';
import NavigateNextRoundedIcon from '@mui/icons-material/NavigateNextRounded';

// Other Components
import { SpellCode } from '../../Generic/SpellCode';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { 
    clearCurrentTempShift,
    selectSpecificShift,
    setCurrentTempShift,
    setSpecificShift
} from '../../../redux/slices/currentSelections';
import {
    selectNearbyShifts
} from '../../../redux/slices/spells/colorShift';

// Utilities
import { SPELL_PROPERTIES, SPELL_TYPES } from '../../../utilities/constants';

export const MatchingShiftSelect = ({ id = 'matching-shift-select', sx = {} }) => {
    const dispatch = useDispatch();

    const nearbyShifts = useSelector(selectNearbyShifts);
    const specificShift = useSelector(selectSpecificShift);

    const nearbyShiftCount = nearbyShifts.length;

    const labelText = `(${nearbyShiftCount}) Matching Spell${nearbyShiftCount !== 1 ? 's' : ''}`;
    const labelId = `${id}-label`;

    const value = (
        specificShift
        ? (
            specificShift[SPELL_PROPERTIES.SPELL_CODE] === 'fake' 
            ? '' 
            : (
                nearbyShifts.some(shift => shift[SPELL_PROPERTIES.SPELL_CODE] === specificShift[SPELL_PROPERTIES.SPELL_CODE])
                ? specificShift[SPELL_PROPERTIES.SPELL_CODE]
                : ''
            )
        )
        : ''
    );

    const handleNextClick = (e) => {
        if (nearbyShiftCount > 0) {
            if (specificShift && specificShift[SPELL_PROPERTIES.SPELL_CODE] !== 'fake') {
                const specificSpellCode = specificShift[SPELL_PROPERTIES.SPELL_CODE];

                for (let i = 0; i < nearbyShiftCount; i++) {
                    let spell = nearbyShifts[i];
                    
                    if (spell[SPELL_PROPERTIES.SPELL_CODE] === specificSpellCode) {
                        if (i < nearbyShiftCount - 1) {
                            dispatch(setSpecificShift(nearbyShifts[i + 1]));
                        }
                        else {
                            dispatch(setSpecificShift(nearbyShifts[0]));
                        }

                        break;
                    }
                }
            }
            else {
                dispatch(setSpecificShift(nearbyShifts[0]));
            }
        }
    };

    const handlePreviousClick = (e) => {
        if (nearbyShiftCount > 0) {
            if (specificShift && specificShift[SPELL_PROPERTIES.SPELL_CODE] !== 'fake') {
                const specificSpellCode = specificShift[SPELL_PROPERTIES.SPELL_CODE];

                for (let i = 0; i < nearbyShiftCount; i++) {
                    let spell = nearbyShifts[i];
                    
                    if (spell[SPELL_PROPERTIES.SPELL_CODE] === specificSpellCode) {
                        if (i > 0) {
                            dispatch(setSpecificShift(nearbyShifts[i - 1]));
                        }
                        else {
                            dispatch(setSpecificShift(nearbyShifts[nearbyShiftCount - 1]));
                        }

                        break;
                    }
                }
            }
            else {
                dispatch(setSpecificShift(nearbyShifts[nearbyShiftCount - 1]));
            }
        }
    };

    const handleShiftChange = (e) => {
        let selectedSpell = nearbyShifts.find(shift => shift[SPELL_PROPERTIES.SPELL_CODE] === e.target.value);

        if (!selectedSpell) {
            selectedSpell = {
                [SPELL_PROPERTIES.SPELL_CODE]: 'fake',
                [SPELL_PROPERTIES.TYPE]: SPELL_TYPES.HUE_SHIFT,
                [SPELL_PROPERTIES.VALUE]: 0
            }
        }

        dispatch(setSpecificShift(selectedSpell));
    };

    const handleShiftMouseEnter = (e) => {
        if (!isMobile) {
            if (e.currentTarget.dataset && e.currentTarget.dataset.spellCode) {
                let tempSpell = nearbyShifts.find(shift => shift[SPELL_PROPERTIES.SPELL_CODE] === e.currentTarget.dataset.spellCode);

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
                flexDirection: 'column'
            }}
            sx={sx}
        >
            <Typography
                gutterBottom
                variant="subtitle2"
            >
                2: Check for matching spells
            </Typography>
            <Box
                style={{
                    display: 'flex',
                    flexWrap: 'nowrap'
                }}
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
                    <InputLabel id={labelId}>{labelText}</InputLabel>
                    <Select
                        id={id}
                        label={labelText}
                        labelId={labelId}
                        onChange={handleShiftChange}
                        value={value}
                    >
                        {
                            nearbyShifts[0]
                            ? nearbyShifts.map(shift => {
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
        </Box>
    );
};
