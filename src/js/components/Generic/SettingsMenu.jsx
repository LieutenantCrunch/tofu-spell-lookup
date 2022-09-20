import React, { forwardRef, useState } from 'react';

// MUI
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import Dialog from '@mui/material/Dialog';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import FormControlLabel from '@mui/material/FormControlLabel';
import IconButton from '@mui/material/IconButton';
import Link from '@mui/material/Link';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import Slide from '@mui/material/Slide';
import Switch from '@mui/material/Switch';
import Toolbar from '@mui/material/Toolbar';

// MUI Icons
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import ExpandLessRoundedIcon from '@mui/icons-material/ExpandLessRounded';
import ExpandMoreRoundedIcon from '@mui/icons-material/ExpandMoreRounded';

// Other Components
import { SettingsButton } from './SettingsButton';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import {
    selectHighlightNewSpells,
    selectHighlightStyle,
    selectShowUsedSpells,
    setHighlightNewSpells,
    setHighlightStyle,
    setShowUsedSpells
} from '../../redux/slices/currentSelections';

// Utilities
import { HIGHLIGHT_NEW_SPELLS_OPTIONS, HIGHLIGHT_STYLE_OPTIONS, STORAGE_SUPPORTED } from '../../utilities/constants';

const SubListItem = ({ children, style, ...props }) => {
    return <ListItem
        disablePadding
        style={{
            ...style,
            paddingLeft: '2em',
        }}
        {...props}
    >
        {children}
    </ListItem>;
};

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
    const highlightNewSpells = useSelector(selectHighlightNewSpells, () => HIGHLIGHT_NEW_SPELLS_OPTIONS.PAST_24_HOURS.key);
    const highlightStyle = useSelector(selectHighlightStyle, () => HIGHLIGHT_STYLE_OPTIONS.NEW_LABEL.key);
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

    // Highlight New Spells Handling
    const [highlightNewSpellsOpen, setHighlightNewSpellsOpen] = useState(false);
    const handleHighlightNewSpellsClick = (e) => {
        setHighlightNewSpellsOpen(prevState => !prevState);
    };

    const [highlightNewSpellsSetting, setHighlightNewSpellsSetting] = useState(highlightNewSpells);

    const handleHighlightNewSpellsSettingChange = (e, value) => {
        setHighlightNewSpellsSetting(prevState => {
            const newState = value || e.target.value;

            dispatch(setHighlightNewSpells(newState));

            return newState;
        });
    };

    // Highlight Style Handling
    const [highlightStyleOpen, setHighlightStyleOpen] = useState(false);
    const handleHighlightStyleClick = (e) => {
        setHighlightStyleOpen(prevState => !prevState);
    };

    const [highlightStyleSetting, setHighlightStyleSetting] = useState(highlightStyle);

    const handleHighlightStyleSettingChange = (e, value) => {
        setHighlightStyleSetting(prevState => {
            const newState = value || e.target.value;

            dispatch(setHighlightStyle(newState));

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
                            <>
                                <ListItem dense>
                                    <ListItemText
                                        primaryTypographyProps={{
                                            variant: 'caption'
                                        }}
                                    >
                                        The settings here utilize your browser's <Link href="https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage">localStorage</Link> to remember your selections. This is required for this functionality to work. If you do not want your localStorage to be used, do not use this feature.
                                    </ListItemText>
                                </ListItem>
                                <Divider />
                            </>
                        }
                        <ListItem>
                            <ListItemText>Show Used Spells</ListItemText>
                            <Switch
                                edge="end"
                                checked={showUsedSpellsSetting}
                                onChange={handleShowUsedSpellsChange}
                            />
                        </ListItem>
                        <Divider />
                        <ListItemButton component="li" onClick={handleHighlightNewSpellsClick}>
                            <ListItemText>Highlight New Spells</ListItemText>
                            {highlightNewSpellsOpen ? <ExpandLessRoundedIcon /> : <ExpandMoreRoundedIcon />}
                        </ListItemButton>
                        <Collapse component="li" in={highlightNewSpellsOpen}>
                            <RadioGroup
                                name="highlight-new-spells-radios"
                                value={highlightNewSpellsSetting}
                                onChange={handleHighlightNewSpellsSettingChange}
                            >
                                <List disablePadding>
                                    {
                                        Object.keys(HIGHLIGHT_NEW_SPELLS_OPTIONS).map(option => {
                                            const { key, title } = HIGHLIGHT_NEW_SPELLS_OPTIONS[option];
                                            
                                            return (
                                                <SubListItem
                                                    key={key}
                                                    secondaryAction={
                                                        <Radio value={key}/>
                                                    }
                                                >
                                                    <ListItemButton onClick={(e) => handleHighlightNewSpellsSettingChange(e, key)}>
                                                        <ListItemText>{title}</ListItemText>
                                                    </ListItemButton>
                                                </SubListItem>
                                            );
                                        })
                                    }
                                </List>
                            </RadioGroup>
                        </Collapse>
                        <Divider />
                        <ListItemButton component="li" onClick={handleHighlightStyleClick}>
                            <ListItemText>Highlight Style</ListItemText>
                            {highlightStyleOpen ? <ExpandLessRoundedIcon /> : <ExpandMoreRoundedIcon />}
                        </ListItemButton>
                        <Collapse component="li" in={highlightStyleOpen}>
                            <RadioGroup
                                name="highlight-style-radios"
                                value={highlightStyleSetting}
                                onChange={handleHighlightStyleSettingChange}
                            >
                                <List disablePadding>
                                    {
                                        Object.keys(HIGHLIGHT_STYLE_OPTIONS).map(option => {
                                            const { key, title } = HIGHLIGHT_STYLE_OPTIONS[option];
                                            
                                            return (
                                                <SubListItem
                                                    key={key}
                                                    secondaryAction={
                                                        <Radio value={key}/>
                                                    }
                                                >
                                                    <ListItemButton onClick={(e) => handleHighlightStyleSettingChange(e, key)}>
                                                        <ListItemText primaryTypographyProps={{ className: `new-spell-${key}`, style: { whiteSpace: 'no-wrap' } }}>
                                                            {title}
                                                        </ListItemText>
                                                    </ListItemButton>
                                                </SubListItem>
                                            );
                                        })
                                    }
                                </List>
                            </RadioGroup>
                        </Collapse>
                        <Divider />
                    </List>
                </Box>
            </WrapperComponent>
            <SettingsButton onClick={handleSettingsDrawerOpen} />
        </>
    );
};
