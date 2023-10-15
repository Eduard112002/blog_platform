import React from 'react';
import './article.css';
import { format } from 'date-fns';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Alert, Space, Spin } from "antd";

const Article = ({ articlesList, loading, error }) => {
    const { id } = useParams();
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
    const article = articlesList.find((el) => el.id === id);
    const tag = tegList(article.tagList);
    const [year, month, day] = article.createdAt.slice(0, 10).split('-');
    const newData = format(new Date(year, month - 1, day), 'LLLL dd, yyyy');
    return <div className="article_list">
        <div className="article">
            <div className="article_header">
                <div>
                    <span className="article_title">{article.slug}</span>
                    <span className="article_like">{article.favoritesCount}</span>
                </div>
                {tag}
                <p className="article_text">{article.title}</p>
            </div>
            <div className="article_user">
                <div className="article_user_info">
                    <h3 className="article_user_info__name">{article.author.username}</h3>
                    <span className="article_user_info__date">{newData}</span>
                </div>
                <img className="article_user_info__icon" src={article.author.image} alt="author_icon"/>
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
        if (index < 3) {
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

export default connect(mapStateToProps)(Article);
