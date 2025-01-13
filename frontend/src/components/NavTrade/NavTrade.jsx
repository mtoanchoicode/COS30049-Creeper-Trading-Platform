import React from "react";
import "./NavTrade.css";
import { Link } from "react-router-dom";

import whiteSpotIcon from "../../assets/White Spot Icon.svg";
import WhiteMarginIcon from "../../assets/White Margin Icon.svg";
import whiteConvertIcon from "../../assets/White Convert Icon.svg";

const NavTrade = () => {
  const tradeItems = [
    {
      name: "Spot",
      desc: "Buy and sell on the spot market with advanced tools",
      img: whiteSpotIcon,
      path: "/trade/spot",
    },
    {
      name: "Margin",
      desc: "Increase your profits with leverage",
      img: WhiteMarginIcon,
      path: "/trade/margin",
    },
    {
      name: "Convert",
      desc: "The easiest way to trade at all sizes",
      img: whiteConvertIcon,
      path: "/trade/convert",
    },
  ];

  return (
    <div className="navtrade">
      {tradeItems.map((item, index) => (
        <Link to={item.path} key={item.name}>
          <div key={index} className="navtrade-item">
            <img
              src={item.img}
              alt={`${item.name} Icon`}
              className="navtrade-icon"
            />
            <div className="navtrade-content">
              <div className="navtrade-heading">
                <p>{item.name}</p>
                <i className="fa-solid fa-arrow-right"></i>
              </div>
              <p className="navtrade-desc">{item.desc}</p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default NavTrade;
