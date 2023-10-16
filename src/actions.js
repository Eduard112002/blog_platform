export const addArticles = (payload) => ({type: 'ADD_ARTICLES', articlesArr: payload});

export const addArticlesError = () => ({type: "ADD_ERROR"});

export const addPage = (payload) => ({type: "ADD_PAGE", page: payload});

export const addUserName = (payload) => ({type: "ADD_USER_NAME", name: payload});

export const addEmail = (payload) => ({type: "ADD_EMAIL", email: payload});

export const addPassword = (payload) => ({type: "ADD_PASSWORD", password: payload});

export const addPasswordRepeat = (payload) => ({type: "ADD_PASSWORD_REPEAT", password: payload});
