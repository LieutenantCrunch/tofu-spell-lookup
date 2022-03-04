// MUI
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';

export const SectionControlContainer = styled(Box)(({ theme }) => ({
    alignItems: 'center',
    display: 'flex',
    flexWrap: 'wrap',
    [theme.breakpoints.up('xs')]: {
        justifyContent: 'center'
    },
    [theme.breakpoints.up('sm')]: {
        justifyContent: 'space-between'
    }
}));
