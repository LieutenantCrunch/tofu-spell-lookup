import { createTheme } from '@mui/material/styles';

export const TofuTheme = createTheme({
    palette: {
        mode: 'dark',
        background: {
            default: '#00222c'
        },
        error: {
            // Official colors from the Material Light Theme
            dark: '#c62828',
            light: '#ef5350',
            main: '#d32f2f'
        }
    }
});
