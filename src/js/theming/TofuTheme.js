import { createTheme } from '@mui/material/styles';

export const TofuTheme = createTheme({
    breakpoints: {
        values: {
            xs: 0,
            sm: 600,
            md: 900,
            lg: 1060, // Modified from 1200
            xl: 1536 // Value from https://mui.com/material-ui/customization/breakpoints/
        }
    },
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
