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
      name: "Add",
      desc: "Add the liquidity to our coin pool",
      path: "/trade/add",
    },
    {
      name: "Faucet",
      desc: "Get our faucet",
      path: "/trade/faucet",
    },
  ];

  return (
    <div className="navtrade">
      {tradeItems.map((item, index) => (
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
  );
};

export default NavTrade;
