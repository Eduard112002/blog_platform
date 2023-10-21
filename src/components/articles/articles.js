import React from 'react';
import './articles.css';
import { format } from 'date-fns';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../../actions';
import Server from '../server';

const Articles = ({ articles, articlesList, addArticles }) => {
    const tag = tegList(articles.tagList);
    const [year, month, day] = articles.createdAt.slice(0, 10).split('-');
    const newData = format(new Date(year, month - 1, day), 'LLLL dd, yyyy');
    const server = new Server();
    const addLike = (e) => {
        if (sessionStorage.getItem('token')) {
            articles.favorited ? server.unFavoriteArticle(sessionStorage.getItem('token'), articles.slug, articlesList) :
                server.likeArticle(sessionStorage.getItem('token'), articles.slug, articlesList);
        }
        e.preventDefault();
    }
    const imgError = () => {
        const articleIndex = articlesList.findIndex((el) => el.id === articles.id);
        let newEl = articlesList[articleIndex];
        newEl = {...newEl, author:{ ...newEl.author, image: 'https://www.svgrepo.com/show/442075/avatar-default-symbolic.svg'}}
        addArticles([...articlesList.slice(0, articleIndex), newEl, ...articlesList.slice(articleIndex + 1)])
        console.clear();
    }
    const like = articles.favorited ? 'articles_like like' : 'articles_like no_like';
   return <div className="articles">
       <div className="articles_content">
           <div>
               <span className="articles_title">{articles.slug}</span>
               <button className={like} type='button' onClick={(e) => addLike(e)}>{articles.favoritesCount}</button>
           </div>
               {tag}
               <p className="articles_text">{articles.title}</p>
       </div>
       <div className="articles_user">
           <div className="articles_user_info">
               <h4 className="articles_user_info__name">{articles.author.username}</h4>
               <span className="articles_user_info__date">{newData}</span>
           </div>
           <img className="articles_user_info__icon" src={articles.author.image} onError={imgError} alt="user_icon"/>
       </div>
   </div>
}

const tegList = (arr) => {
    return arr.map((el, index) => {
        if (index < 3 && el && el.trim().length) {
            return <span className="articles_tag" key={index}>{el.length < 20 ? el : el.slice(0, 20) + '...'}</span>
        }
    });
}


const mapStateToProps = (state) => {
    const articles = state.addArticlesReducer;
    return {
        articlesList: articles.articlesList,
    };
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(actions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Articles);