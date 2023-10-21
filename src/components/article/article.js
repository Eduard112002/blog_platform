import React from 'react';
import './article.css';
import { format } from 'date-fns';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Alert, Space, Spin } from "antd";
import {bindActionCreators} from "redux";
import * as actions from "../../actions";
import Server from '../server';

const Article = ({ articlesList, loading, error, addArticles }) => {
    const { id } = useParams();
    const server = new Server();
    if (loading) {
        return (
            <Space direction="vertical" style={{ width: '100%' }} className="spin">
                <Spin tip="Loading" size="large">
                    <div className="content" />
                </Spin>
            </Space>
        )
    }
    if (error) {
        return (
            <div className='error'>
                <Space direction="vertical" style={{width: '80%'}}>
                    <Alert
                        message="Error"
                        description="Internal Server Error."
                        type="error"
                        showIcon
                    />
                </Space>
            </div>
        )
    }
    const imgError = () => {
        const articleIndex = articlesList.findIndex((el) => el.id === id);
        let newEl = articlesList[articleIndex];
        newEl = {...newEl, author:{ ...newEl.author, image: 'https://www.svgrepo.com/show/442075/avatar-default-symbolic.svg'}}
        addArticles([...articlesList.slice(0, articleIndex), newEl, ...articlesList.slice(articleIndex + 1)])
        console.clear();
    }
    const addLike = () => {
        if (sessionStorage.getItem('token')) {
            article.favorited ? server.unFavoriteArticle(sessionStorage.getItem('token'), article.slug, articlesList) :
                server.likeArticle(sessionStorage.getItem('token'), article.slug, articlesList);
        }
    }
    const article = articlesList.find((el) => el.id === id);
    const like = article.favorited ? 'articles_like like' : 'articles_like no_like';
    const tag = tegList(article.tagList);
    const [year, month, day] = article.createdAt.slice(0, 10).split('-');
    const newData = format(new Date(year, month - 1, day), 'LLLL dd, yyyy');
    return <div className="article_list">
        <div className="article">
            <div className="article_header">
                <div>
                    <span className="article_title">{article.slug}</span>
                    <button className={like} onClick={addLike}>{article.favoritesCount}</button>
                </div>
                {tag}
                <p className="article_text">{article.title}</p>
            </div>
            <div className="article_user">
                <div className="article_user_info">
                    <h3 className="article_user_info__name">{article.author.username}</h3>
                    <span className="article_user_info__date">{newData}</span>
                </div>
                <img className="article_user_info__icon" src={article.author.image} onError={imgError} alt="user_icon"/>
            </div>
        </div>
        <div className="article_content">
            <span className="text_title">{article.description}</span>
            <p className="text">{article.body}</p>
        </div>
    </div>
}

const tegList = (arr) => {
    return arr.map((el, index) => {
        if (index < 3 && el.trim().length) {
            return <span className="article_tag" key={index}>{el.length < 30 ? el : el.slice(0, 30) + '...'}</span>
        }
    });
}

const mapStateToProps = (state) => {
    const articles = state.addArticlesReducer;
    return {
        articlesList: articles.articlesList,
        loading: articles.loading,
        error: articles.error,
    };
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(actions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Article);
