import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./NavProfile.css";

import dashboardIcon from "../../assets/Dashboard Icon.svg";
import logoutIcon from "../../assets/Logout Icon.svg";
import loginIcon from "../../assets/Login Icon.svg";
import registerIcon from "../../assets/Register Icon.svg";
// import logoutIcon from "../../assets/Logout Icon.svg"; // Add a logout icon
import { AuthContext } from "../../contexts/AuthContext";
import { notification } from "antd";

const NavProfile = () => {
  const navigate = useNavigate();
  const { auth, setAuth } = useContext(AuthContext);

  // Function to handle logout
  const handleLogout = () => {
    localStorage.clear("access_token");
    navigate("/");
    setAuth({
      isAuthenticated: false,
      user: {
        uid: "",
        email: "",
        name: "",
      },
    });
    notification.success({
      message: "LOG OUT",
      description: "Success",
    });
  };

  return (
    <div className="navprofile">
      <Link to="/profile">
        <div className="navprofile-item">
          <img
            src={dashboardIcon}
            alt="Dashboard Icon"
            className="navprofile-icon"
          />
          <div className="navprofile-content">
            <div className="navprofile-heading">
              <p>Dashboard</p>
            </div>
          </div>
        </div>
      </Link>

      {auth.isAuthenticated ? (
        <div
          className="navprofile-item"
          onClick={handleLogout}
          style={{ cursor: "pointer" }}
        >
          <img src={logoutIcon} alt="Logout Icon" className="navprofile-icon" />
          <div className="navprofile-content">
            <div className="navprofile-heading">
              <p>Log Out</p>
            </div>
          </div>
        </div>
      ) : (
        // If not authenticated, show Register & Login
        <>
          <Link to="/profile/register">
            <div className="navprofile-item">
              <img
                src={registerIcon}
                alt="Register Icon"
                className="navprofile-icon"
              />
              <div className="navprofile-content">
                <div className="navprofile-heading">
                  <p>Register</p>
                </div>
              </div>
            </div>
          </Link>

          <Link to="/profile/login">
            <div className="navprofile-item">
              <img
                src={loginIcon}
                alt="Login Icon"
                className="navprofile-icon"
              />
              <div className="navprofile-content">
                <div className="navprofile-heading">
                  <p>Login</p>
                </div>
              </div>
            </div>
          </Link>
        </>
      )}
    </div>
  );
};

export default NavProfile;
