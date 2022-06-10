import { combineReducers } from '@reduxjs/toolkit';
import blendReducer from './blend';

const searchesReducer = combineReducers({
    blend: blendReducer
});

export default searchesReducer;
