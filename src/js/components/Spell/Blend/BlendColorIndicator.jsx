import React from 'react';

// MUI
import Tooltip from '@mui/material/Tooltip';

// Redux
import { useSelector } from 'react-redux';
import { selectSearchBlendHue, selectSearchBlendLightness, selectSearchBlendSaturation } from '../../../redux/slices/searches/blend';

export const BlendColorIndicator = ({ }) => {
    const hue = useSelector(selectSearchBlendHue);
    const lightness = useSelector(selectSearchBlendLightness);
    const saturation = useSelector(selectSearchBlendSaturation);

    return (
        <Tooltip
            arrow
            placement="top"
            title={`H: ${hue} S: ${saturation} L: ${lightness}`}
        >
            <div
                style={{
                    backgroundColor: `hsl(${hue}, ${saturation}%, ${lightness}%)`,
                    borderRadius: '50%',
                    height: '2em',
                    width: '2em'
                }}
            >
            </div>
        </Tooltip>
    );
};
