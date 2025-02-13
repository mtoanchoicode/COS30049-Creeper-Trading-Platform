import React from "react";
import { Outlet } from "react-router-dom";
import NewsBlock from "../../components/News-Page/NewsBlock/NewsBlock";

const NewsPage = () => {
  return (
    <div className="NewsPage">
      <NewsBlock></NewsBlock>
      <Outlet/>
   </div>
  )
};

export default NewsPage;