import React from "react";
import "./Footer.css";
import { Link } from "react-router-dom";
import logo from "../../assets/Logo.png";
import facebook_icon from "../../assets/Footer Facebook Icon.svg";
import youtube_icon from "../../assets/Footer Youtube Icon.svg";
import x_icon from "../../assets/Footer X Icon.svg";
import google_icon from "../../assets/Footer Google Icon.svg";
import Icons from "../Icons/Icons";

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer-logo">
        <img src={logo} alt="Logo" />
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
            <a href = ""> 
              <Icons src={facebook_icon} alt="Facebook Icon" /> 
            </a>

            <a href = ""> 
              <Icons src={youtube_icon} alt="Youtube Icon" />
            </a>

            <a href = ""> 
              <Icons src={x_icon} alt="X Icon" />
            </a>

            <a href = ""> 
              <Icons src={google_icon} alt="Google Icon" /> 
            </a>
          </div>
        </div>
      </div>

      <div className="footer-menu">
        <div className="footer-menu-left footer-menu-container">
          <h4>Products</h4>

          <Link className = "Link" to = "/trade/swap">
            <span>Swap coin</span>
          </Link>

          <Link className = "Link"  to = "/trade/buy">
            <span>Buy Crypto</span>
          </Link>

          <Link className = "Link"  to = "/profile">
            <span>Dashboard</span>
          </Link>

          <Link className = "Link"  to = "/explore">
            <span>Explore</span>
          </Link>
        </div>

        <div className="footer-menu-right footer-menu-container">
          <h4>About Us</h4>

          <Link className = "Link" to = "/">
            <span>About</span>
          </Link>

          <Link className = "Link" to = "/">
            <span>Privacy</span>
          </Link>

          <Link className = "Link" to = "/">
            <span>News</span>
          </Link>

          <Link className = "Link" to = "/">
            <span>Feedback & Suggestion</span>
          </Link>   
        </div>
      </div>
    </div>
  );
};

export default Footer;
