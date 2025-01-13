import React, { useState } from "react";
import "./NavBar.css";
import Icons from "../Icons/Icons";

import bellIcon from "../../assets/Bell Icon.svg";
import hoverBellIcon from "../../assets/Hover Bell Icon.svg";
import moonIcon from "../../assets/Dark Mode Icon.svg";
import hoverMoonIcon from "../../assets/Hover Dark Mode Icon.svg";
import walletIcon from "../../assets/Wallet Icon.svg";
import userIcon from "../../assets/User Icon.svg";
import barsIcon from "../../assets/Bars Icon.svg";
import { Link } from "react-router-dom";
import NavTrade from "../NavTrade/NavTrade";

const NavBar = () => {
  const [showNavTrade, setShowNavTrade] = useState(false);
  const [hoverIcon, setHoverIcon] = useState(false);

  return (
    <div className="navbar">
      <div className="navbar-left">
        <Link to="/">
          <div className="navbar-left-logo">
            <img src="" alt="Logo" />
          </div>
          <p className="navbar-title">CREEPER</p>
        </Link>
      </div>

      <div className="navbar-center">
        <div className="nav-center-menu">
          <Link to="/sell" className="nav-center-menu-link">
            <div className="nav-center-menu-name">Buy Crypto</div>
          </Link>
          <Link to="/market" className="nav-center-menu-link">
            <div className="nav-center-menu-name">Market</div>
          </Link>
          <div
            onMouseEnter={() => setShowNavTrade(true)}
            onMouseLeave={() => setShowNavTrade(false)}
            className="nav-center-menu-link"
          >
            <div className="nav-center-menu-name">
              Trading <i className="fa-solid fa-chevron-down"></i>
              {showNavTrade && <NavTrade />}
            </div>
          </div>
          <Link to="/explore" className="nav-center-menu-link">
            <div className="nav-center-menu-name">Explore</div>
          </Link>
          <Link to="/about" className="nav-center-menu-link">
            <div className="nav-center-menu-name">About Us</div>
          </Link>
        </div>
      </div>

      <div className="navbar-right">
        <Icons src={walletIcon} alt="Wallet Icon" />
        <Icons src={bellIcon} alt="Notification Icon" />
        <Icons src={moonIcon} alt="Moon Icon" />

        <Link to="/register">
          <div className="navbar-right-user navbar-icon">
            <img src={barsIcon} alt="Menu Icon" />
            <img src={userIcon} alt="User Icon" />
          </div>
        </Link>
      </div>
    </div>
  );
};

export default NavBar;
