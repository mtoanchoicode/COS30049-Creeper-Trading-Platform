import React from "react";
import "./AmountDisplay.css";

import { Input } from "antd";
import CurrencySelection from "../CurrencySelection/CurrencySelection";

const AmountDisplay = ({ usdValue, value, handleChange, onClick, currency }) => {
  return (
    <div className="amount-display">
      <div className="amount-display-main">
        <Input
          placeholder="0"
          onChange={handleChange}
          type="number"
          inputMode="decimal"
          value={value}
        />
        <CurrencySelection onClick={onClick} currency={currency}/>
      </div>
      <div className="amount-display-usd">
        <p>${usdValue}</p>
      </div>
    </div>
  );
};

export default AmountDisplay;
