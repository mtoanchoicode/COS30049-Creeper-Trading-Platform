import React from "react";
import "./Limit.css";

import ConvertCurrencies from "../../../components/Trade/ConvertCurrencies/ConvertCurrencies";
import { Button } from "antd";
import LimitPrice from "../../../components/Trade/LimitPrice/LimitPrice";

const Limit = () => {
  return (
    <div className="limit">
      <div className="limit-content">
        <div className="limit-container">
          <LimitPrice />
          <ConvertCurrencies />
          <Button type="primary" block className="limit-btn trade-btn">
            Connect wallet
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Limit;
