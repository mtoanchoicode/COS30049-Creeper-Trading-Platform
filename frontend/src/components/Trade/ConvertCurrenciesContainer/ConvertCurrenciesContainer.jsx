import React from "react";
import AmountDisplay from "../AmountDisplay/AmountDisplay";
import "./ConvertCurrenciesContainer.css";

const ConvertCurrenciesContainer = ({ title, type, currency, value, usdValue, handleChange, onClick}) => {
  return (
    <div className="convert-currencies-container">
      <div className="convert-currencies-container-top">
        <p>{title}</p>
      </div>
      <div className="convert-currencies-container-bottom">
        <AmountDisplay type={type} currency={currency} onClick={onClick} value={value} usdValue={usdValue} handleChange={handleChange}/>
      </div>
    </div>
  );
};

export default ConvertCurrenciesContainer;
