const defaultStateAccount = {
    email: '',
    password: '',
    error: '',
}

const addUserSignInReducer = (state = defaultStateAccount, action) => {
    switch(action.type) {
        case 'ADD_SIGN_IN_EMAIL':
            return {...state, email: action.email};
        case 'ADD_SIGN_IN_PASSWORD':
            return {...state, password: action.password};
        case 'ADD_ERROR':
            return {...state, error: action.error};
        default:
            return state;
    }
};

export default addUserSignInReducer;