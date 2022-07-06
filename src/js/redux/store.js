import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from './rootReducer';
import { populateStore } from './utility';

// Middleware
import { currentSelectionsMiddleware } from './slices/currentSelections';

// Test Data
import framesJson from '../../data/frames.json';
// import spellsJson from '../../data/spells.json';
const spellsJson = [];  // Use empty array as default

export const store = populateStore(
    configureStore({
        reducer: rootReducer,
        middleware: [
            currentSelectionsMiddleware
        ]
    }),
    spellsJson,
    framesJson
);
