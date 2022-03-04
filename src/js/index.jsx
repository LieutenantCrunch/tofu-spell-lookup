import React from 'react';
import ReactDOM from 'react-dom';

// MUI
import { ThemeProvider } from '@mui/material/styles';

// Other Components
import { App } from './components/App';

// Redux
import { Provider } from 'react-redux';
import { store } from './redux/store';

// Stylesheets
import '../css/styles.css';

// Theming
import { TofuTheme } from './theming/TofuTheme';

ReactDOM.render(
    <Provider store={store}>
        <ThemeProvider theme={TofuTheme}>
            <App />
        </ThemeProvider>
    </Provider>,
    document.getElementById('root')
);
