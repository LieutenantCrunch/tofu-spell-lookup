import React from 'react';

// MUI
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

// MUI Icons
import NavigateBeforeRoundedIcon from '@mui/icons-material/NavigateBeforeRounded';
import NavigateNextRoundedIcon from '@mui/icons-material/NavigateNextRounded';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { selectCurrentFrame, setCurrentFrame } from '../../redux/slices/currentSelections';
import { selectAllFrames } from '../../redux/slices/frames';

export const FrameSelect = ({ id = 'frame-select', sx = {} }) => {
    const dispatch = useDispatch();

    const currentFrame = useSelector(selectCurrentFrame);
    const frames = useSelector(selectAllFrames);
    const totalFrames = frames.length;

    const labelId = `${id}-label`;

    const handleChange = (e) => {
        const selectedFrame = frames.find(frame => frame.name == e.target.value);

        if (selectedFrame) {
            dispatch(setCurrentFrame(selectedFrame));
        }
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
        <Box
            style={{
                display: 'flex',
                flexWrap: 'nowrap',
                width: '100%',
            }}
            sx={sx}
        >
            <IconButton
                onClick={handlePreviousClick}
                style={{
                    borderRadius: '4px 0 0 4px'
                }}
            >
                <NavigateBeforeRoundedIcon />
            </IconButton>
            <FormControl fullWidth>
                <InputLabel id={labelId}>Frame</InputLabel>
                <Select
                    autoWidth
                    label="Frame"
                    labelId={labelId}
                    id={id}
                    onChange={handleChange}
                    value={currentFrame.name}
                >
                    {
                        frames.map(frame => {
                            return <MenuItem key={frame.name} value={frame.name}>
                                {
                                    frame.name
                                }
                            </MenuItem>
                        })
                    }
                </Select>
            </FormControl>
            <IconButton
                onClick={handleNextClick}
                style={{
                    borderRadius: '0 4px 4px 0'
                }}
            >
                <NavigateNextRoundedIcon />
            </IconButton>
        </Box>
    );
};
