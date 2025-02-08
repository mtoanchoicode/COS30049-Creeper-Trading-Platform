import React from "react";
import "./AmountDisplay.css";

import { Input } from "antd";
import CurrencySelection from "../CurrencySelection/CurrencySelection";

const AmountDisplay = ({
  type,
  currency,
  value,
  usdValue,
  handleChange,
  onClick,
}) => {
  return (
    <div className="amount-display">
      <div className="amount-display-main">
        <Input
          placeholder="0"
          type="number"
          inputMode="decimal"
          value={value}
          onChange={handleChange}
        />
        <CurrencySelection onClick={onClick} currency={currency} />
      </div>
      <div className="amount-display-usd">
        {type === "swap" ? <p>${(usdValue ?? 0).toFixed(2)}</p> : ""}
      </div>
    </div>
  );
};

export default AmountDisplay;
