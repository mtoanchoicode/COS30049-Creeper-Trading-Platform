import React from "react";
import "./404NotFound.css";
import { ArrowLeftOutlined } from "@ant-design/icons";

import { Link } from "react-router-dom";

const NotFound = ({ amount, usdValue }) => {
  return (
    <div className="notFound-container">
      <img src="../src/assets/404 Image.svg"></img>
      <h1>404 NOT FOUND</h1>
      <Link to={"/"}>
        <ArrowLeftOutlined className="notFound-backIcon" /> Back to Home
      </Link>
    </div>
  );
};

export default NotFound;
