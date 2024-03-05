import React, { useState } from 'react';

// MUI
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Snackbar from '@mui/material/Snackbar';
import Tooltip from '@mui/material/Tooltip';

// MUI Icons
import ContentCopyRoundedIcon from '@mui/icons-material/ContentCopyRounded';
import CropOriginalRoundedIcon from '@mui/icons-material/CropOriginalRounded';
import NavigateBeforeRoundedIcon from '@mui/icons-material/NavigateBeforeRounded';
import NavigateNextRoundedIcon from '@mui/icons-material/NavigateNextRounded';

// Other Components
import { FrameDialog } from './FrameDialog';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { selectCurrentFrame, setCurrentFrame, selectCurrentCardCode } from '../../redux/slices/currentSelections';
import { selectAllFrames } from '../../redux/slices/frames';

export const FrameSelect = ({ id = 'frame-select', sx = {} }) => {
    const dispatch = useDispatch();
    const currentFrame = useSelector(selectCurrentFrame);
    const currentCardCode = useSelector(selectCurrentCardCode);
    const frames = useSelector(selectAllFrames);
    const totalFrames = frames.length;

    const [snackbarOpen, setSnackbarOpen] = useState(false);
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

    const handleCopyClick = async (e) => {
        if (currentFrame) {
            try {
                await navigator.clipboard.writeText(`t!fp ${currentFrame.name} frame ${currentCardCode}`);
                setSnackbarOpen(true);
            }
            catch (err) {
                console.error(`Error copying spell to clipboard:\n${err.message}`);
            }
        }
    };

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
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
                <Tooltip
                    arrow
                    placement="top"
                    title="Copy Frame Preview Command"
                >
                    <IconButton
                        onClick={handleCopyClick}
                    >
                        <ContentCopyRoundedIcon />
                    </IconButton>
                </Tooltip>
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
            <Snackbar
                autoHideDuration={1500}
                key='blendCopied'
                message='Frame preview command copied!'
                onClose={handleSnackbarClose}
                open={snackbarOpen}
            />
        </>
    );
};
