import React from "react";
import { Avatar } from "antd";
import { InstagramOutlined, ChromeOutlined } from "@ant-design/icons";
import "./ProfileHeaderInfo.css";
import { useUser } from "../../../contexts/UserContext";

const HeaderInfo = () => {
  const { userData } = useUser();
  return (
    <div className="profileHeader-container">
      <h1 className="profileHeader-greeting">Hi {userData.username}!</h1>
      <div className="profileHeader-card">
        <div className="profileHeader-info">
          <Avatar size={64} src={userData.avatar} />
          <div style={{ marginLeft: 10 }}>
            <p className="profileHeader-username">{userData.username}</p>

            <InstagramOutlined style={{ fontSize: 24, marginRight: 15 }} />
            <ChromeOutlined style={{ fontSize: 24 }} />
          </div>
        </div>
        <div className="profileHeader-contact">
          <p>
            <b>ID:</b> {userData.user_id}
          </p>
          <p>
            <b>Email:</b> {userData.email}
          </p>
        </div>
      </div>
    </div>
  );
};

export default HeaderInfo;
