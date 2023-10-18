import React, { useEffect } from 'react';
import { Link, useNavigate  } from 'react-router-dom';
import './sign-in-account.css';
import Server from '../server';
import {bindActionCreators} from "redux";
import * as actions from "../../actions";
import { connect } from 'react-redux';

const SignInAccount = ({ email, password, addSignInEmail, addSignInPassword, emailInvalid, addEmailInvalid, token, addEyePassword, eyePassword }) => {
    const server = new Server();
    const errors = emailInvalid ? <span className="title_error">Email or password is invalid.</span> : null;
    let navigate = useNavigate();
    useEffect(() => {
      if (token) {
          addSignInEmail('')
          addSignInPassword('')
      }
    }, [token])
    const signIn = () => {
        const emailArr = email.split('');
        emailArr.some((el, index) => {
            if (el ==='@' && index !== emailArr.length - 1) {
                addEmailInvalid(true)
            }
        });
        if (emailInvalid && password.length) {
            server.userSignIn(email, password);
            addEyePassword(true)
            return navigate("/");
        } else {
            addEmailInvalid(true)
        }
    }
    return <div className="sign-in">
        <form className="sign-in_form" onSubmit={(e) => e.preventDefault()}>
            <center className="sign-in_title">Sign In</center>
            <div className="sign-in_container__from">
                <label className="sign-in_title__form">Email address</label>
                <input
                    className="sign-in_input__form"
                    type="email"
                    placeholder="Email address"
                    value={email}
                    onChange={(e) => addSignInEmail(e.target.value)}
                    autoFocus
                    required
                />
            </div>
            <div className="sign-in_container__from">
                <label className="sign-in_title__form">Password</label>
                <input
                    className="sign-in_input__form password"
                    type={eyePassword ? "password" : "text"}
                    placeholder="Password"
                    value={password} onChange={(e) => addSignInPassword(e.target.value)}
                    required
                />
                <button
                    className="sign-in_eye_password"
                    type={eyePassword ? "password" : "text"}
                    onClick={() => addEyePassword(!eyePassword)}
                    style={emailInvalid ? {top: '38%'} : {top: '45%'}}
                ></button>
                {errors}
            </div>
                <button className="sign-in_but" onClick={signIn}>Login</button>
            <div>
                <center className="login-account">Don’t have an account?<Link to='/singUp' className="login-account_link"> Sign Up.</Link></center>
            </div>
        </form>
    </div>
}

const mapStateToProps = (state) => {
    const signIn = state.addUserSignInReducer;
    const articles = state.addArticlesReducer;
    return {
        email: signIn.email,
        password: signIn.password,
        error: articles.error,
        token: articles.token,
        emailInvalid: articles.emailInvalid,
        eyePassword: articles.eyePassword,
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(actions, dispatch)
}


export default connect(mapStateToProps, mapDispatchToProps)(SignInAccount);