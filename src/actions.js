export const addArticles = (payload) => ({type: 'ADD_ARTICLES', articlesArr: payload});

export const addArticlesError = () => ({type: "ADD_ERROR"});

export const addPage = (payload) => ({type: "ADD_PAGE", page: payload});
