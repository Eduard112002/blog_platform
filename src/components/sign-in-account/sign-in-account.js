import React from 'react';
import {Link} from "react-router-dom";
import './sign-in-account.css';

const SignInAccount = () => {
    const onSubmit = (e) => {
        e.preventDefault();
    }
    return <div className="sign-in">
        <form className="sign-in_form" onSubmit={onSubmit}>
            <center className="sign-in_title">Sign In</center>
            <div className="sign-in_container__from">
                <label className="sign-in_title__form">Email address</label>
                <input className="sign-in_input__form" type="email" placeholder="Email address"/>
            </div>
            <div className="sign-in_container__from">
                <label className="sign-in_title__form">Password</label>
                <input className="sign-in_input__form" type="password" placeholder="Password"/>
            </div>
            <button className="sign-in_but">Create</button>
            <div>
                <center className="login-account">Don’t have an account?<Link to='/singUp' className="login-account_link"> Sign Up.</Link></center>
            </div>
        </form>
    </div>
}

export default SignInAccount;