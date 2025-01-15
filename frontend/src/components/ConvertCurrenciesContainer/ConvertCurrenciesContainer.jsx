import React from "react";
import AmountDisplay from "../AmountDisplay/AmountDisplay";
import "./ConvertCurrenciesContainer.css";

const ConvertCurrenciesContainer = ({
  title,
  balance,
  currency,
  amount,
  usdValue,
  onClick,
}) => {
  return (
    <div className="convert-currencies-container">
      <div className="convert-currencies-container-top">
        <p>{title}</p>
        <div className="convert-currencies-container-balance">
          <p>Available Balance</p>
          <p>{`${balance} ${currency.symbol}`}</p>
        </div>
      </div>
      <div className="convert-currencies-container-bottom">
        <AmountDisplay amount={amount} usdValue={usdValue} />
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
