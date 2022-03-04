import React from 'react';

// MUI
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { selectCurrentFrame, setCurrentFrame } from '../../redux/slices/currentSelections';
import { selectAllFrames } from '../../redux/slices/frames';

export const FrameSelect = ({ id = 'frame-select' }) => {
    const dispatch = useDispatch();

    const currentFrame = useSelector(selectCurrentFrame);
    const frames = useSelector(selectAllFrames);

    const labelId = `${id}-label`;

    const handleChange = (e) => {
        const selectedFrame = frames.find(frame => frame.name == e.target.value);

        if (selectedFrame) {
            dispatch(setCurrentFrame(selectedFrame));
        }
    };

    return (
        <div
            style={{
                //minWidth: '120px'
            }}
        >
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
        </div>
    );
};
