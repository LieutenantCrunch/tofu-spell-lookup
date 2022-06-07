import React from 'react';

// Redux
import { useSelector } from 'react-redux';
import {
    selectCurrentFrame,
    selectContinuousShift,
    selectCurrentBlend
} from '../../redux/slices/currentSelections';

// Utilities
import { SPELL_BLEND_MODES, SPELL_PROPERTIES } from '../../utilities/constants';
import { decToHex, decToHSLObject, decToHSLString, zeroPad } from '../../utilities/utilities';

export const ImageSection = ({ }) => {
    const currentFrame = useSelector(selectCurrentFrame);
    const continuousShift = useSelector(selectContinuousShift);
    const currentBlend = useSelector(selectCurrentBlend);

    let mixBlendMode = currentBlend
        ? (
            SPELL_BLEND_MODES[currentBlend[SPELL_PROPERTIES.TYPE]]
            ? SPELL_BLEND_MODES[currentBlend[SPELL_PROPERTIES.TYPE]]
            : 'luminosity'
        ) 
        : 'normal';
    let parentBackgroundImage = currentFrame && currentBlend ? `url('i/${currentFrame.image}.hue.png')` : 'none';
    let parentFilter = currentBlend ? `hue-rotate(${decToHSLObject(currentBlend[SPELL_PROPERTIES.VALUE]).hue}deg)` : 'none';
    let blendBackgroundColor = currentBlend ? `#${zeroPad(decToHex(currentBlend[SPELL_PROPERTIES.VALUE]), 6)}` : '';
    let imageFilter = continuousShift 
        ? `hue-rotate(${continuousShift[SPELL_PROPERTIES.VALUE]}deg)` 
        : 'none';

    return (
        /*<div
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
        </div>*/
        <div
            style={{
                backgroundImage: `url('i/${currentFrame.image}.png')`,
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'contain',
                borderRadius: '4px',
                filter: imageFilter,
                height: '100%',
                position: 'absolute',
                width: '100%'
            }}
        >
            {
                currentFrame && currentBlend &&
                <div
                    style={{
                        backgroundColor: blendBackgroundColor,
                        borderRadius: '4px',
                        height: '100%',
                        maskImage: `url('i/${currentFrame.image}.mask.png')`,
                        maskRepeat: 'no-repeat',
                        maskSize: 'contain',
                        mixBlendMode,
                        width: '100%'
                    }}
                >
                </div>
            }
        </div>
    );
};
