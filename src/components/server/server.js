import { Component } from 'react';
import { addArticles, addArticlesError, addEmailInvalid, addUserInfo, addSignInEmail, addSignInPassword, addError,
         addUserName, addEmail, addPassword, addPasswordRepeat, addChecked} from '../../actions';
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
        }).then((res) => {
            if (res.ok) {
                this.userSignIn(email, password);
                this.dispatch(addUserName(''));
                this.dispatch(addEmail(''));
                this.dispatch(addPassword(''));
                this.dispatch(addPasswordRepeat(''));
                this.dispatch(addChecked(false));
                this.dispatch(addError(''))
                return this.navigate("/");
            } else {
                this.dispatch(addError('is already taken.'));
                console.clear();
            }
       })
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
           if (sessionStorage.getItem('token')) {
               sessionStorage.removeItem('token');
               sessionStorage.setItem('token', res.user.token);
           } else {
               sessionStorage.setItem('token', res.user.token);
           }
           sessionStorage.setItem('image', res.user.image);
           sessionStorage.setItem('username', res.user.username);
           this.dispatch(addSignInEmail(''));
           this.dispatch(addSignInPassword(''));
           return this.navigate("/");
       } else {
           this.dispatch(addEmailInvalid(true));
       }
   }
   async updateCurrentUser(email, username, newPassword, image, token, userInfo) {
       const bodyString = JSON.stringify({
           "user": {"email":`${email}`,"username":`${username}`,"bio":"", "image": `${image}`, "password":`${newPassword}`}
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
               this.dispatch(addError('data entered incorrectly'));
               console.clear();
           }
       }).then((res) => {
         this.dispatch(addSignInEmail(''));
         this.dispatch(addSignInPassword(''));
           sessionStorage.setItem('image', res.user.image);
               this.dispatch(addUserInfo({
                   ...userInfo,
                   image: res.user.image,
               }))
         this.dispatch(addError(''))
         return this.navigate("/");
           })
   }
}

