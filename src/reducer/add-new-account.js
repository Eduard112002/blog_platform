const defaultStateNewAccount = {
    userName: ' ',
    email: '',
    password: '',
    passwordRepeat: '',
    typePassword: true,
    typePasswordRepeat: true,
    checked: false,
    ok: false,
    articleOk: false,
}

const addNewAccountReducer = (state = defaultStateNewAccount, action) => {
    switch(action.type) {
        case 'ADD_USER_NAME':
         return {...state, userName: action.name};
        case 'ADD_EMAIL':
            return {...state, email: action.email};
        case 'ADD_PASSWORD':
            return {...state, password: action.password};
        case 'ADD_PASSWORD_REPEAT':
            return {...state, passwordRepeat: action.passwordRepeat};
        case 'ADD_TYPE_PASSWORD':
            return {...state, typePassword: action.typePassword};
        case 'ADD_TYPE_PASSWORD_REPEAT':
            return {...state, typePasswordRepeat: action.typePasswordRepeat};
        case 'ADD_CHECKED':
            return {...state, checked: action.checked};
        case 'CHANGE_OK':
            return {...state, ok: action.ok};
        case 'CHANGE_ARTICLE_OK':
            return {...state, articleOk: action.articleOk};
        default:
            return state;
    }
};

export default addNewAccountReducer;