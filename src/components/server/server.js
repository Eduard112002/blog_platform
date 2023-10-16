import { Component } from 'react';
import { addArticles, addArticlesError } from '../../actions';
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
             this.dispatch(addArticlesError())
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
}
