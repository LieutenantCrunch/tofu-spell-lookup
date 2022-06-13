import { combineReducers } from '@reduxjs/toolkit';
import blendReducer from './blend';
import textColorReducer from './textColor';

const searchesReducer = combineReducers({
    blend: blendReducer,
    textColor: textColorReducer
});

export default searchesReducer;
