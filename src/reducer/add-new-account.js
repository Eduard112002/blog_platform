const defaultStateNewAccount = {
    userName: '',
    email: '',
    password: '',
    errorPassword: false,
    errorPasswordRepeat: false,
}

const addNewAccountReducer = (state = defaultStateNewAccount, action) => {
    switch(action.type) {
        case 'ADD_USER_NAME':
            console.log(action.name, 'name')
         return {...state, userName: action.name};
        case 'ADD_EMAIL':
            console.log(action.email, 'email')
            return {...state, email: action.email};
        case 'ADD_PASSWORD':
            console.log(action.password, 'password');
            return state;
        case 'ADD_PASSWORD_REPEAT':
            console.log(action.password, 'PasswordRepeat');
            return state;
        default:
            return state;
    }
};

export default addNewAccountReducer;