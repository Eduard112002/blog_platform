import { Component } from 'react';
import {addArticles, addArticlesError, addEmailInvalid, addUserInfo, addSignInEmail, addSignInPassword, } from '../../actions';
import store from '../../store';
import { useNavigate } from "react-router-dom";

export default class Server extends Component {
    navigate = useNavigate();
    dispatch = store.dispatch;
   async articleList(page){
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
         const result = await fetch(`https://blog.kata.academy/api/articles?offset=${offset}`);
         if (!result.ok) {
             this.dispatch(addArticlesError(true))
             return {articles: []};
         }
         return result.json();
     }
     async getArticleList(page) {
       const res = await this.articleList(page);
        const resArr = res.articles.map((el) => {
             const id = `${el.createdAt}_${el.author.username}`;
             return {...el, id}
         });
       this.dispatch(addArticles(resArr))
     }

    async registerNewUser(username, email, password) {
        const bodyString = JSON.stringify({
            "user": {"username":`${username}`,"email":`${email}`,"password":`${password}`}
        })
       await fetch('https://blog.kata.academy/api/users', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json;charset=utf-8",
            },
            body: bodyString,
        })
        await this.userSignIn(email, password);
    }
   async userSignIn(email, password) {
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
             this.dispatch(addEmailInvalid(true));
             return error
         })
       if (res.errors === undefined) {
           this.dispatch(addUserInfo(res.user));
           this.dispatch(addArticlesError(false));
           this.dispatch(addEmailInvalid(false));
           localStorage.setItem('token', res.user.token);
           localStorage.setItem('username', res.user.username);
           this.dispatch(addSignInEmail(''));
           this.dispatch(addSignInPassword(''));
           return this.navigate("/");
       } else {
           this.dispatch(addEmailInvalid(true));
           console.clear();
       }
   }
}

