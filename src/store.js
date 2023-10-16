import {configureStore, combineReducers, applyMiddleware} from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import addArticlesReducer from "./reducer/add-articles";

const reducer = combineReducers(
    {
        addArticlesReducer,
    }
);
const store = configureStore({reducer}, applyMiddleware(thunk));
export default store;

