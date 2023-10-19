import React, {useEffect} from 'react';
import './header.css';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {bindActionCreators} from "redux";
import * as actions from "../../actions";

const Header = ({ addUserInfo, userInfo }) => {
    const exit = () => {
        addUserInfo({})
        localStorage.clear()
    }
    useEffect(() => {
        if (localStorage.getItem('token')) {
            addUserInfo({
                ...userInfo,
                token: localStorage.getItem('token'),
                username: localStorage.getItem('username'),
                image: null,
            })
        }
    }, [localStorage.getItem('token')]);
   if (localStorage.getItem('username')) {
        return (
            <div className="head">
                <Link to="/" className="head_link"><span className="head_title">Realworld Blog</span></Link>
                <div className="head_nav">
                    <Link to="/singIn" className="create_article"><span>Create article</span></Link>
                        <h3 className="head_user__name">{localStorage.getItem('username')}</h3>
                        <img className="head_user_icon" src={'https://www.svgrepo.com/show/442075/avatar-default-symbolic.svg'} alt="user_icon"/>
                    <Link to="/" className="create_article exit"><span onClick={exit}>Log Out</span></Link>
                </div>
            </div>
        )
   } else {
       return (
           <div className="head">
               <Link to="/" className="head_link"><span className="head_title">Realworld Blog</span></Link>
               <div>
                   <Link to="/singIn" className="head_but"><center className="entrance">Sign In</center></Link>
                   <Link to="/singUp" className="head_but"><center className="log-in">Sign Up</center></Link>
               </div>
           </div>
       );
   }
}

const mapStateToProps = (state) => {
    const articles = state.addArticlesReducer;
    return {
        userInfo: articles.userInfo,
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(actions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);