import React from 'react';
import { createRoot } from 'react-dom/client';

// MUI
import { ThemeProvider } from '@mui/material/styles';

// Other Components
import { App } from './components/App';

// Redux
import { Provider } from 'react-redux';
import { store } from './redux/store';

// Scripts
import '../js/tofuScripts.js';

// Stylesheets
import '../css/styles.css';
import '../css/tofuStyles.css';

// Theming
import { TofuTheme } from './theming/TofuTheme';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
    <Provider store={store}>
        <ThemeProvider theme={TofuTheme}>
            <App />
        </ThemeProvider>
    </Provider>
);
