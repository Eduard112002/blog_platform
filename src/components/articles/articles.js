import React from 'react';
import './articles.css';

const Articles = ({ article }) => {
    console.log(article);
   return <div className='article'>
       <div className="article_content">
           <div>
               <span className="article_title">Some article title</span>
               <span className="article_like">12</span>
           </div>
           <span className="article_tag">Tag1</span>
           <p className="article_text">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
               aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris  nisi ut aliquip ex ea commodo consequat.
           </p>
       </div>
       <div className="article_user">
           <div className="article_user_info">
               <h3 className="article_user_info__name">John Doe</h3>
               <span className="article_user_info__date">March 5, 2020 </span>
           </div>
           <span className="article_user_info__icon"></span>
       </div>
   </div>
}

export default Articles;