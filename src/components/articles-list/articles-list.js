import './articles-list.css';
import Articles from '../articles';
import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PaginatioArticles from '../pagination';
import { Space, Spin, Alert } from 'antd';
import Server from '../server';

const ArticlesList = ({ articlesList, loading, error }) => {
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
    const articleEl = articlesList.map((el) => {
        return <Link className="link" key={el.id} onClick={() => server.getArticle(el.slug, sessionStorage.getItem('token'))}><Articles articles={el}/></Link>
    });
    return <div className="articles_list">
        {articleEl}
        <div className="paginatio">
            <PaginatioArticles />
        </div>
    </div>
}

const mapStateToProps = (state) => {
    const articles = state.addArticlesReducer;
    return {
        articlesList: articles.articlesList,
        loading: articles.loading,
        error: articles.error,
    };
};

export default connect(mapStateToProps)(ArticlesList);