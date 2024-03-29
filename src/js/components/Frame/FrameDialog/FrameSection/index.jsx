import React from 'react';

// MUI
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';

// MUI Icons
import ExpandMoreRoundedIcon from '@mui/icons-material/ExpandMoreRounded';


// Utilities
import {
    FRAME_SOURCE_EMOJIS,    
} from '../../../../utilities/constants';

export const FrameSection = ({
    letter,
    frames,
    onFrameClick,
}) => (
    <Accordion
        className='frame-dialog-section-accordion'
        defaultExpanded
        disableGutters
    >
        <AccordionSummary
            expandIcon={<ExpandMoreRoundedIcon />}
        >
            <Typography variant='h6'>{letter}</Typography>
        </AccordionSummary>
        <AccordionDetails>
            <Grid container spacing={1} columns={{ xs: 2, sm: 3, md: 4, lg: 5, xl: 6 }}>
                {
                    frames.map(frame => (
                        <Grid key={frame.name} xs={1}>
                            <List disablePadding>
                                <ImageListItem
                                    className='frame-dialog-item'
                                    onClick={() => onFrameClick(frame)}
                                >
                                    <img
                                        alt={frame.name}
                                        loading='lazy'
                                        src={`i/${frame.image}.png`}
                                    />
                                    <ImageListItemBar
                                        actionIcon={FRAME_SOURCE_EMOJIS[frame.source]}
                                        className='frame-title-emoji'
                                        title={frame.name}
                                    />
                                </ImageListItem>
                            </List>
                        </Grid>
                    ))
                }
            </Grid>
        </AccordionDetails>
    </Accordion>
);
