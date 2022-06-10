import React from 'react';

// Redux
import { useSelector } from 'react-redux';
import {
    selectCurrentFrame,
    selectContinuousShift,
    selectCurrentBlend
} from '../../redux/slices/currentSelections';
import {
    selectSearchBlend
} from '../../redux/slices/searches/blend';

// Utilities
import { SPELL_BLEND_MODES, SPELL_PROPERTIES } from '../../utilities/constants';
import { decToHex,zeroPad } from '../../utilities/utilities';

export const ImageSection = ({ }) => {
    const currentFrame = useSelector(selectCurrentFrame);
    const continuousShift = useSelector(selectContinuousShift);
    const currentBlend = useSelector(selectCurrentBlend);
    const searchBlend = useSelector(selectSearchBlend);
    const useSearchBlend = searchBlend && searchBlend.blendType;

    // Determine the mix-blend-mode of the overlay based on the current blend or search blend
    let currentBlendMode = currentBlend && SPELL_BLEND_MODES[currentBlend[SPELL_PROPERTIES.TYPE]]
        ? SPELL_BLEND_MODES[currentBlend[SPELL_PROPERTIES.TYPE]] 
        : undefined;

    let searchBlendMode = useSearchBlend
        ? (
            SPELL_BLEND_MODES[searchBlend.blendType]
            ? SPELL_BLEND_MODES[searchBlend.blendType]
            : 'color' // Fall back to color, since that's the most popular type
        )
        : undefined;

    let mixBlendMode = currentBlendMode || searchBlendMode;

    // Determine the background-color of the overlay based on the current blend or search blend
    let currentBlendBackgroundColor = currentBlend ? currentBlend.backgroundColor : undefined;

    let searchBlendBackgroundColor = useSearchBlend ? `hsl(${searchBlend.hue}, ${searchBlend.saturation}%, ${searchBlend.lightness}%)` : undefined;

    let backgroundColor = currentBlendBackgroundColor || searchBlendBackgroundColor;

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
