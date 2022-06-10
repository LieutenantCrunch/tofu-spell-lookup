import React from 'react';

// MUI
import Box from '@mui/material/Box';

// This is just a plain old box, but it's named differently for readability
export const PlaceholderBox = ({ sx = {} }) => {
    return (
        <Box
            sx={sx}
        >
        </Box>
    )
};
