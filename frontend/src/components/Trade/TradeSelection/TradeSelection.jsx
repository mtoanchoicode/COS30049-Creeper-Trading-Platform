import React, { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import "./TradeSelection.css";
import { CoinContext } from "../../../contexts/CoinContext";

const TradeSelection = () => {
  const location = useLocation();

  const { resetValues } = useContext(CoinContext);

  // Determine the active option based on the current pathname
  const activePath = location.pathname;

  return (
    <div className="trade-selection">
      <Link to="/trade/send">
        <button
          className={activePath === "/trade/send" ? "active" : ""}
          onClick={resetValues}
        >
          Send
        </button>
      </Link>
      <Link to="/trade/buy">
        <button
          className={activePath === "/trade/buy" ? "active" : ""}
          onClick={resetValues}
        >
          Buy
        </button>
      </Link>
      <Link to="/trade/swap">
        <button
          className={activePath === "/trade/swap" ? "active" : ""}
          onClick={resetValues}
        >
          Swap
        </button>
      </Link>
      <Link to="/trade/add">
        <button
          className={activePath === "/trade/add" ? "active" : ""}
          onClick={resetValues}
        >
          Add & Remove
        </button>
      </Link>
      <Link to="/trade/faucet">
        <button
          className={activePath === "/trade/faucet" ? "active" : ""}
          onClick={resetValues}
        >
          Faucet
        </button>
      </Link>
      <Link to="/trade/create">
        <button
          className={activePath === "/trade/create" ? "active" : ""}
          onClick={resetValues}
        >
          Create Token
        </button>
      </Link>
    </div>
  );
};

export default TradeSelection;
