import React from 'react';
import CreateNewArticle from '../сreate-new-article';
import CreateAccount from '../сreate-account';

const PrivateRouter = () => {
    const auth = sessionStorage.getItem('token');
    return auth ? <CreateNewArticle /> : <CreateAccount />;
}

export default PrivateRouter;