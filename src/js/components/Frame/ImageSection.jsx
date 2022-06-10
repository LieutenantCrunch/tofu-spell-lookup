import React from 'react';

// Redux
import { useSelector } from 'react-redux';
import {
    selectCurrentFrame,
    selectContinuousShift
} from '../../redux/slices/currentSelections';
import {
    selectSearchBlend
} from '../../redux/slices/searches/blend';

// Utilities
import { SPELL_BLEND_MODES, SPELL_PROPERTIES } from '../../utilities/constants';

export const ImageSection = ({ }) => {
    const currentFrame = useSelector(selectCurrentFrame);
    const continuousShift = useSelector(selectContinuousShift);
    const searchBlend = useSelector(selectSearchBlend);

    // Determine the mix-blend-mode of the overlay based on the search blend
    let mixBlendMode = searchBlend
        ? SPELL_BLEND_MODES[searchBlend[[SPELL_PROPERTIES.TYPE]]]
        : undefined;

    // Determine the background-color of the overlay based on the search blend
    let backgroundColor = searchBlend
        ? `hsl(${searchBlend.hue}, ${searchBlend.saturation}%, ${searchBlend.lightness}%)` 
        : undefined;

    // Determine the filter if there's a continuous shift
    let filter = continuousShift 
        ? `hue-rotate(${continuousShift[SPELL_PROPERTIES.VALUE]}deg)` 
        : 'none';
    
    // Determine the background image and mask image based on the current frame
    let backgroundImage = currentFrame ? `url('i/${currentFrame.image}.png')` : 'none';
    let maskImage = currentFrame ? `url('i/${currentFrame.image}.mask.png')` : 'none';

    return (
        <div
            style={{
                backgroundImage,
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'contain',
                borderRadius: '4px',
                filter,
                height: '100%',
                position: 'absolute',
                width: '100%'
            }}
        >
            {
                mixBlendMode && backgroundColor &&
                <div
                    style={{
                        backgroundColor,
                        borderRadius: '4px',
                        height: '100%',
                        maskImage,
                        maskRepeat: 'no-repeat',
                        maskSize: 'contain',
                        mixBlendMode,
                        WebkitMaskImage: maskImage,
                        WebkitMaskRepeat: 'no-repeat',
                        WebkitMaskSize: 'contain',
                        width: '100%'
                    }}
                >
                </div>
            }
        </div>
    );
};
