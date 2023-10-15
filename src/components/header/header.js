import React from 'react';
import './header.css';

const Header = () => {
    return (
        <div className="head">
          <span className="head_title">Realworld Blog</span>
          <div>
              <button className="head_but entrance">Sign In</button>
              <button className="head_but log-in">Sign Up</button>
          </div>
        </div>
    );
}

export default Header;