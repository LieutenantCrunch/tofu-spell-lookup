import React from 'react';

// MUI
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';

// MUI Icons
import HelpOutlineRoundedIcon from '@mui/icons-material/HelpOutlineRounded';

const HtmlTooltip = styled(({ className, leaveTouchDelay, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} leaveTouchDelay={3000} />
))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
        backgroundColor: '#f5f5f9',
        border: '1px solid #dadde9',
        color: 'rgba(0, 0, 0, 0.87)',
        maxWidth: 220
    },
}));

export const HelpIcon = ({ title, description }) => {
    return (
        <HtmlTooltip
            title={
                <>
                    <Typography color="inherit" variant="h6">{title}</Typography>
                    <Typography color="inherit">{description}</Typography>
                </>
            }
        >
            <HelpOutlineRoundedIcon />
        </HtmlTooltip>
    );
};
