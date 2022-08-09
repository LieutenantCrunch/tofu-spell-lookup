import React from 'react';

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
import { selectAllFonts } from '../../../redux/slices/spells/font';
import { 
    selectCurrentFont,
    setCurrentFont
} from '../../../redux/slices/currentSelections';

// Utilities
import { SPELL_PROPERTIES, SPELL_FONTS } from '../../../utilities/constants';

export const FontSelect = ({ id = 'font-select', sx = {} }) => {
    const dispatch = useDispatch();

    const allFonts = useSelector(selectAllFonts);
    const currentFont = useSelector(selectCurrentFont);

    const labelId = `${id}-label`;

    const value = currentFont ? currentFont[SPELL_PROPERTIES.SPELL_CODE] : ''; 

    const handleFontChange = (e) => {
        let selectedSpell = allFonts.find(font => font[SPELL_PROPERTIES.SPELL_CODE] === e.target.value);

        dispatch(setCurrentFont(selectedSpell));
    };

    const handleNextClick = (e) => {
        if (currentFont && currentFont[SPELL_PROPERTIES.SPELL_CODE] !== 'fake') {
            const totalSpells = allFonts.length;
            const currentSpellCode = currentFont[SPELL_PROPERTIES.SPELL_CODE];

            for (let i = 0; i < totalSpells; i++) {
                let spell = allFonts[i];
                
                if (spell[SPELL_PROPERTIES.SPELL_CODE] === currentSpellCode) {
                    if (i < totalSpells - 1) {
                        dispatch(setCurrentFont(allFonts[i + 1]));
                    }
                    else {
                        dispatch(setCurrentFont(allFonts[0]));
                    }

                    break;
                }
            }
        }
        else {
            dispatch(setCurrentFont(allFonts[0]));
        }
    };

    const handlePreviousClick = (e) => {
        const totalSpells = allFonts.length;

        if (currentFont && currentFont[SPELL_PROPERTIES.SPELL_CODE] !== 'fake') {
            const currentSpellCode = currentFont[SPELL_PROPERTIES.SPELL_CODE];

            for (let i = 0; i < totalSpells; i++) {
                let spell = allFonts[i];
                
                if (spell[SPELL_PROPERTIES.SPELL_CODE] === currentSpellCode) {
                    if (i > 0) {
                        dispatch(setCurrentFont(allFonts[i - 1]));
                    }
                    else {
                        dispatch(setCurrentFont(allFonts[totalSpells - 1]));
                    }

                    break;
                }
            }
        }
        else {
            dispatch(setCurrentFont(allFonts[totalSpells - 1]));
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
                    onChange={handleFontChange}
                    value={value}
                >
                    {
                        allFonts[0]
                        ? allFonts.map(font => {
                            return (
                                <MenuItem
                                    key={font[SPELL_PROPERTIES.SPELL_CODE]}
                                    value={font[SPELL_PROPERTIES.SPELL_CODE]}
                                >
                                    <SpellCode spell={font} />
                                    <span
                                        style={{
                                            fontFamily: `'${font.fontFamily}'`,
                                            fontSize: '1.5em',
                                            marginLeft: '.5em'
                                        }}
                                    >
                                        {font.fontFamily}
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
