import './articles-list.css';
import Articles from '../articles';
import React from "react";
import { Link } from "react-router-dom";
import PaginatioArticles from "../pagination";

const ArticlesList = ({ articlesList }) => {
   const articleEl = articlesList.map((el, index) => {
        return <Articles article={el} key={index}/>
   })
   return <div className="articles_list">
       <Link to="/article" className="link">{ articleEl }</Link>
       <div className="paginatio">
           <PaginatioArticles />
       </div>
   </div>
}

export default ArticlesList;