const defaultStateArticles= {
    articlesList: [],
    loading: true,
    error: false,
    page: 1,
}

const addArticlesReducer = (state = defaultStateArticles, action) => {
    switch(action.type) {
        case 'ADD_ARTICLES':
            return {...state, loading: false, articlesList: [...action.articlesArr]};
        case "ADD_ERROR":
            return {...state, loading: false, error: true};
        case "ADD_PAGE":
            return {...state, page: action.page}
        default:
            return state;
    }
};

export default addArticlesReducer;