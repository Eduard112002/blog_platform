import {configureStore, combineReducers, applyMiddleware} from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import addArticlesReducer from './reducer/add-articles';
import addNewAccountReducer from './reducer/add-new-account';

const reducer = combineReducers(
    {
        addArticlesReducer,
        addNewAccountReducer,
    }
);
const store = configureStore({reducer}, applyMiddleware(thunk));

export default store;
