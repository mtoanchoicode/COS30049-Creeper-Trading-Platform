import React from "react";
import "./SendContainer.css";
import { Input } from "antd";

const SendContainer = () => {
  return (
    <div className="send-container">
      <div className="send-top">
        <span>You're sending</span>
      </div>
      <div className="send-bottom">
        <div className="send-currency">
          <Input />
        </div>
        <div className="send-currency">
            <div></div>
            <img src="" alt="" />
        </div>
      </div>
    </div>
  );
};

export default SendContainer;
