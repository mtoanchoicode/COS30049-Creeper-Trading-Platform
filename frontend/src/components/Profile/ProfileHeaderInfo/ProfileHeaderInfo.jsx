import React, { useContext } from "react";
import { Avatar } from "antd";
import { InstagramOutlined, ChromeOutlined } from "@ant-design/icons";
import "./ProfileHeaderInfo.css";
import { useUser } from "../../../contexts/UserContext";
import { AuthContext } from "../../../contexts/AuthContext";
import { Link } from "react-router-dom";

const HeaderInfo = () => {
  const { auth, setAuth } = useContext(AuthContext);
  const { userData } = useUser();
  return (
    <div className="profileHeader-container">
      {auth.isAuthenticated ? (
        <h1 className="profileHeader-greeting">Hi {auth?.user?.name ?? ""}!</h1>
      ) : (
        <h1 className="profileHeader-greeting">Have a nice day!</h1>
      )}
      {auth.isAuthenticated ? (
        <div className="profileHeader-card">
          <div className="profileHeader-info">
            <Avatar size={64} src={userData.avatar} />
            <div style={{ marginLeft: 10 }}>
              <p className="profileHeader-username">{auth?.user?.name ?? ""}</p>
            </div>
          </div>
          <div className="profileHeader-contact">
            <p>
              <b>ID:</b> {auth?.user?.uid ?? ""}
            </p>
            <p>
              <b>Email:</b> {auth?.user?.email ?? ""}
            </p>
          </div>
        </div>
      ) : (
        <Link className="profileHeader-loginButton" to="/profile/login">
          Login to access Dashboard
        </Link>
      )}
    </div>
  );
};

export default HeaderInfo;
