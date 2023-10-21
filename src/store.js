import {configureStore, combineReducers, applyMiddleware} from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import addArticlesReducer from './reducer/add-articles';
import addNewAccountReducer from './reducer/add-new-account';
import addUserSignInReducer from "./reducer/add-user-sign-in";
import createArticleReducer from "./reducer/create-article";

const reducer = combineReducers(
    {
        addUserSignInReducer,
        addArticlesReducer,
        addNewAccountReducer,
        createArticleReducer,
    }
);
const store = configureStore({reducer}, applyMiddleware(thunk));

export default store;
