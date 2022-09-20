import React from 'react';

// MUI
import Fab from '@mui/material/Fab';

// MUI Icons
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';

export const SettingsButton = ({ onClick }) => {
    return (
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
            onClick={onClick}
        >
            <SettingsRoundedIcon
                color="primary"
            />
        </Fab>
    );
};
