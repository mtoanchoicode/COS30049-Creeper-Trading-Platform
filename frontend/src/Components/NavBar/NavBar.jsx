import React from "react";
import "./NavBar.css";
import { Link } from "react-router-dom";
import Icons from "../Icons/Icons";

import bellIcon from "../../assets/White Bell Icon.svg";
import globeIcon from "../../assets/GLobe Icon.svg";
import walletIcon from "../../assets/Wallet Icon.svg";
import userIcon from "../../assets/User Icon.svg";
import barsIcon from "../../assets/Bars Icon.svg";
import chevronDownIcon from "../../assets/Chevron Down Icon.svg";

const NavBar = () => {
  return (
    <div className="navbar">
      <div className="navbar-left">
        <div className="navbar-left-logo">
          <img src="" alt="Logo" />
        </div>
        <p className="navbar-title">CREEPER</p>
      </div>

      <div className="navbar-center">
        <ul className="nav-center-menu">
          <li>Buy Crypto</li>
          <li>Market</li>
          <li>
            Trading <img src={chevronDownIcon} alt="Dropdown Icon" />
          </li>
          <li>Explore</li>
          <li>About Us</li>
        </ul>
      </div>

      <div className="navbar-right">
        <Icons src={walletIcon} alt="Wallet Icon" />
        <Icons src={bellIcon} alt="Notification Icon" />
        <Icons src={globeIcon} alt="Globe Icon" />
        <div className="navbar-right-user navbar-icon">
          <img src={barsIcon} alt="Menu Icon" />
          <img src={userIcon} alt="User Icon" />
        </div>
      </div>
    </div>
  );
};

export default NavBar;
