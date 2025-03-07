import React from "react";
import "./CurrencySelection.css";

const CurrencySelection = ({ onClick, currency }) => {
  return (
    <div className="currency-selection">
      {currency.image && (
        <img src={currency.image} alt={currency.symbol.toUpperCase()} />
      )}
      <p>{currency.symbol.toUpperCase()}</p>
    </div>
  );
};

export default CurrencySelection;
