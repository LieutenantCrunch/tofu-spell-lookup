import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from './rootReducer';
import { populateStore } from './utility';

export const store = populateStore(configureStore({
    reducer: rootReducer
}));
