// MUI
import Slider from '@mui/material/Slider';
import { styled } from '@mui/material/styles';

export const HSLSlider = styled(Slider)({
    '& .MuiSlider-rail': {
        background: 'unset'
    },
    '& .MuiSlider-thumb': {
        borderColor: '#ffffff',
        borderStyle: 'solid',
        '&::before': {
            boxShadow: 'none'
        }
    },
    '& .MuiSlider-track': {
        background: 'unset',
        border: 'unset'
    }
});
