 import { createAsyncThunk } from '@reduxjs/toolkit';
 import store from '../../store';
 import * as actions from '../../actions';
 import { bindActionCreators } from 'redux';

 const { dispatch } = store;
 const bodyString = (title, description, body, tags) => JSON.stringify({
     "article":{"title": `${title}`,"description": `${description}`,"body": `${body}`, "tagList": tags}
 });
 const urlFavorite = (slug) => `https://blog.kata.academy/api/articles/${slug}/favorite`;
 const token = sessionStorage.getItem('token');
 const {addArticles, addArticlesError, addEmailInvalid, addUserInfo, addSignInEmail, addSignInPassword, addError,
     addUserName, addEmail, addPassword, addPasswordRepeat, addChecked, addCreateTag,
     addCreateTitle, addCreateDescription, addCreateBody, addArticle, changeOk, changeArticleOk, addLoading} = bindActionCreators(actions, dispatch)

export const articleList = createAsyncThunk(
      'articles/articleList',
    async function(page) {
        const body = token ? {headers: {"Content-Type": "application/json;charset=utf-8", Authorization: `Token ${sessionStorage.getItem('token')}`}} : null;
        let offset = 0;
        switch (page) {
            case 1:
                offset = 0
                break;
            case 2:
                offset = 20
                break;
            case 3:
                offset = 40
                break;
            case 4:
                offset = 60
                break;
            case 5:
                offset = 80
                break;
        }
        const result = await fetch(`https://blog.kata.academy/api/articles?offset=${offset}`, body);
        if (!result.ok) {
            addArticlesError(true)
            return {articles: []};
        }
        const data = await result.json();
        const resArr = data.articles.map((el) => {
            const id = `${el.createdAt}_${el.author.username}`;
            return {...el, id}
        });
        addArticles(resArr)
    }
);

 export const registerNewUser = createAsyncThunk(
     'newUser/registerNewUser',
     async function({userName, email, password}) {
         const bodyString = JSON.stringify({
             "user": {"username":`${userName}`,"email":`${email}`,"password":`${password}`}
         })
         await fetch('https://blog.kata.academy/api/users', {
             method: 'POST',
             headers: {
                 "Content-Type": "application/json;charset=utf-8",
             },
             body: bodyString,
         }).then((res) => {
             if (res.ok) {
                 userSignIn({email, password});
                 addUserName('');
                 addEmail('');
                 addPassword('');
                 addPasswordRepeat('');
                 addChecked(false);
                 addError('');
                 changeOk(true);
             } else {
                 addError('is already taken.');
                 console.clear();
             }
         })
     }
 );

 export const userSignIn = createAsyncThunk(
     'signIn/userSignIn',
     async function({email, password}) {
         const bodyString = JSON.stringify({
             "user": {"email":`${email}`,"password":`${password}`}
         })
         let res = await fetch('https://blog.kata.academy/api/users/login', {
             method: "POST",
             headers: {
                 "Content-Type": "application/json;charset=utf-8",
             },
             body: bodyString,
         }).then((res) => res.json())
             .catch((error) => {
                 addEmailInvalid(true);
                 return error
             })
         if (res.errors === undefined) {
             addUserInfo(res.user);
             addArticlesError(false);
             addEmailInvalid(false);
             if (token) {
                 sessionStorage.removeItem('token');
                 sessionStorage.setItem('token', res.user.token);
             } else {
                 sessionStorage.setItem('token', res.user.token);
             }
             sessionStorage.setItem('image', res.user.image);
             sessionStorage.setItem('username', res.user.username);
             addSignInEmail('');
             addSignInPassword('');
             addLoading(true);
             dispatch(articleList());
             changeOk(true);
         } else {
             addEmailInvalid(true);
             console.clear();
         }
     }
 );

 export const updateCurrentUser = createAsyncThunk(
     'currentUser/updateCurrentUser',
     async function({email, userName, newPassword, avatarImage, token, userInfo}) {
         const bodyString = JSON.stringify({
             "user": {"email":`${email}`,"username":`${userName}`,"bio":"", "image": `${avatarImage}`, "password":`${newPassword}`}
         })
         await fetch('https://blog.kata.academy/api/user', {
             method: "PUT",
             headers: {
                 "Content-Type": "application/json;charset=utf-8",
                 Authorization: `Token ${token}`
             },
             body: bodyString,
         }).then((res) => {
             if (res.ok) {
                 return res.json()
             } else {
                 dispatch(addError('data entered incorrectly'));
                 console.clear();
             }
         }).then((res) => {
             addSignInEmail('');
             addSignInPassword('');
             sessionStorage.setItem('image', res.user.image);
             addUserInfo({
                 ...userInfo,
                 image: res.user.image,
             })
             addError('')
             changeOk(true);
         })
     }
 );

 export const likeArticle = createAsyncThunk(
     'like/likeArticle',
     async function({token, slug, articlesList, flag}) {
         await fetch(urlFavorite(slug), {
             method: "POST",
             headers: {
                 "Content-Type": "application/json;charset=utf-8",
                 Authorization: `Token ${token}`
             },
         }).then((res) => res.json())
             .then((res) => {
                 const index = articlesList.findIndex((el) => el.slug === res.article.slug)
                 const newEl = {...res.article, id:`${articlesList[index].createdAt}_${articlesList[index].author.username}`};
                 addArticles([...articlesList.slice(0, index), newEl, ...articlesList.slice(index + 1)])
                 if (flag) {
                     dispatch(getArticle({slug, token}))
                 }
             })
     }
 );

 export const unFavoriteArticle = createAsyncThunk(
     'noLike/unFavoriteArticle',
     async function({token, slug, articlesList, flag}) {
         await fetch(urlFavorite(slug), {
             method: "DELETE",
             headers: {
                 "Content-Type": "application/json;charset=utf-8",
                 Authorization: `Token ${token}`
             },
         }).then((res) => res.json())
             .then((res) => {
                 const index = articlesList.findIndex((el) => el.slug === res.article.slug)
                 const newEl = {...res.article, id:`${articlesList[index].createdAt}_${articlesList[index].author.username}`};
                 addArticles([...articlesList.slice(0, index), newEl, ...articlesList.slice(index + 1)])
                 if (flag) {
                     dispatch(getArticle({slug, token}))
                 }
             })
     }
 );

 export const createArticle = createAsyncThunk(
     'create/createArticle',
     async function({token, title, description, body, tags}) {
         await fetch('https://blog.kata.academy/api/articles', {
             method: "POST",
             headers: {
                 "Content-Type": "application/json;charset=utf-8",
                 Authorization: `Token ${token}`
             },
             body: bodyString(title, description, body, tags),
         }).then(() => {
             addCreateTag('');
             addCreateTitle('');
             addCreateDescription('');
             addCreateBody('');
             changeOk(true);
             dispatch(articleList());
         })
     }
 );

 export const updateArticle = createAsyncThunk(
     'update/updateArticle',
     async function({slug, token, title, description, body, tags}) {
         await fetch(`https://blog.kata.academy/api/articles/${slug}`,{
             method: 'PUT',
             headers: {
                 "Content-Type": "application/json;charset=utf-8",
                 Authorization: `Token ${token}`,
             },
             body: bodyString(title, description, body, tags),
         })
             .then((res) => res.json())
             .then(() => {
                 dispatch(getArticle({slug, token}))
                 changeArticleOk(true);
             })
     }
 );

 export const deleteArticle = createAsyncThunk(
     'delete/deleteArticle',
     async function({id, token}) {
         await fetch(`https://blog.kata.academy/api/articles/${id}`, {
             method: 'DELETE',
             headers: {
                 "Content-Type": "application/json;charset=utf-8",
                 Authorization: `Token ${token}`,
             },
         }).then(() => {
             dispatch(articleList());
             changeOk(true);
         });
     }
 );

 export const getArticle = createAsyncThunk(
     'get/getArticle',
     async function({slug, token}) {
         await fetch(`https://blog.kata.academy/api/articles/${slug}`,{
             method: 'GET',
             headers: {
                 "Content-Type": "application/json;charset=utf-8",
                 Authorization: `Token ${token}`,
             },
         })
             .then((res) => res.json())
             .then((res) => {
                 addLoading(false);
                 changeArticleOk(true);
                 addArticle(res.article);
             })
     }
 );



























