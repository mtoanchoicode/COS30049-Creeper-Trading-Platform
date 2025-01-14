import React from "react";
import "./NavProfile.css";
import { Link } from "react-router-dom";

import dashboardIcon from "../../assets/Dashboard Icon.svg";
import loginIcon from "../../assets/Login Icon.svg";
import registerIcon from "../../assets/Register Icon.svg";

const NavProfile = () => {
  const profileItems = [
    {
      name: "Dashboard",
      img: dashboardIcon,
      path: "/profile",
    },
    {
      name: "Register",
      img: registerIcon,
      path: "/profile/register",
    },
    {
      name: "Login",
      img: loginIcon,
      path: "/profile/login",
    },
  ];

  return (
    <div className="navprofile">
      {profileItems.map((item, index) => (
        <Link to={item.path} key={item.name}>
          <div key={index} className="navprofile-item">
            <img
              src={item.img}
              alt={`${item.name} Icon`}
              className="navprofile-icon"
            />
            <div className="navprofile-content">
              <div className="navprofile-heading">
                <p>{item.name}</p>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default NavProfile;
