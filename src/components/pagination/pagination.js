import { Pagination } from 'antd';
import Server from '../server';
import { addPage } from '../../actions';
import { connect } from 'react-redux';
import store from '../../store';

const PaginatioArticles = ({ page }) => {
    const server = new Server();
    const { dispatch } = store;
    const onChange = (page) => {
        server.getArticleList(page);
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