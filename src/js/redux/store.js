import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from './rootReducer';
import { populateStore } from './utility';

import { currentSelectionsMiddleware } from './slices/currentSelections';

export const store = populateStore(configureStore({
    reducer: rootReducer,
    middleware: [
        currentSelectionsMiddleware
    ]
}));
