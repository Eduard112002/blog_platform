import React from 'react';
import './articles.css';
import { format } from 'date-fns';
import { connect, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import {bindActionCreators} from 'redux';
import * as actions from '../../actions';
import Markdown from 'react-markdown'
import {getArticle, likeArticle, unFavoriteArticle} from "../server/server-reducer";

const Articles = ({ articles, articlesList, addArticles, addLoading }) => {
    const tag = tegList(articles.tagList);
    const [year, month, day] = articles.createdAt.slice(0, 10).split('-');
    const newData = format(new Date(year, month - 1, day), 'LLLL dd, yyyy');
    const dispatch = useDispatch();
    const slug = articles.slug;
    const addLike = (e) => {
        e.stopPropagation();
        e.preventDefault();
        const token = sessionStorage.getItem('token');
        if (token) {
            articles.favorited ? dispatch(unFavoriteArticle({token, slug, articlesList})) :
                dispatch(likeArticle({token, slug, articlesList}));
        }
    }
    const imgError = () => {
        const articleIndex = articlesList.findIndex((el) => el.id === articles.id);
        let newEl = articlesList[articleIndex];
        newEl = {...newEl, author:{ ...newEl.author, image: 'https://www.svgrepo.com/show/442075/avatar-default-symbolic.svg'}}
        addArticles([...articlesList.slice(0, articleIndex), newEl, ...articlesList.slice(articleIndex + 1)])
        console.clear();
    }
    const toGetArticle = (slug, token) => {
        addLoading(true);
        dispatch(getArticle({slug, token}))
    }
    const token = sessionStorage.getItem('token');
    const like = articles.favorited ? 'articles_like like' : 'articles_like no_like';
   return <Link className="link" to={`/articles/${slug}`} onClick={() => toGetArticle(slug, token)}>
           <div className="articles">
           <div className="articles_content">
               <div>
                   <span className="articles_title">{articles.slug}</span>
                   <button className={like} type='button' onClick={(e) => addLike(e)}>{articles.favoritesCount}</button>
               </div>
                   {tag}
               <span className="articles_text"><Markdown>{articles.title}</Markdown></span>
           </div>
           <div className="articles_user">
               <div className="articles_user_info">
                   <h4 className="articles_user_info__name">{articles.author.username}</h4>
                   <span className="articles_user_info__date">{newData}</span>
               </div>
               <img className="articles_user_info__icon" src={articles.author.image} onError={imgError} alt="user_icon"/>
           </div>
       </div>
   </Link>
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