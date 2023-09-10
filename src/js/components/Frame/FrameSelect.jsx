import React, { useState } from 'react';

// MUI
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

// MUI Icons
import CropOriginalRoundedIcon from '@mui/icons-material/CropOriginalRounded';

// Other Components
import { FrameDialog } from './FrameDialog';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { selectCurrentFrame, setCurrentFrame } from '../../redux/slices/currentSelections';
import { selectAllFrames } from '../../redux/slices/frames';

export const FrameSelect = ({ id = 'frame-select', sx = {} }) => {
    const dispatch = useDispatch();
    const currentFrame = useSelector(selectCurrentFrame);

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
                <Button
                    id={id}
                    onClick={handleFrameSelectClick}
                    startIcon={<CropOriginalRoundedIcon />}
                    style={{
                        textTransform: 'none',
                    }}
                    variant='outlined'
                >
                    {currentFrame.name} Frame
                </Button>
            </Box>
            <FrameDialog
                open={frameDialogOpen}
                onClose={handleCancelFrameSelect}
                onSelect={handleFrameSelect}
            />
        </>
    );
};
