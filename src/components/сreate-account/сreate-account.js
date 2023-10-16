import React, {useEffect, useState} from 'react';
import './сreate-account.css';
import { Link } from 'react-router-dom';
import { addUserName, addEmail, addPassword, addPasswordRepeat} from '../../actions';
import store from '../../store';

const CreateAccount = () => {
    const [password, setPassword] = useState('');
    const [passwordRepeat, setPasswordRepeat] = useState('');
    const [errorLength, setErrorLength] = useState(false);
    const [errorNotMatch, setErrorNotMatch] = useState(false);
    const { dispatch } = store;
    useEffect(() => {
        console.log('true');
    }, [password, passwordRepeat])

    const onSubmit = (e) => {
        e.preventDefault();
    }
    const onChangeName = (e) => {
        dispatch(addUserName(e.target.value));
    };
    const onChangeEmail = (e) => {
        dispatch(addEmail(e.target.value));
    };
    const onChangePassword = (e) => {
        dispatch(addPassword(e.target.value));
        setPassword(e.target.value)
    };
    const onChangePasswordRepeat = (e) => {
        dispatch(addPasswordRepeat(e.target.value));
        setPasswordRepeat(e.target.value);
    }
    const logIn = () => {
        if (password === passwordRepeat && password.length > 5 && password.length < 41) {
            console.log('good');
            setErrorNotMatch(false)
            setErrorLength(false)
        } else {
            console.log(password, passwordRepeat);
            if (password.length < 6) {

                setErrorLength(<span className="title_error">Your password needs to be at least 6 characters.</span>)
            } else {
                setErrorLength(false)
            }
            if (password !== passwordRepeat) {
                setErrorNotMatch(<span className="title_error">Passwords must match.</span>)
            } else {
                setErrorNotMatch(false)
            }
        }
    }
    return <div className="create">
        <form className="create_form" onSubmit={onSubmit}>
            <center className="create_title">Create new account</center>
            <div className="container_from">
                <label className="title_form">Username</label>
                <input className="input_form" type="text" placeholder="Username" onChange={onChangeName}/>
            </div>
            <div className="container_from">
                <label className="title_form">Email address</label>
                <input className="input_form" type="email" placeholder="Email address" onChange={onChangeEmail}/>
            </div>
            <div className="container_from">
                <label className="title_form">Password</label>
                <input
                    className="input_form"
                    type="password"
                    placeholder="Password"
                    style={errorLength !== false ? {border: '1px solid #ff000e'} : null}
                    onChange={onChangePassword}
                />
                {errorLength}
            </div>
            <div className="container_from">
                <label className="title_form">Repeat Password</label>
                <input
                    className="input_form"
                    type="password"
                    placeholder="Password"
                    style={errorNotMatch !== false ? {border: '1px solid #ff000e'} : null}
                    onChange={onChangePasswordRepeat}
                />
                {errorNotMatch}
            </div>
            <div className="container_form__checked">
                <input type="checkbox" className="form_checked"/>
                <label className="title_form checked">
                    I agree to the processing of my personal information
                </label>
            </div>
            <button className="create_log-in" onClick={logIn}>Create</button>
            <div>
                <center className="login-account">Already have an account?<Link to='/singIn' className="login-account_link"> Sign In.</Link></center>
            </div>
        </form>
    </div>
};

export default CreateAccount;
