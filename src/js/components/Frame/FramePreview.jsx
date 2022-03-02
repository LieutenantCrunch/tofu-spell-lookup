import React from 'react';

// Redux
import { useSelector } from 'react-redux';
import {
    selectCurrentFrame,
    selectContinuousRotate,
    selectCurrentHue
} from '../../redux/slices/currentSelections';

export const FramePreview = ({ }) => {
    const currentFrame = useSelector(selectCurrentFrame);
    const continuousRotate = useSelector(selectContinuousRotate);
    const currentHue = useSelector(selectCurrentHue);

    let parentBackgroundImage = currentFrame && currentHue ? `url('i/${currentFrame.image}.hue.png')` : 'none';
    let parentFilter = currentHue ? `hue-rotate(${currentHue.value}deg)` : 'none';
    let imageFilter = continuousRotate 
        ? `hue-rotate(${continuousRotate.value}deg)` 
        : (
            currentHue
            ? `hue-rotate(-${currentHue.value}deg)`
            : 'none'
        );

    return (
        <div
            style={{
                backgroundImage: parentBackgroundImage,
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'contain',
                filter: parentFilter,
                margin: '1em 0'
                /*display: 'inline-block'*/
            }}
        >
            {
                currentFrame &&
                <img
                    src={`i/${currentFrame.image}.png`}
                    style={{
                        filter: imageFilter,
                        maxWidth: '300px',
                        mixBlendMode: 'luminosity'
                    }}
                />
            }
        </div>
    );
};
