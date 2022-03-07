import React from 'react';

// Redux
import { useSelector } from 'react-redux';
import {
    selectCurrentFrame,
    selectContinuousRotate,
    selectCurrentHue
} from '../../redux/slices/currentSelections';

export const ImageSection = ({ }) => {
    const currentFrame = useSelector(selectCurrentFrame);
    const continuousRotate = useSelector(selectContinuousRotate);
    const currentHue = useSelector(selectCurrentHue);

    let mixBlendMode = currentHue
        ? (
            currentHue.blendMode
            ? currentHue.blendMode
            : 'luminosity'
        ) 
        : 'normal';
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
                height: '100%',
                width: '100%'
            }}
        >
            {
                currentFrame &&
                <img
                    src={`i/${currentFrame.image}.png`}
                    style={{
                        filter: imageFilter,
                        height: '100%',
                        mixBlendMode,
                        width: '100%'
                    }}
                />
            }
        </div>
    );
};
