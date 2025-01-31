import React from "react";
import AmountDisplay from "../AmountDisplay/AmountDisplay";
import "./ConvertCurrenciesContainer.css";

const ConvertCurrenciesContainer = ({
  title,
  currency,
  amount,
  handleChange,
  usdValue,
  value,
  onClick,
}) => {
  return (
    <div className="convert-currencies-container">
      <div className="convert-currencies-container-top">
        <p>{title}</p>
      </div>
      <div className="convert-currencies-container-bottom">
        <AmountDisplay
          currency={currency}
          amount={amount}
          handleChange={handleChange}
          usdValue={usdValue}
          value={value}
          inputValue={currency}
          onClick={onClick}
        />
      </div>
    </div>
  );
};

export default ConvertCurrenciesContainer;
