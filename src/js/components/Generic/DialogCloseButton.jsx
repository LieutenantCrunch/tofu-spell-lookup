import React from 'react';

// MUI
import IconButton from '@mui/material/IconButton';

// MUI Icons
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';

export const DialogCloseButton = ({
    onClick,
}) => (
    <IconButton
        aria-label="close"
        onClick={onClick}
        style={{
            position: 'absolute',
            right: '.5rem',
            top: '.25rem',
        }}
    >
        <CloseRoundedIcon />
    </IconButton>
);
