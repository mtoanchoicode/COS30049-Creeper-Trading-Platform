import React from "react";
import "./AmountDisplay.css";

const AmountDisplay = ({ amount, usdValue }) => {
  return (
    <div className="amount-display">
      <div className="amount-display-main">
        <p>{amount}</p>
      </div>
      <div className="amount-display-usd">
        <p>{usdValue}</p>
      </div>
    </div>
  );
};

export default AmountDisplay;
