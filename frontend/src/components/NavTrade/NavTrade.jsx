import React from "react";
import "./NavTrade.css";
import { Link } from "react-router-dom";

const NavTrade = () => {
  const tradeItems = [
    {
      name: "Send",
      desc: "Seamlessly transfer crypto to others",
      path: "/trade/send",
    },
    {
      name: "Buy",
      desc: "Onramp with fiat",
      path: "/trade/buy",
    },
    {
      name: "Swap",
      desc: "The easiest way to trade",
      path: "/trade/swap",
    },
    {
      name: "Add & Remove",
      desc: "Add or withdraw liquidity from the coin pool.",
      path: "/trade/add",
    },
    {
      name: "Faucet",
      desc: "Claim free LNX and CEP tokens every hour!",
      path: "/trade/faucet",
    },
    {
      name: "Create Token",
      desc: "Easily generate your own custom crypto token!",
      path: "/trade/create",
    },
  ];

  const leftItems = tradeItems.slice(0, 3);
  const rightItems = tradeItems.slice(3, 6);

  return (
    <div className="navtrade">
      <div className="navtrade-column">
        {leftItems.map((item, index) => (
          <Link to={item.path} key={item.name}>
            <div key={index} className="navtrade-item">
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
      <div className="navtrade-column">
        {rightItems.map((item, index) => (
          <Link to={item.path} key={item.name}>
            <div key={index} className="navtrade-item">
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
    </div>
  );
};

export default NavTrade;
