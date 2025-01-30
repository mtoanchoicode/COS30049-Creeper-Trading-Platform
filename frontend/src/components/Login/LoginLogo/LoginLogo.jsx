import React from "react";
import logo from "../../../assets/Logo.png";
import { Link } from "react-router-dom";
import "./LoginLogo.css";

const LoginLogo = () => {
  return (
    <div className="login-logo">
      <Link to="/">
        <div className="login-logo-div">
          <img src={logo} alt="Creeper Logo" />

          <p className="login-logo-title">CREEPER</p>
        </div>
      </Link>
    </div>
  );
};

export default LoginLogo;
