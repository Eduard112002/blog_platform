import React, {useEffect, useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './sign-in-account.css';
import { bindActionCreators } from 'redux';
import * as actions from '../../actions';
import { connect, useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import {userSignIn} from '../server/server-reducer';

const SignInAccount = ({ email, password, addSignInEmail, addSignInPassword, addEyePassword, eyePassword, emailInvalid, ok, changeOk }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [disabled, serDisabled] = useState(false);
    const error = emailInvalid ? <span className="title_error">invalid email or password</span> : null;
    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            email: email,
            password: password,
        }
    });
    const signIn = (data) => {
        serDisabled(true);
        dispatch(userSignIn(data));
        addEyePassword(true);
    }
    useEffect(() => {
        if (ok) {
            changeOk(false);
            navigate('/');
        }
        if (email.length || password.length) {
            serDisabled(false);
        }
    }, [ok, email, password]);
    return <div className="sign-in">
        <form className="sign-in_form" onSubmit={(e) => e.preventDefault()}>
            <center className="sign-in_title">Sign In</center>
            <div className="sign-in_container__from">
                <label className="sign-in_title__form">Email address</label>
                <input
                    className="sign-in_input__form"
                    type="email"
                    placeholder="Email address"
                    {...register("email",{
                        pattern: {
                            value: /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu,
                            message: 'Invalid email address.'
                        },
                        value: email,
                    })}
                    onChange={(e) => addSignInEmail(e.target.value)}
                    autoFocus
                    required
                />
                <span className="title_error">{errors.email?.message}</span>
            </div>
            <div className="sign-in_container__from">
                <label className="sign-in_title__form">Password</label>
                <input
                    className="sign-in_input__form password"
                    type={eyePassword ? "password" : "text"}
                    placeholder="Password"
                    {...register("password", {required: true,
                        minLength:{
                            value: 6,
                            message: 'Your password needs to be at least 6 characters.',
                        }, maxLength: {
                            value: 40,
                            message: 'Your password must contain no more than 40 characters.'
                        },
                        value: password,
                      })}
                    onChange={(e) => addSignInPassword(e.target.value)}
                    required
                />
                <button
                    className="sign-in_eye_password"
                    type={eyePassword ? "password" : "text"}
                    onClick={() => addEyePassword(!eyePassword)}
                    style={errors.password?.message ? {top: '37%'} : {top: '45%'}}
                ></button>
                <span className="title_error">{errors.password?.message}</span>
            </div>
            {error}
                <button
                    disabled={disabled}
                    className="sign-in_but"
                    onClick={handleSubmit((data) => signIn(data))}
                    style={error ? {marginTop: '20px'} : null}
                >
                        Login
                </button>
            <div>
                <center className="login-account">Don’t have an account?<Link to='/singUp' className="login-account_link"> Sign Up.</Link></center>
            </div>
        </form>
    </div>
}

const mapStateToProps = (state) => {
    const signIn = state.addUserSignInReducer;
    const newAccount = state.addNewAccountReducer;
    const articles = state.addArticlesReducer;
    return {
        email: signIn.email,
        password: signIn.password,
        error: articles.error,
        userInfo: articles.userInfo,
        emailInvalid: articles.emailInvalid,
        eyePassword: articles.eyePassword,
        ok: newAccount.ok,
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(actions, dispatch)
}


export default connect(mapStateToProps, mapDispatchToProps)(SignInAccount);