import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from './components/header';
import ArticlesList from './components/articles-list';
import Article from './components/article';

const App = () => {
    const articleArr = [1, 2 ,3 ,4 , 5];
   return <>
        <Header />
       <Routes>
           <Route path="/" element={<ArticlesList articlesList={articleArr} />} />
           <Route path="/article" element={<Article />} />
       </Routes>
     </>
}

const container = createRoot(document.getElementById('root'));

container.render(<BrowserRouter>
    <App />
</BrowserRouter>);

