import React, { useContext } from "react";
import "./SwapContainer.css";

import SwapButton from "../TradeButton/TradeButton";
import ConvertCurrenciesContainer from "../ConvertCurrenciesContainer/ConvertCurrenciesContainer";
import TokensSelection from "../TokensSelection/TokensSelection";
import { CoinContext } from "../../../contexts/CoinContext";

const SwapContainer = () => {
  const {
    swapFromCurrency,
    swapToCurrency,
    fromCurrencyValue,
    toCurrencyValue,
    setActiveOverlay,
    fromUsdValue,
    toUsdValue,
    handleFromCurrencyValueChange,
    handleToCurrencyValueChange,
  } = useContext(CoinContext);

  return (
    <div className="swap-container">
      <ConvertCurrenciesContainer
        type="swap"
        title="From"
        currency={swapFromCurrency}
        value={fromCurrencyValue}
        handleChange={handleFromCurrencyValueChange}
        usdValue={fromUsdValue}
        onClick={() => setActiveOverlay("from")}
      />
      <SwapButton type="swap" />
      <ConvertCurrenciesContainer
        type="swap"
        title="To"
        currency={swapToCurrency}
        value={toCurrencyValue}
        handleChange={handleToCurrencyValueChange}
        usdValue={toUsdValue}
        onClick={() => setActiveOverlay("to")}
      />
      {["from", "to"].map((type) => (
        <TokensSelection key={type} type={type} tradeType="swap" />
      ))}
    </div>
  );
};

export default SwapContainer;
