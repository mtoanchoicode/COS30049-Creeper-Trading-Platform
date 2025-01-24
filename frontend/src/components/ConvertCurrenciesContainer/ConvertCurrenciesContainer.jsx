import React from "react";
import AmountDisplay from "../AmountDisplay/AmountDisplay";
import "./ConvertCurrenciesContainer.css";

const ConvertCurrenciesContainer = ({
  title,
  balance,
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
        />
        <div className="convert-currencies-selection" onClick={onClick}>
          {currency.image && <img src={currency.image} alt={currency.symbol} />}
          <p>{currency.symbol}</p>
          <i className="fa-solid fa-chevron-down"></i>
        </div>
      </div>
    </div>
  );
};

export default ConvertCurrenciesContainer;
