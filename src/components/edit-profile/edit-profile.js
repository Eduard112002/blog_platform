import React, { useEffect, useState } from 'react';
import './edit-profile.css';
import { bindActionCreators } from 'redux';
import { connect, useDispatch } from 'react-redux';
import * as actions from '../../actions';
import { useForm } from "react-hook-form";
import { updateCurrentUser } from "../server/server-reducer";
import { useNavigate } from "react-router-dom";

const EditProfile = ({ email, password, addUserName, addEmail, addPassword, addTypePassword,
                         typePassword, userInfo, error, ok, changeOk, addPage }) => {
    const [disabled, serDisabled] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const errorInvalid = error ? <span className="title_error">{error}</span> : null;
    const userInfoOld = {
        userName: sessionStorage.getItem('username'),
        email: sessionStorage.getItem('email'),
        image: sessionStorage.getItem('image'),
    };
    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            userName: `${userInfoOld.userName}`,
            email: `${userInfoOld.email}`,
            newPassword: '',
            avatarImage: `${userInfoOld.image}`,
        }
    });
    const save = (data) => {
        serDisabled(true);
        const token = sessionStorage.getItem('token');
       dispatch(updateCurrentUser({...data, token, userInfo}));
    }
    useEffect(() => {
        if (ok) {
            changeOk(false);
            navigate('/');
            addPage(1);
        }
    }, [ok]);
    return <div className="create">
        <form className="create_form create_edit" onSubmit={(e) => e.preventDefault()}>
            <center className="create_title">Create new account</center>
            <div className="container_from">
                <label className="title_form">Username</label>
                <input
                    className="input_form"
                    {...register("userName", {required: {
                            value: true,
                            message: 'The input field must be filled in.',
                        },
                    minLength: {
                        value: 3,
                        message: 'Your name needs to be at least 3 characters.'
                    }})}
                    type="text"
                    placeholder="Username"
                    onChange={(e) => addUserName(e.target.value)}
                    required/>
                <span className="title_error">{errors.userName?.message}</span>
            </div>
            <div className="container_from">
                <label className="title_form">Email address</label>
                <input
                    className="input_form"
                    type="email"
                    placeholder="Email address"
                    onChange={(e) => addEmail(e.target.value)}
                    {...register("email",{
                        required: {
                            value: true,
                            message: 'The input field must be filled in.',
                        },
                        pattern: {
                            value: /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu,
                            message: 'Invalid email address.'
                        },
                        value: email,
                    })}
                    required/>
                <span className="title_error">{errors.email?.message}</span>
            </div>
            <div className="container_from">
                <label className="title_form">New password</label>
                <input
                    className="input_form"
                    type={typePassword ? "password" : "text"}
                    placeholder="New password"
                    style={errors.newPassword?.message ? {border: '1px solid #ff000e'} : null}
                    onChange={(e) => addPassword(e.target.value)}
                    {...register("newPassword", {required: {
                            value: true,
                            message: 'The input field must be filled in.',
                        }, minLength:{
                            value: 6,
                            message: 'Your password needs to be at least 6 characters.',
                        }, maxLength: {
                            value: 40,
                            message: 'Your password must contain no more than 40 characters.'
                        },
                        value: password,
                    })}
                    required
                    autoFocus
                />
                <button
                    className="eye_password"
                    type={typePassword ? "password" : "text"}
                    style={errors.newPassword?.message ? {top: '45%'} : {top: '55%'}}
                    onClick={() => addTypePassword(!typePassword)}
                ></button>
                <span className="title_error">{errors.newPassword?.message}</span>
            </div>
            <div className="container_from password">
                <label className="title_form">Avatar image (url)</label>
                <input
                    className="input_form"
                    type="url"
                    placeholder="Avatar image"
                    onChange={(e) => console.log(e.target.value)}
                    {...register("avatarImage",{
                        required: {
                            value: true,
                            message: 'The input field must be filled in.',
                        },
                        pattern: {
                            value: /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g,
                            message: 'Invalid URL.'
                        },
                    })}
                    required
                />
                <span className="title_error">{errors.avatarImage?.message}</span>
                { errorInvalid }
            </div>
            <button disabled={disabled} className="create_log-in" onSubmit={(e) => e.defaultPrevented()} onClick={handleSubmit((data) => save(data))}>Create</button>
        </form>
    </div>
};

const mapStateToProps = (state) => {
    const newAccount = state.addNewAccountReducer;
    const articles = state.addArticlesReducer;
    const singIn = state.addUserSignInReducer;
    return {
        userName: newAccount.userName,
        email: newAccount.email,
        password: newAccount.password,
        typePassword: newAccount.typePassword,
        typePasswordRepeat: newAccount.typePasswordRepeat,
        userInfo: articles.userInfo,
        error: singIn.error,
        ok: newAccount.ok,
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(actions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(EditProfile);