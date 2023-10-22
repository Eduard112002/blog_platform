export const addArticles = (payload) => ({type: 'ADD_ARTICLES', articlesArr: payload});

export const addArticlesError = (payload) => ({type: "ADD_ERROR", error: payload});

export const addPage = (payload) => ({type: "ADD_PAGE", page: payload});

export const addUserName = (payload) => ({type: "ADD_USER_NAME", name: payload});

export const addEmail = (payload) => ({type: "ADD_EMAIL", email: payload});

export const addPassword = (payload) => ({type: "ADD_PASSWORD", password: payload});

export const addPasswordRepeat = (payload) => ({type: "ADD_PASSWORD_REPEAT", passwordRepeat: payload});

export const addErrorPassword = (payload) => ({type: "ADD_ERROR_PASSWORD", errorPassword: payload});

export const addErrorPasswordRepeat = (payload) => ({type: "ADD_ERROR_PASSWORD_REPEAT", errorPasswordRepeat: payload});

export const addTypePassword = (payload) => ({type: "ADD_TYPE_PASSWORD", typePassword: payload});

export const addTypePasswordRepeat = (payload) => ({type: "ADD_TYPE_PASSWORD_REPEAT", typePasswordRepeat: payload});

export const addChecked = (payload) => ({type: "ADD_CHECKED", checked: payload});

export const addSignInEmail = (payload) => ({type: "ADD_SIGN_IN_EMAIL", email: payload});

export const addSignInPassword = (payload) => ({type: "ADD_SIGN_IN_PASSWORD", password: payload});

export const addUserInfo = (payload) => ({type: "ADD_USER_INFO", userInfo: payload});

export const addEmailInvalid = (payload) => ({type: "EMAIL_INVALID", emailInvalid: payload});

export const addEyePassword = (payload) => ({type: "EYE_PASSWORD", eyePassword: payload});

export const addError = (payload) => ({type: "ADD_ERROR", error: payload});

export const addLoading = () => ({type: 'LOADING'});

export const addCreateTag = (payload) => ({type: "ADD_TAG", tag: payload});

export const addCreateTitle = (payload) => ({type: "ADD_TITLE", title: payload});

export const addCreateDescription = (payload) => ({type: "ADD_DESCRIPTION", description: payload});

export const addCreateBody = (payload) => ({type: "ADD_BODY", body: payload});

export const addArticle = (payload) => ({type: "ADD_ARTICLE", article: payload});
