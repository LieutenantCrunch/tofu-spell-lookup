import React, { useState } from 'react';

// MUI
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';

// MUI Icons
import CropOriginalRoundedIcon from '@mui/icons-material/CropOriginalRounded';
import NavigateBeforeRoundedIcon from '@mui/icons-material/NavigateBeforeRounded';
import NavigateNextRoundedIcon from '@mui/icons-material/NavigateNextRounded';

// Other Components
import { FrameDialog } from './FrameDialog';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { selectCurrentFrame, setCurrentFrame } from '../../redux/slices/currentSelections';
import { selectAllFrames } from '../../redux/slices/frames';

export const FrameSelect = ({ id = 'frame-select', sx = {} }) => {
    const dispatch = useDispatch();
    const currentFrame = useSelector(selectCurrentFrame);
    const frames = useSelector(selectAllFrames);
    const totalFrames = frames.length;

    const [frameDialogOpen, setFrameDialogOpen] = useState(false);

    const handleCancelFrameSelect = () => {
        setFrameDialogOpen(false);
    };

    const handleFrameSelect = (selectedFrame) => {
        dispatch(setCurrentFrame(selectedFrame));
        setFrameDialogOpen(false);
    };

    const handleFrameSelectClick = () => {
        setFrameDialogOpen(true);
    };

    const handleNextClick = (e) => {
        const currentFrameIndex = frames.findIndex(frame => frame.name == currentFrame.name);
        const nextFrameIndex = (currentFrameIndex + 1) % totalFrames;

        dispatch(setCurrentFrame(frames[nextFrameIndex]));
    };

    const handlePreviousClick = (e) => {
        const currentFrameIndex = frames.findIndex(frame => frame.name == currentFrame.name);
        const previousFrameIndex = (currentFrameIndex === 0) ? (totalFrames - 1) : (currentFrameIndex - 1);

        dispatch(setCurrentFrame(frames[previousFrameIndex]));
    };

    return (
        <>
            <Box
                style={{
                    display: 'flex',
                    flexWrap: 'nowrap',
                    justifyContent: 'center',
                    width: '100%',
                }}
                sx={sx}
            >
                <IconButton
                    onClick={handlePreviousClick}
                    style={{
                        borderRadius: '.25rem',
                    }}
                >
                    <NavigateBeforeRoundedIcon />
                </IconButton>
                <Button
                    id={id}
                    onClick={handleFrameSelectClick}
                    startIcon={<CropOriginalRoundedIcon />}
                    style={{
                        lineClamp: 1,
                        textTransform: 'none',
                    }}
                    variant='outlined'
                >
                    {currentFrame.name} Frame
                </Button>
                <IconButton
                    onClick={handleNextClick}
                    style={{
                        borderRadius: '.25rem',
                    }}
                >
                    <NavigateNextRoundedIcon />
            </IconButton>
            </Box>
            <FrameDialog
                open={frameDialogOpen}
                onClose={handleCancelFrameSelect}
                onSelect={handleFrameSelect}
            />
        </>
    );
};
