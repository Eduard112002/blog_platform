import { Pagination } from 'antd';
import { addPage } from '../../actions';
import { connect } from 'react-redux';
import store from '../../store';
import { articleList } from "../server/server-reducer";

const PaginatioArticles = ({ page }) => {
    const { dispatch } = store;
    const onChange = (page) => {
        dispatch(articleList(page));
        dispatch(addPage(page));
    };
    return (
        <div className="pagination">
            <Pagination defaultCurrent={page} onChange={onChange} total={50} />
        </div>
    );
}

const mapStateToProps = (state) => {
    const articles = state.addArticlesReducer;
    return {
        page: articles.page,
    };
};

export default connect(mapStateToProps)(PaginatioArticles);