import React, { useRef, useState } from 'react';

// MUI
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Fab from '@mui/material/Fab';
import Grow from '@mui/material/Grow';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';

// MUI Icons
import CheckBoxOutlineBlankRoundedIcon from '@mui/icons-material/CheckBoxOutlineBlankRounded';
import CheckBoxRoundedIcon from '@mui/icons-material/CheckBoxRounded';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { selectShowUsedSpells, setShowUsedSpells } from '../../redux/slices/currentSelections';

export const SettingsButton = ({ }) => {
    const dispatch = useDispatch();
    const showUsedSpells = useSelector(selectShowUsedSpells, () => true);

    const [open, setOpen] = useState(false);
    const buttonRef = useRef(null);

    const handleClick = (e) => {
        setOpen(prevOpen => !prevOpen);
    };

    const handleClose = (e) => {
        if (buttonRef.current && buttonRef.current.contains(e.target)) {
            return;
        }

        setOpen(false);
    };

    const [showUsedSpellsSetting, setShowUsedSpellsSetting] = useState(showUsedSpells);
    const handleShowUsedSpellsClick = (e) => {
        setShowUsedSpellsSetting(prevState => {
            const newState = !prevState;

            dispatch(setShowUsedSpells(newState));

            return newState;
        })
    };

    return (
        <>
            <Fab
                aria-label="settings"
                size="small"
                style={{
                    boxShadow: '3px 3px 2px rgba(0,0,0,.75)',
                    border: '1px solid rgba(255,255,255,.23)',
                    position: 'fixed',
                    bottom: '16px',
                    right: '16px'
                }}
                sx={{
                    bgcolor: 'background.default'
                }}
                onClick={handleClick}
                ref={buttonRef} 
            >
                <SettingsRoundedIcon
                    color="primary"
                />
            </Fab>
            <Popper
                open={open}
                anchorEl={buttonRef.current}
                modifiers={[
                    {
                        name: 'offset',
                        options: {
                            offset: [0, 5],
                        },
                    },
                ]}
                role={undefined}
                placement="auto"
                transition
                disablePortal
            >
                {({ TransitionProps }) => (
                    <Grow
                        {...TransitionProps}
                    >
                        <Paper>
                            <ClickAwayListener onClickAway={handleClose}>
                                <MenuList dense>
                                    <MenuItem
                                        divider
                                        onClick={handleShowUsedSpellsClick}
                                    >
                                        <ListItemIcon>
                                            { showUsedSpellsSetting ? <CheckBoxRoundedIcon /> : <CheckBoxOutlineBlankRoundedIcon /> }
                                        </ListItemIcon>
                                        Show Used Spells
                                    </MenuItem>
                                    <MenuItem
                                        disableRipple
                                        disableTouchRipple
                                        style={{
                                            cursor: 'default',
                                            maxWidth: '250px',
                                            whiteSpace: 'normal'
                                        }}
                                    >
                                        <ListItemText
                                            disableTypography
                                            style={{ fontSize: '.75em' }}
                                        >
                                            This uses your localStorage to store settings, if you have a problem with that, don't use this.
                                        </ListItemText>
                                    </MenuItem>
                                </MenuList>
                            </ClickAwayListener>
                        </Paper>
                    </Grow>
                )}
            </Popper>
        </>
    );
};
