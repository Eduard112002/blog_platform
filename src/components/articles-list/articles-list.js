import React, { useEffect } from 'react';
import './articles-list.css';
import Articles from '../articles';
import { connect } from 'react-redux';
import PaginatioArticles from '../pagination';
import { Space, Spin, Alert } from 'antd';
import { useNavigate } from "react-router-dom";
import store from "../../store";
import { articleList } from "../server/server-reducer";

const ArticlesList = ({ articlesList, loading, error }) => {
    let navigate = useNavigate();
    const { dispatch } = store;
    useEffect(() => {
        dispatch(articleList())
        return navigate("/");
    }, []);
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
        return <Articles key={el.id} articles={el}/>
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