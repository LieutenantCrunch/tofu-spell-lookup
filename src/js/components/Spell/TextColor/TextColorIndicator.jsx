import React from 'react';

// MUI
import Tooltip from '@mui/material/Tooltip';

// Redux
import { useSelector } from 'react-redux';
import {
    selectSearchTextColorHue,
    selectSearchTextColorSaturation,
    selectSearchTextColorLightness
} from '../../../redux/slices/searches/textColor';

export const TextColorIndicator = ({ }) => {
    const hue = useSelector(selectSearchTextColorHue);
    const saturation = useSelector(selectSearchTextColorSaturation);
    const lightness = useSelector(selectSearchTextColorLightness);

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
