import React from 'react';

// Redux
import { useSelector } from 'react-redux';
import {
    selectContinuousShift,
    selectCurrentFrame,
    selectCurrentTempShift
} from '../../redux/slices/currentSelections';
import {
    selectSearchBlend,
    selectSearchBlendHue,
    selectSearchBlendSaturation,
    selectSearchBlendLightness,
    selectSearchBlendType,
    selectSearchTempBlend
} from '../../redux/slices/searches/blend';

// Utilities
import { SPELL_BLEND_MODES, SPELL_PROPERTIES } from '../../utilities/constants';

export const ImageSection = ({ }) => {
    const continuousShift = useSelector(selectContinuousShift);
    const currentTempShift = useSelector(selectCurrentTempShift);
    const currentFrame = useSelector(selectCurrentFrame);
    const searchBlend = useSelector(selectSearchBlend);
    const searchBlendHue = useSelector(selectSearchBlendHue);
    const searchBlendSaturation = useSelector(selectSearchBlendSaturation);
    const searchBlendLightness = useSelector(selectSearchBlendLightness);
    const searchBlendType = useSelector(selectSearchBlendType);
    const searchTempBlend = useSelector(selectSearchTempBlend);

    const shiftToUse = currentTempShift || continuousShift;
    const blendToUse = searchTempBlend || searchBlend;

    // Determine the mix-blend-mode of the overlay based on the search blend
    let mixBlendMode = currentTempShift
        ? undefined // If there's a temp shift, then they're mousing over the select, do not use a blend
        : (
            blendToUse
            ? SPELL_BLEND_MODES[blendToUse[[SPELL_PROPERTIES.TYPE]]]
            : SPELL_BLEND_MODES[searchBlendType]
        );

    // Determine the background-color of the overlay based on the search blend
    let backgroundColor = blendToUse
        ? `hsl(${blendToUse.hue}, ${blendToUse.saturation}%, ${blendToUse.lightness}%)` 
        : `hsl(${searchBlendHue}, ${searchBlendSaturation}%, ${searchBlendLightness}%)` ;

    // Determine the filter if there's a continuous shift
    let filter = searchTempBlend // If there's a temp blend, then they're mousing over the select, do not use a shift
        ? 'none'
        : (
            shiftToUse 
            ? `hue-rotate(${shiftToUse[SPELL_PROPERTIES.VALUE]}deg)` 
            : 'none'
        );
    
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
                mixBlendMode &&
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
