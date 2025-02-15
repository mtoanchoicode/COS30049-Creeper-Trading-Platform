import React, { useState, useContext, useEffect } from "react";
import "./MobileNavBar.css";

import searchIcon from "../../assets/Market Search Icon.svg";
import logo from "../../assets/Logo.png";
import moonIcon from "../../assets/Dark Mode Icon.svg";
import sunIcon from "../../assets/Light Mode Icon.svg";
import userIcon from "../../assets/User Icon.svg";
import barsIcon from "../../assets/Bars Icon.svg";
import { Link } from "react-router-dom";
import NavTrade from "../NavTrade/NavTrade";
import NavProfile from "../NavProfile/NavProfile";
import MarketCoinBrief from "../Market/MarketCoinBrief/MarketCoinBrief";
import CoinSearchInput from "../CoinSearchInput/CoinSearchInput";
import { CoinContext } from "../../contexts/CoinContext";
import { Button } from "antd";
import { useAppKit, useAppKitAccount } from "@reown/appkit/react";
import shortenAddress from "../../utils/utils";

const NavBar = ({ theme, setTheme, onEvent }) => {
  const { open } = useAppKit();
  const { address, isConnected } = useAppKitAccount();
  const [showNavTrade, setShowNavTrade] = useState(false);
  const [showNavProfile, setshowNavProfile] = useState(false);
  const [showNavSearch, setshowNavSearch] = useState(false);

  const { coins } = useContext(CoinContext);
  const HotCoins = coins.slice(0, 5);

  const onCloseSearch = () => {
    console.log("Closing search overlay...");
    setshowNavSearch(false);
  };


  const handleCloseSearch = (isFalse) => {
    setshowNavSearch(isFalse);
  };

  // const handleClickTest = () => {
  //   setshowNavSearch(true)
  // }

  return (
    <div
      className="navbar"
    >
      <div className="navbar-left">
        <div className="navbar-left-logo">
          <Link to="/" className="Link_Home">
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
          <div
            onMouseEnter={() => setShowNavTrade(true)}
            onMouseLeave={() => setShowNavTrade(false)}
            className="navbar-left-menu-link"
          >
            <div className="navbar-left-menu-name">
              Trade <i className="fa-solid fa-chevron-down"></i>
            </div>
            {showNavTrade && <NavTrade />}
          </div>
        </div>
        
        {/* <div className="Btn_Menu_Responsive">
          <i class="fa-solid fa-bars"></i>
        </div> */}
      </div>

      <div className="navbar-right">
        <div
          className="navbar-Search_Bar_Conatainer"
          onClick={() => setshowNavSearch(true)}
        >
          <div className="Search_Icon_Nav_Bar" >
            <img src={searchIcon} alt="Search icon"></img>
          </div>

          {showNavSearch &&(
            <div className="Search_Overlay_Container">
              <div className="Close_Icon_Nav_Bar"
                onClick={(e) => {
                  e.stopPropagation();
                  setshowNavSearch(false);
                }}
              >
                <i className="fa-solid fa-arrow-left"></i>
                <i className="fa-solid fa-x"></i>
              </div>

              {window.location.pathname !== "/explore" && (
                <div className="navbar-Sreach_Bar"             
                >
                  <CoinSearchInput onEvent={handleCloseSearch}/>
                </div>
              )}

              <div className="List-HotCoin-Container"
                onClick={(e) => {
                  e.stopPropagation();
                  setshowNavSearch(false);
                }}>
                <h2>Hot Coins</h2>
                {HotCoins.map(coin => (
                  <MarketCoinBrief
                    key={coin.id}
                    className="Hot-Coins-listing"
                    id={coin.id}
                    name={coin.name}
                    symbol={coin.symbol.toUpperCase()}
                    current_price={coin.current_price}
                    image={coin.image}
                    change={coin.price_change_percentage_24h}
                  >
                  </MarketCoinBrief>
                ))}
              </div>
            </div>
          )}
        </div>


        <Button className="navbar-connectWallet" onClick={() => open()}>
          {isConnected ? `${shortenAddress(address)}` : "Connect Wallet"}
        </Button>

        {theme === "dark" ? (
          <img
            className="DarkMode_Icon"
            src={moonIcon}
            alt="Moon Icon"
            onClick={() => setTheme("light")}
          />
        ) : (
          <img
            className="DarkMode_Icon"
            src={sunIcon}
            alt="Sun Icon"
            onClick={() => setTheme("dark")}
          />
        )}

        <div
          className="navbar-right-profile"
          onMouseEnter={() => setshowNavProfile(true)}
          onMouseLeave={() => setshowNavProfile(false)}
        >
          <div className="navbar-right-user navbar-icons">
            <img className="navbar-icon" src={barsIcon} alt="Menu Icon" />
            <img className="navbar-icon" src={userIcon} alt="User Icon" />
            {showNavProfile && <NavProfile />}
          </div>
        </div>
      </div>

    </div>
  );
};

export default NavBar;
