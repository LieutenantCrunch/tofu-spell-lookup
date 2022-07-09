import { combineReducers } from '@reduxjs/toolkit';
import blendReducer from './blend';
import textColorReducer from './textColor';
import textGlowReducer from './textGlow';

const searchesReducer = combineReducers({
    blend: blendReducer,
    textColor: textColorReducer,
    textGlow: textGlowReducer
});

export default searchesReducer;
