const defaultStateArticles= {
    articlesList: [],
    loading: true,
    error: false,
    page: 1,
    eyePassword: true,
    emailInvalid: false,
    userInfo: null,
    article: {},
}

const addArticlesReducer = (state = defaultStateArticles, action) => {
    switch(action.type) {
        case 'ADD_ARTICLES':
            return {...state, loading: false, articlesList: action.articlesArr};
        case "ADD_ERROR":
            return {...state, loading: false, error: action.error};
        case "ADD_PAGE":
            return {...state, page: action.page}
        case "ADD_USER_INFO":
            return {...state, userInfo: action.userInfo}
        case "EMAIL_INVALID":
            return {...state, emailInvalid: action.emailInvalid}
        case "EYE_PASSWORD":
            return {...state, eyePassword: action.eyePassword}
        case "LOADING":
            return {...state, loading: true}
        case "ADD_ARTICLE":
            return {...state, loading: false, article: action.article}
        default:
            return state;
    }
};

export default addArticlesReducer;