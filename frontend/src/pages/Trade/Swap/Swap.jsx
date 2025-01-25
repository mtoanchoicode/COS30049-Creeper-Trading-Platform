import React from "react";
import "./Swap.css";

import ConvertCurrencies from "../../../components/Trade/ConvertCurrencies/ConvertCurrencies";
import { Button } from "antd";
import TradeSelection from "../../../components/Trade/TradeSelection/TradeSelection";

const ConvertTrade = () => {
  return (
    <div className="swap">
      <div className="swap-content">
        <div className="swap-left">
          <div className="swap-container">
            <ConvertCurrencies />
            <Button type="primary" block className="swap-btn">
              Connect wallet
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConvertTrade;
