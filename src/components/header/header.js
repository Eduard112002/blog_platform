import React, {useEffect} from 'react';
import './header.css';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {bindActionCreators} from "redux";
import * as actions from "../../actions";

const Header = ({ addUserInfo, userInfo }) => {
    const img = userInfo?.image === 'undefined' ||  !userInfo?.image ? 'https://www.svgrepo.com/show/442075/avatar-default-symbolic.svg' : userInfo?.image;
    const exit = () => {
        addUserInfo({});
        sessionStorage.clear();
    }
    useEffect(() => {
        if (sessionStorage.getItem('token')) {
            addUserInfo({
                ...userInfo,
                token: sessionStorage.getItem('token'),
                username: sessionStorage.getItem('username'),
                image: sessionStorage.getItem('image'),
            })
        }
    }, [sessionStorage.getItem('token')]);
   if (userInfo?.username) {
        return (
            <div className="head">
                <Link to="/" className="head_link"><span className="head_title">Realworld Blog</span></Link>
                <div className="head_nav">
                    <Link to="/singIn" className="create_article"><span>Create article</span></Link>
                     <Link to="/profile" className="link_user">
                         <h3 className="head_user__name">{userInfo?.username}</h3>
                        <img className="head_user_icon" src={img} alt="user_icon"/>
                     </Link>
                    <button className="but_exit" onClick={exit}><Link to="/" className="create_article exit">Log Out</Link></button>
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