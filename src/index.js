import React, { useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import {BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import { Provider } from 'react-redux';

import store from './store';
import Server from './components/server';
import Header from './components/header';
import ArticlesList from './components/articles-list';
import Article from './components/article';
import CreateAccount from './components/сreate-account';
import SignInAccount from './components/sign-in-account';
import EditProfile from './components/edit-profile';

const App = () => {
    const server = new Server();
    let navigate = useNavigate();
    useEffect(() => {
        server.getArticleList();
        return navigate("/");
    }, [])
   return <>
       <Provider store={store}>
           <Header />
           <Routes>
               <Route path="/" element={<ArticlesList />} />
               <Route path="/article" element={<Article />} />
               <Route path="/articles/:id" element={<Article />}/>
               <Route path="/singUp" element={<CreateAccount />}/>
               <Route path="/singIn" element={<SignInAccount />}/>
               <Route path="/profile" element={<EditProfile />}/>
               <Route path="*" element={<ArticlesList />}/>
           </Routes>
       </Provider>
     </>
}

const container = createRoot(document.getElementById('root'));

container.render(<BrowserRouter>
    <App />
</BrowserRouter>);

