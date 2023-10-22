import React from 'react';
import './article.css';
import { format } from 'date-fns';
import { connect } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { Alert, Space, Spin, Popconfirm, Button } from 'antd';
import { bindActionCreators } from 'redux';
import * as actions from '../../actions';
import Markdown from 'react-markdown';
import Server from '../server';

const Article = ({ article, loading, error, addArticle, addCreateTitle, addCreateDescription, addCreateBody, articlesList }) => {
    const server = new Server();
    const { id } = useParams();
    const addEditText = () => {
        addCreateTitle(article.title)
        addCreateDescription(article.description)
        addCreateBody(article.body)
    }
    const confirmYes = () => {
        server.deleteArticle(id, sessionStorage.getItem('token'))
    };
    const edit = article?.author?.username === sessionStorage.getItem("username") ? (<div className="article_edit">
        <Popconfirm
            title="Delete the article"
            description="Are you sure you want to delete this article?"
            onConfirm={confirmYes}
            okText="Yes"
            cancelText="No"
            placement={'rightTop'}
        >
            <Button className="delete_article but_article" danger>Delete</Button>
        </Popconfirm>
        <Link className="edit but_article" to={`/articles/${article.slug}/edit`} onClick={addEditText}><center>Edit</center></Link>
    </div>) : null;
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
        addArticle({...addArticle, author:{ ...addArticle.author, image: 'https://www.svgrepo.com/show/442075/avatar-default-symbolic.svg'}})
        console.clear();
    }
    const addLike = () => {
        const token = sessionStorage.getItem('token')
        if (token) {
            article.favorited ? server.unFavoriteArticle(token, article.slug, articlesList, true) :
                server.likeArticle(token, article.slug, articlesList, true);
        }
    }
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
                <span className="article_text"><Markdown>{article.title}</Markdown></span>
            </div>
            <div>
                <div className="article_user">
                    <div className="article_user_info">
                        <h3 className="article_user_info__name">{article.author.username}</h3>
                        <span className="article_user_info__date">{newData}</span>
                    </div>
                    <img className="article_user_info__icon" src={article.author.image} onError={imgError} alt="user_icon"/>
                </div>
                { edit }
            </div>
        </div>
        <div className="article_content">
            <span className="text_title"><Markdown>{article.description}</Markdown></span>
            <span ><Markdown className="text">{article.body}</Markdown></span>
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
        loading: articles.loading,
        error: articles.error,
        article: articles.article,
        articlesList: articles.articlesList,
    };
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(actions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Article);
