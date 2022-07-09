import React from 'react';

// MUI
import Tooltip from '@mui/material/Tooltip';

// Redux
import { useSelector } from 'react-redux';
import {
    selectSearchTextGlowHue,
    selectSearchTextGlowSaturation,
    selectSearchTextGlowLightness
} from '../../../redux/slices/searches/textGlow';

export const TextGlowIndicator = ({ }) => {
    const hue = useSelector(selectSearchTextGlowHue);
    const saturation = useSelector(selectSearchTextGlowSaturation);
    const lightness = useSelector(selectSearchTextGlowLightness);

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
