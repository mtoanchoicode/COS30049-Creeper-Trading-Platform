import React from "react";
import { Avatar } from "antd";
import { InstagramOutlined, ChromeOutlined } from "@ant-design/icons";
import "./ProfileHeaderInfo.css";

const HeaderInfo = () => {
  const data = {
    username: "mtoannn",
    user_id: "12345678",
    email: "truongleminh.toan4c@gmail.com",
    avatar: "https://m.media-amazon.com/images/I/51y8GUVKJoL.jpg",
  };
  return (
    <div className="profileHeader-container">
      <h1 className="profileHeader-greeting">Hi {data.username}!</h1>
      <div className="profileHeader-card">
        <div className="profileHeader-info">
          <Avatar size={64} src={data.avatar} />
          <div style={{ marginLeft: 10 }}>
            <p className="profileHeader-username">{data.username}</p>

            <InstagramOutlined style={{ fontSize: 24, marginRight: 15 }} />
            <ChromeOutlined style={{ fontSize: 24 }} />
          </div>
        </div>
        <div className="profileHeader-contact">
          <p>
            <b>ID:</b> {data.user_id}
          </p>
          <p>
            <b>Email:</b> {data.email}
          </p>
        </div>
      </div>
    </div>
  );
};

export default HeaderInfo;
