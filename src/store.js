import {configureStore, combineReducers, applyMiddleware} from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import addArticlesReducer from './reducer/add-articles';
import addNewAccountReducer from './reducer/add-new-account';
import addUserSignInReducer from "./reducer/add-user-sign-in";

const reducer = combineReducers(
    {
        addUserSignInReducer,
        addArticlesReducer,
        addNewAccountReducer,
    }
);
const store = configureStore({reducer}, applyMiddleware(thunk));

export default store;
