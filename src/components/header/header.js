import React from 'react';
import './header.css';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <div className="head">
         <Link to="/" className="head_link"><span className="head_title">Realworld Blog</span></Link>
            <div>
              <Link to="/singIn" className="head_but"><center className="entrance">Sign In</center></Link>
              <Link to="/singUp" className="head_but "><center className="log-in">Sign Up</center></Link>
          </div>
        </div>
    );
}

export default Header;