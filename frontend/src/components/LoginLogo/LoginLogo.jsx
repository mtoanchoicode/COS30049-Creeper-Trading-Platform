import React from "react";
import { Link } from "react-router-dom";
import "./LoginLogo.css";

const LoginLogo = () => {
  return (
    <div className="login-logo">
      <Link to="/">
        <div className="login-logo-div">
          <img src="" alt="Logo" />

          <p className="login-logo-title">CREEPER</p>
        </div>
      </Link>
    </div>
  );
};

export default LoginLogo;
