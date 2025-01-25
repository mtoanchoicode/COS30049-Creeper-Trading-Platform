import React from "react";
import { Outlet } from "react-router-dom";
import "./Trade.css";

import TradeSelection from "../../components/Trade/TradeSelection/TradeSelection";

const Trade = () => {
  return (
    <div className="trade">
      <TradeSelection />
      <Outlet />
    </div>
  );
};

export default Trade;
