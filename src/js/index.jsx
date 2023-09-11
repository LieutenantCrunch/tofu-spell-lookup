import React from 'react';
import { createRoot } from 'react-dom/client';

// Contexts
import { MiniFrameActiveContextProvider } from './contexts/MiniFrameActiveContext';

// MUI
import { StyledEngineProvider, ThemeProvider } from '@mui/material/styles';

// Other Components
import { App } from './components/App';

// Redux
import { Provider } from 'react-redux';
import { store } from './redux/store';

// Stylesheets
import '../css/styles.css';

// Theming
import { TofuTheme } from './theming/TofuTheme';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
    <Provider store={store}>
        <ThemeProvider theme={TofuTheme}>
            <StyledEngineProvider injectFirst>
                <MiniFrameActiveContextProvider>
                    <App />
                </MiniFrameActiveContextProvider>
            </StyledEngineProvider>
        </ThemeProvider>
    </Provider>
);
