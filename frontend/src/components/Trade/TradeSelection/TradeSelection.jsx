import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./TradeSelection.css";

const TradeSelection = () => {
  const location = useLocation();

  // Determine the active option based on the current pathname
  const activePath = location.pathname;

  return (
    <div className="trade-selection">
      <Link to="/trade/send">
        <button className={activePath === "/trade/send" ? "active" : ""}>
          Send
        </button>
      </Link>
      <Link to="/trade/buy">
        <button className={activePath === "/trade/buy" ? "active" : ""}>
          Buy
        </button>
      </Link>
      <Link to="/trade/swap">
        <button className={activePath === "/trade/swap" ? "active" : ""}>
          Swap
        </button>
      </Link>
      <Link to="/trade/add">
        <button className={activePath === "/trade/add" ? "active" : ""}>
          Add & Remove
        </button>
      </Link>
      <Link to="/trade/faucet">
        <button className={activePath === "/trade/faucet" ? "active" : ""}>
          Faucet
        </button>
      </Link>
    </div>
  );
};

export default TradeSelection;
