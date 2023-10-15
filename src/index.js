import React, { useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";

import store from './store';
import Server from './components/server';
import Header from './components/header';
import ArticlesList from './components/articles-list';
import Article from './components/article';

const App = () => {
    const server = new Server();
    useEffect(() => {
        server.getArticleList();
    }, [])
   return <>
       <Provider store={store}>
           <Header />
           <Routes>
               <Route path="/" element={<ArticlesList />} />
               <Route path="/article" element={<Article />} />
               <Route path="/article/:id" element={<Article />}></Route>
               <Route path="*" element={<ArticlesList />} />
           </Routes>
       </Provider>
     </>
}

const container = createRoot(document.getElementById('root'));

container.render(<BrowserRouter>
    <App />
</BrowserRouter>);

