import React from 'react';
import './header.css';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <div className="head">
         <Link to="/" className="head_link"><span className="head_title">Realworld Blog</span></Link>
            <div>
              <button className="head_but entrance">Sign In</button>
              <button className="head_but log-in">Sign Up</button>
          </div>
        </div>
    );
}

export default Header;