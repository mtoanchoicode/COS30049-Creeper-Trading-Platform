import React from "react";
import "./NavBar.css";
import { Link } from "react-router-dom";

export const NavBar = () => {
  return (
    <div className="navbar">
      <div className="navbar-left">
        <div className="navbar-left-logo">
          <img src="" alt="" />
        </div>
        <p>CREEPER</p>
      </div>
      <div className="navbar-center">
        <ul className="nav-center-menu">
          <li>Buy Crypto</li>
          <li>Marktet</li>
          <li>Trading</li>
          <li>Explore</li>
          <li>ABout Us</li>
        </ul>
      </div>
      <div className="navbar-right">
        <div className="navbar-right-wallet"></div>
        <div className="navbar-right-noti"></div>
        <div className="navbar-right-globe"></div>
        <div className="navbar-right-user"></div>
      </div>
    </div>
  );
};
