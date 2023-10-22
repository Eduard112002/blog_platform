const defaultStateCreateArticle= {
    tag: '',
    title: '',
    description: '',
    body: '',
}

const createArticleReducer = (state = defaultStateCreateArticle, action) => {
    switch(action.type) {
        case 'ADD_TAG':
            return {...state, tag: action.tag};
        case "ADD_TITLE":
            return {...state, title: action.title};
        case "ADD_DESCRIPTION":
            return {...state, description: action.description}
        case "ADD_BODY":
            return {...state, body: action.body}
        default:
            return state;
    }
};

export default createArticleReducer;