import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import "./NavBar.css";

import logo from "../../assets/Logo.png";
import moonIcon from "../../assets/Dark Mode Icon.svg";
import userIcon from "../../assets/User Icon.svg";
import barsIcon from "../../assets/Bars Icon.svg";
import { Link } from "react-router-dom";
import NavTrade from "../NavTrade/NavTrade";
import NavProfile from "../NavProfile/NavProfile";
import { Button } from "antd";
import { useAppKit, useAppKitAccount } from "@reown/appkit/react";
import shortenAddress from "../../utils/utils";

const NavBar = ({theme, setTheme}) => {
  const { open } = useAppKit();
  const { address, isConnected } = useAppKitAccount();
  const [showNavTrade, setShowNavTrade] = useState(false);
  const [showNavProfile, setshowNavProfile] = useState(false);
  const [hoverIcon, setHoverIcon] = useState(false);

  const location = useLocation();
  const isFixed = location.pathname === "/trade/convert";

  return (
    <div
      className="navbar"
      style={{
        position: isFixed ? "fixed" : "",
      }}
    >
      <div className="navbar-left">
        <div className="navbar-left-logo">
          <Link to="/">
            <div className="navbar-left-logo-img">
              <img src={logo} alt="Logo" />
            </div>
            <p className="navbar-title">CREEPER</p>
          </Link>
        </div>

        <div className="navbar-left-menu">
          <Link to="/explore" className="navbar-left-menu-link">
            <div className="navbar-left-menu-name">Explore</div>
          </Link>

          <Link to="/news" className="navbar-left-menu-link">
            <div className="navbar-left-menu-name">News</div>
          </Link>
          <Link
            to="/trade/swap"
            onMouseEnter={() => setShowNavTrade(true)}
            onMouseLeave={() => setShowNavTrade(false)}
            className="navbar-left-menu-link"
          >
            <div className="navbar-left-menu-name">
              Trade <i className="fa-solid fa-chevron-down"></i>
              {showNavTrade && <NavTrade />}
            </div>
          </Link>
        </div>
      </div>

      <div className="navbar-center">
        <div className="navbar-center-searchbar">
          <div className="navbar-searchbar-container">
            <div className="navbar-searchbar-icon">
              <i className="fa-solid fa-magnifying-glass"></i>
            </div>
            <div className="navbar-searchbar-text">
              <p>Search tokens</p>
            </div>
          </div>
        </div>
      </div>

      <div className="navbar-right">
        <Button className="navbar-connectWallet" onClick={() => open()}>
          {isConnected ? `${shortenAddress(address)}` : "Connect Wallet"}
        </Button>

        <img className = "DarkMode_Icon" src={moonIcon} alt="Moon Icon" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}/>
       
        <div
          className="navbar-right-profile"
          onMouseEnter={() => setshowNavProfile(true)}
          onMouseLeave={() => setshowNavProfile(false)}
        >
          <div className="navbar-right-user navbar-icon">
            <img src={barsIcon} alt="Menu Icon" />
            <img src={userIcon} alt="User Icon" />
            {showNavProfile && <NavProfile />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
