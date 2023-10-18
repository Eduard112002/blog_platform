const defaultStateArticles= {
    articlesList: [],
    loading: true,
    error: false,
    page: 1,
    token:'',
    eyePassword: true,
    emailInvalid: false,
    userInfo: {},
}

const addArticlesReducer = (state = defaultStateArticles, action) => {
    switch(action.type) {
        case 'ADD_ARTICLES':
            return {...state, loading: false, articlesList: [...action.articlesArr]};
        case "ADD_ERROR":
            return {...state, loading: false, error: action.error};
        case "ADD_PAGE":
            return {...state, page: action.page}
        case "ADD_TOKEN":
            return {...state, token: action.token}
        case "ADD_USER_INFO":
            return {...state, userInfo: action.userInfo}
        case "EMAIL_INVALID":
            return {...state, emailInvalid: action.emailInvalid}
        case "EYE_PASSWORD":
            return {...state, eyePassword: action.eyePassword}
        default:
            return state;
    }
};

export default addArticlesReducer;