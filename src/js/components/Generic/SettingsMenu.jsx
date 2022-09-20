import React, { forwardRef, useState } from 'react';

// MUI
import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import Link from '@mui/material/Link';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Slide from '@mui/material/Slide';
import Switch from '@mui/material/Switch';
import Toolbar from '@mui/material/Toolbar';

// MUI Icons
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';

// Other Components
import { SettingsButton } from './SettingsButton';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { selectShowUsedSpells, setShowUsedSpells } from '../../redux/slices/currentSelections';

// Utilities
import { STORAGE_SUPPORTED } from '../../utilities/constants';

const Transition = forwardRef((props, ref) => {
    return <Slide direction="left" ref={ref} {...props} />;
});

const WrapperComponent = ({ children, open, onClose }) => {
    return (
        <>
            <Dialog
                fullScreen
                open={open}
                onClose={onClose}
                style={{
                    zIndex: 5100, /* To display over the frame preview */
                }}
                sx={(theme) => ({
                    [theme.breakpoints.up('sm')]: {
                        display: 'none',
                    }
                })}
                TransitionComponent={Transition}
            >
                {children}
            </Dialog>
            <Drawer
                anchor="right"
                open={open}
                onClose={onClose}
                style={{
                    zIndex: 5100, /* To display over the frame preview */
                }}
                sx={(theme) => ({
                    [theme.breakpoints.down('sm')]: {
                        display: 'none',
                    }
                })}
            >
                {children}
            </Drawer>
        </>
    );
};

export const SettingsMenu = ({ }) => {
    // Redux
    const dispatch = useDispatch();
    const showUsedSpells = useSelector(selectShowUsedSpells, () => true);

    // Show Used Spells Handling
    const [showUsedSpellsSetting, setShowUsedSpellsSetting] = useState(showUsedSpells);
    const handleShowUsedSpellsChange = (e) => {
        setShowUsedSpellsSetting(prevState => {
            const newState = !!e.target?.checked;

            dispatch(setShowUsedSpells(newState));

            return newState;
        });
    };

    // Settings Button Handling
    const [settingsOpen, setSettingsOpen] = useState(false);

    const handleSettingsDrawerOpen = () => {
        setSettingsOpen(true);
    };

    const handleSettingsDrawerClose = () => {
        setSettingsOpen(false);
    };

    return (
        <>
            <WrapperComponent open={settingsOpen} onClose={handleSettingsDrawerClose}>
                <Toolbar disableGutters>
                    <IconButton onClick={handleSettingsDrawerClose}>
                        <ChevronRightRoundedIcon />
                    </IconButton>
                </Toolbar>
                <Divider />
                <Box
                    sx={(theme) => ({
                        [theme.breakpoints.up('sm')]: {
                            width: '250px',
                        }
                    })}
                >
                    <List>
                        {
                            STORAGE_SUPPORTED && 
                            <ListItem dense>
                                <ListItemText
                                    primaryTypographyProps={{
                                        variant: 'caption'
                                    }}
                                >
                                    The settings here utilize your browser's <Link href="https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage">localStorage</Link> to remember your selections. This is required for this functionality to work. If you do not want your localStorage to be used, do not use this feature.
                                </ListItemText>
                            </ListItem>
                        }
                        <ListItem>
                            <ListItemText>Show Used Spells</ListItemText>
                            <Switch
                                edge="end"
                                checked={showUsedSpellsSetting}
                                onChange={handleShowUsedSpellsChange}
                            />
                        </ListItem>
                    </List>
                </Box>
            </WrapperComponent>
            <SettingsButton onClick={handleSettingsDrawerOpen} />
        </>
    );
};
