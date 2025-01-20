import React from "react";
import "./AmountDisplay.css";

import { Input } from "antd";

const AmountDisplay = ({ currency, usdValue, value, handleChange }) => {
  return (
    <div className="amount-display">
      <div className="amount-display-main">
        <Input
          placeholder={`${currency.min_transaction_amount} - ${currency.max_transaction_amount}`}
          onChange={handleChange}
          type="number"
          inputMode="decimal"
          value={value}
        />
      </div>
      {value && (
        <div className="amount-display-usd">
          <p>${usdValue}</p>
        </div>
      )}
    </div>
  );
};

export default AmountDisplay;
