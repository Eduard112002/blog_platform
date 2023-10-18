import { Component } from 'react';
import {addArticles, addArticlesError, addEmailInvalid, addToken} from '../../actions';
import store from '../../store';

export default class Server extends Component {
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
        fetch('https://blog.kata.academy/api/users', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json;charset=utf-8",
            },
            body: bodyString,
        });
    }
   async userSignIn(email, password) {
       const bodyString = JSON.stringify({
           "user": {"email":`${email}`,"password":`${password}`}
       })
      await fetch('https://blog.kata.academy/api/users/login', {
           method: "POST",
           headers: {
               "Content-Type": "application/json;charset=utf-8",
           },
           body: bodyString,
       }).then((res) => res.json())
          .then((res) => {
              this.dispatch(addToken(res.user.token))
              this.dispatch(addArticlesError(false))
              this.dispatch(addEmailInvalid(1))
          })
          .catch(() => this.dispatch(addEmailInvalid(true)));
   }
//"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1MmZmNzUzZmYzY2M4MWIwMGRhYzQ2OCIsInVzZXJuYW1lIjoiZWR1YXJkIiwiZXhwIjoxNzAyODI2MzIzLCJpYXQiOjE2OTc2NDIzMjN9.gxrgBh054YBc31lZC4nSyh6nJGblEKuqedFhhPGIZok"
}

