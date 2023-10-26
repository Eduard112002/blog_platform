import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import Header from './components/header';
import ArticlesList from './components/articles-list';
import Article from './components/article';
import CreateAccount from './components/сreate-account';
import SignInAccount from './components/sign-in-account';
import EditProfile from './components/edit-profile';
import PrivateRouter from "./components/utils/private-router";

const App = () => {
   return <>
       <Provider store={store}>
           <Header />
           <Routes>
               <Route path="/" element={<ArticlesList />} />
               <Route path="/articles/:id" element={<Article />}/>
               <Route path="/singUp" element={<CreateAccount />}/>
               <Route path="/singIn" element={<SignInAccount />}/>
               <Route path="/profile" element={<EditProfile />}/>
               <Route path="/new-article" element={<PrivateRouter />}/>
               <Route path="/articles/:slug/edit" element={<PrivateRouter />}/>
               <Route path="*" element={<ArticlesList/>}/>
           </Routes>
       </Provider>
     </>
}

const container = createRoot(document.getElementById('root'));

container.render(<BrowserRouter>
    <App />
</BrowserRouter>);

