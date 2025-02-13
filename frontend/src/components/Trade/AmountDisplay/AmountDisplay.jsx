import React from "react";
import "./AmountDisplay.css";
import { Input } from "antd";
import CurrencySelection from "../CurrencySelection/CurrencySelection";

const AmountDisplay = ({
  title,
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
          onChange={(e) => handleChange(e, title, type)}
        />
        <CurrencySelection onClick={onClick} currency={currency} />
      </div>
      <div className="amount-display-usd">
        {type === "swap" && usdValue ? (
          <p>${usdValue.toFixed(2)}</p>
        ) : type === "swap" ? (
          <p>$0</p>
        ) : null}
      </div>
    </div>
  );
};

export default AmountDisplay;