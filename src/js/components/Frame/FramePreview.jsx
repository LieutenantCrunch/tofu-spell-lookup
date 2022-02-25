import React from 'react';

// Redux
import { useSelector } from 'react-redux';
import { selectCurrentFrame, selectCurrentRotate } from '../../redux/slices/currentSelections';
import { selectFrameByName } from '../../redux/slices/frames';

export const FramePreview = ({ }) => {
    const currentFrame = useSelector(selectCurrentFrame);
    const currentRotate = useSelector(selectCurrentRotate);
    const frame = useSelector(state => selectFrameByName(state, currentFrame));

    return (
        <div
            style={{
                margin: '1em 0'
                /*display: 'inline-block'*/
            }}
        >
            {
                frame &&
                <img
                    src={`i/${frame.image}.png`}
                    style={{
                        filter: `hue-rotate(${currentRotate || 0}deg)`,
                        maxWidth: '300px'
                    }}
                />
            }
        </div>
    );
};
