import React from 'react';
import './сreate-account.css';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import Server from '../server';

const CreateAccount = ({ userName, email, password, passwordRepeat, errorPassword, errorPasswordRepeat,
                           addUserName, addEmail, addPassword, addPasswordRepeat, addErrorPassword, addErrorPasswordRepeat,
                           addTypePassword, addTypePasswordRepeat, typePassword, typePasswordRepeat, addChecked, checked}) => {
    const server = new Server();
    const error = errorPassword ? <span className="title_error">Your password needs to be at least 6 characters.</span> : null;
    const errorRepeat = errorPasswordRepeat ? <span className="title_error">Passwords must match</span> : null;
    const logIn = () => {
        const emailArr = email.split('');
        const newEmail = emailArr.some((el, index) => {
            if (el ==='@' && index !== emailArr.length - 1) {
                return true
            }
        });
         if (password.length < 6) {
             addErrorPassword(true);
         } else {
             addErrorPassword(false);
         }
         if (passwordRepeat !== password) {
             addErrorPasswordRepeat(true)
         } else {
             addErrorPasswordRepeat(false);
         }
         if (userName.length && newEmail && checked && passwordRepeat === password && password.length > 6 && password.length < 41) {
             server.registerNewUser(userName, email, password);
             addUserName('');
             addEmail('');
             addPassword('');
             addPasswordRepeat('');
             addChecked(false);
         }
    }
    return <div className="create">
        <form className="create_form" onSubmit={(e) => e.preventDefault()}>
            <center className="create_title">Create new account</center>
            <div className="container_from">
                <label className="title_form">Username</label>
                <input
                    className="input_form" type="text" placeholder="Username" value={userName} onChange={(e) => addUserName(e.target.value)} autoFocus required/>
            </div>
            <div className="container_from">
                <label className="title_form">Email address</label>
                <input className="input_form" type="email" placeholder="Email address" value={email} onChange={(e) => addEmail(e.target.value)} required/>
            </div>
            <div className="container_from">
                <label className="title_form">Password</label>
                <input
                    value={password}
                    className="input_form"
                    type={typePassword ? "password" : "text"}
                    placeholder="Password"
                    style={errorPassword !== false ? {border: '1px solid #ff000e'} : null}
                    onChange={(e) => addPassword(e.target.value)}
                    required
                />
                <button
                    className="eye_password"
                    type={typePassword ? "password" : "text"}
                    style={errorPassword ? {top: '45%'} : {top: '55%'}}
                    onClick={() => addTypePassword(!typePassword)}
                ></button>
                {error}
            </div>
            <div className="container_from password">
                <label className="title_form">Repeat Password</label>
                <input
                    value={passwordRepeat}
                    className="input_form"
                    type={typePasswordRepeat ? "password" : "text"}
                    placeholder="Password"
                    style={errorPasswordRepeat !== false ? {border: '1px solid #ff000e'} : null}
                    onChange={(e) => addPasswordRepeat(e.target.value)}
                    required
                />
                <button
                    className="eye_password"
                    type={typePasswordRepeat ? "password" : "text"}
                    style={errorPasswordRepeat ? {top: '45%'} : {top: '55%'}}
                    onClick={() => addTypePasswordRepeat(!typePasswordRepeat)}
                ></button>
                {errorRepeat}
            </div>
            <div className="container_form__checked">
                <input type="checkbox" className="form_checked" required onChange={(e) => addChecked(e.target.checked)} checked={checked}/>
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

const mapStateToProps = (state) => {
    const newAccount = state.addNewAccountReducer;
    return {
        userName: newAccount.userName,
        email: newAccount.email,
        password: newAccount.password,
        passwordRepeat: newAccount.passwordRepeat,
        errorPassword: newAccount.errorPassword,
        errorPasswordRepeat: newAccount.errorPasswordRepeat,
        typePassword: newAccount.typePassword,
        typePasswordRepeat: newAccount.typePasswordRepeat,
        checked: newAccount.checked
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(actions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateAccount);
