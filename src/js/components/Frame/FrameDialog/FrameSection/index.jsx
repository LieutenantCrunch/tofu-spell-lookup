import React from 'react';

// MUI
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import Typography from '@mui/material/Typography';

// MUI Icons
import ExpandMoreRoundedIcon from '@mui/icons-material/ExpandMoreRounded';

export const FrameSection = ({
    letter,
    frames,
}) => {

    return (
        <Accordion
            defaultExpanded
            style={{
                backgroundColor: 'inherit',
                borderRadius: '4px',
                width: '100%'
            }}
        >
            <AccordionSummary
                expandIcon={<ExpandMoreRoundedIcon />}
            >
                <Typography variant='h6'>{letter}</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <ImageList
                    cols={3}
                >
                    {
                        frames.map(frame => (
                            <ImageListItem key={frame.name}>
                                <img
                                    alt={frame.name}
                                    loading='lazy'
                                    src={`i/${frame.image}.png`}
                                />
                                <ImageListItemBar
                                    title={frame.name}
                                />
                            </ImageListItem>
                        ))
                    }
                </ImageList>
            </AccordionDetails>
        </Accordion>
    );
};
