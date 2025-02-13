import React, { useContext } from "react";
import "./LimitPrice.css";

import { CoinContext } from "../../../contexts/CoinContext";
import { Input } from "antd";

const LimitPrice = () => {
  const { limitFromCurrency, limitToCurrency } =
    useContext(CoinContext);

  return (
    <div className="limit-price">
      <div className="limit-price-top">
        <div className="limit-price-heading">
          When 1 <span>{limitFromCurrency.symbol.toUpperCase()}</span> is worth
        </div>
      </div>
      <div className="limit-price-center">
        <div className="limit-price-price-display">
          <Input value={limitFromCurrency.current_price} />
        </div>
        <div
          className="limit-price-tokens-selection"
        >
          <img src={limitToCurrency.image} alt={limitToCurrency.symbol} />
          <p>{limitToCurrency.symbol.toUpperCase()}</p>
        </div>
      </div>
    </div>
  );
};

export default LimitPrice;
