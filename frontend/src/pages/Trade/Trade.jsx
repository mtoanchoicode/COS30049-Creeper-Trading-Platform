import React from "react";
import { Outlet } from "react-router-dom";
import "./Trade.css";

import TradeSelection from "../../components/Trade/TradeSelection/TradeSelection";

const Trade = () => {
  return (
    <div className="trade">
      <div className="trade-container">
        <TradeSelection />
        <Outlet />
      </div>
    </div>
  );
};

export default Trade;
