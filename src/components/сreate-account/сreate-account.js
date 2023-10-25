import React, {useEffect} from 'react';
import './сreate-account.css';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import {connect, useDispatch} from 'react-redux';
import * as actions from '../../actions';
import { registerNewUser } from '../server/server-reducer';
import { useForm } from 'react-hook-form';
import { useNavigate } from "react-router-dom";

const CreateAccount = ({ userName, email, password, passwordRepeat, addUserName, addEmail, addPassword, addPasswordRepeat,
                           addTypePassword, addTypePasswordRepeat, typePassword, typePasswordRepeat, addChecked, checked, error, ok, changeOk}) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const errorInvalid = error ? <span className="invalid_error">{error}</span> : null;
    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            userName: ' ',
            email: '',
            password: '',
            passwordRepeat: '',
            checkbox: false,
        }
    });
    const logIn = (data) => {
        dispatch(registerNewUser(data));
    }

    useEffect(() => {
        if (ok) {
            changeOk(false);
            navigate('/');
        }
    }, [ok])
    return <div className="create">
        <form className="create_form" onSubmit={(e) => e.preventDefault()}>
            <center className="create_title">Create new account</center>
            <div className="container_from">
                <label className="title_form">Username</label>
                <input
                    className="input_form"
                    type="text"
                    {...register("userName", {required: {
                        value: true,
                        message: 'The input field must be filled in.',
                        }, minLength: {
                        value: 3,
                        message: 'Your name needs to be at least 3 characters.'
                        },
                    maxLength: {
                        value: 20,
                        message: 'Your name must contain no more than 20 characters.'
                    }})}
                    placeholder="Username"
                    value={userName}
                    onChange={(e) => addUserName(e.target.value)}
                    style={errors.userName?.message ? {border: '1px solid #ff000e'} : null}
                    autoFocus
                />
                <span className="title_error">{errors.userName?.message}</span>
            </div>
            <div className="container_from">
                <label className="title_form">Email address</label>
                <input
                    className="input_form"
                    type="email"
                    {...register("email",{
                        required: {
                            value: true,
                            message: 'The input field must be filled in.',
                        },
                        pattern: {
                            value: /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu,
                            message: 'Invalid email address.'
                        },
                    })}
                    placeholder="Email address"
                    value={email}
                    style={errors.email?.message ? {border: '1px solid #ff000e'} : null}
                    onChange={(e) => addEmail(e.target.value)}
                    required/>
                <span className="title_error">{errors.email?.message}</span>
            </div>
            <div className="container_from">
                <label className="title_form">Password</label>
                <input
                    value={password}
                    className="input_form"
                    type={typePassword ? "password" : "text"}
                    {...register("password", {required: {
                            value: true,
                            message: 'The input field must be filled in.',
                        }, minLength:{
                       value: 6,
                       message: 'Your password needs to be at least 6 characters.',
                        }, maxLength: {
                            value: 40,
                            message: 'Your password must contain no more than 40 characters.'
                        }})}
                    placeholder="Password"
                    style={errors.password?.message ? {border: '1px solid #ff000e'} : null}
                    onChange={(e) => addPassword(e.target.value)}
                    required
                />
                <button
                    className="eye_password"
                    type={typePassword ? "password" : "text"}
                    style={errors.password?.message ? {top: '43%'} : {top: '55%'}}
                    onClick={() => addTypePassword(!typePassword)}
                ></button>
                <span className="title_error">{errors.password?.message}</span>
            </div>
            <div className="container_from password">
                <label className="title_form">Repeat Password</label>
                <input
                    value={passwordRepeat}
                    className="input_form"
                    type={typePasswordRepeat ? "password" : "text"}
                    {...register("passwordRepeat", {required: {
                            value: true,
                            message: 'The input field must be filled in.',
                        },
                        validate: (value) => {
                        if (value === password) {
                            return true;
                        } else {
                            return 'Passwords must match';
                        }
                        },
                    }
                    )}
                    placeholder="Password"
                    style={errors.passwordRepeat?.message ? {border: '1px solid #ff000e'} : null}
                    onChange={(e) => addPasswordRepeat(e.target.value)}
                    required
                />
                <button
                    className="eye_password"
                    type={typePasswordRepeat ? "password" : "text"}
                    style={errors.passwordRepeat?.message ? {top: '43%'} : {top: '55%'}}
                    onClick={() => addTypePasswordRepeat(!typePasswordRepeat)}
                ></button>
                <span className="title_error">{errors.passwordRepeat?.message}</span>
            </div>
            <div className="container_form__checked">
                <input
                    type="checkbox"
                    className="form_checked"
                    id="checkbox"
                    required
                    checked={checked}
                    {...register("checkbox", {required: {
                        value: true,
                        message: 'the checkbox should be checked',
                        },
                        validate: (value) => value === checked,
                        onChange: (e) => addChecked(e.target.checked),
                    })}
                />
                <label htmlFor="checkbox" className="title_form checked" style={errors.checkbox?.message ? {color: '#ff000e'} : null}>
                    I agree to the processing of my personal information
                </label>
            </div>
            { errorInvalid }
            <button className="create_log-in" onClick={handleSubmit((data) => logIn(data))}>Create</button>
            <div>
                <center className="login-account">Already have an account?<Link to='/singIn' className="login-account_link"> Sign In.</Link></center>
            </div>
        </form>
    </div>
};

const mapStateToProps = (state) => {
    const newAccount = state.addNewAccountReducer;
    const singIn = state.addUserSignInReducer;
    return {
        userName: newAccount.userName,
        email: newAccount.email,
        password: newAccount.password,
        passwordRepeat: newAccount.passwordRepeat,
        errorPassword: newAccount.errorPassword,
        errorPasswordRepeat: newAccount.errorPasswordRepeat,
        typePassword: newAccount.typePassword,
        typePasswordRepeat: newAccount.typePasswordRepeat,
        checked: newAccount.checked,
        error: singIn.error,
        ok: newAccount.ok,
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(actions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateAccount);
