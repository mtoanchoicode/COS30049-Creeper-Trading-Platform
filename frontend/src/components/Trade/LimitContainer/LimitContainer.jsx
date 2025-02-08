import React, { useContext } from "react";
import "./LimitContainer.css";

import SwapButton from "../TradeButton/TradeButton";
import ConvertCurrenciesContainer from "../ConvertCurrenciesContainer/ConvertCurrenciesContainer";
import TokensSelection from "../TokensSelection/TokensSelection";
import { CoinContext } from "../../../contexts/CoinContext";

const LimitContainer = () => {
  const {
    limitFromCurrency,
    limitToCurrency,
    setActiveOverlay,
    handleFromCurrencyValueChange,
    handleToCurrencyValueChange,
  } = useContext(CoinContext);

  return (
    <div className="limit-container">
      <ConvertCurrenciesContainer
        type="limit"
        title="From"
        currency={limitFromCurrency}
        onClick={() => setActiveOverlay("from")}
      />
      <SwapButton type="limit" />
      <ConvertCurrenciesContainer
        type="limit"
        title="To"
        currency={limitToCurrency}
        onClick={() => setActiveOverlay("to")}
      />
      {["from", "to"].map((type) => (
        <TokensSelection key={type} type={type} tradeType="limit" />
      ))}
    </div>
  );
};

export default LimitContainer;
