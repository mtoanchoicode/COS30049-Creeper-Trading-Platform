import React from "react";
import "./CurrencySelection.css";

const CurrencySelection = ({ onClick, currency }) => {
  return (
    <div className="currency-selection" onClick={onClick}>
      {currency.image && (
        <img src={currency.image} alt={currency.symbol.toUpperCase()} />
      )}
      <p>{currency.symbol.toUpperCase()}</p>
      <i className="fa-solid fa-chevron-down"></i>
    </div>
  );
};

export default CurrencySelection;
