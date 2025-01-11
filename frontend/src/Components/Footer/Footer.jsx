import React from "react";
import "./Footer.css";

import facebook_icon from "../../assets/Footer Facebook Icon.svg";
import youtube_icon from "../../assets/Footer Youtube Icon.svg";
import x_icon from "../../assets/Footer X Icon.svg";
import google_icon from "../../assets/Footer Google Icon.svg";
import Icons from "../Icons/Icons";

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer-logo">
        <img src="" alt="Logo Icon" />
        <p>CREEPER</p>
      </div>

      <div className="footer-center">
        <div className="footer-desc">
          <p>
            Creeper is the best marketplace where you can discover, trade, sell
            and buy cryptocurrency and get rich
          </p>
        </div>

        <div className="footer-social">
          <h4>Community</h4>
          <div className="footer-social-container">
            <Icons src={facebook_icon} alt="Facebook Icon" />
            <Icons src={youtube_icon} alt="Youtube Icon" />
            <Icons src={x_icon} alt="X Icon" />
            <Icons src={google_icon} alt="Google Icon" />
          </div>
        </div>
      </div>

      <div className="footer-menu">
        <div className="footer-menu-left footer-menu-container">
          <h4>Products</h4>
          <ul>
            <li>Trade</li>
            <li>Buy Crypto</li>
            <li>Market</li>
            <li>NFT</li>
          </ul>
        </div>

        <div className="footer-menu-right footer-menu-container">
          <h4>About Us</h4>
          <ul>
            <li>About</li>
            <li>Explore</li>
            <li>Privacy</li>
            <li>Feedback & Suggestion</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Footer;
