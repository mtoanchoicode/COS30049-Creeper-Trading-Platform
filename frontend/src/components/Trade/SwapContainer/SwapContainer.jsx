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
    swapFromCurrencyValue,
    swapToCurrencyValue,
    setActiveOverlay,
    swapFromUsdValue,
    swapToUsdValue,
    handleCurrencyValueChange
  } = useContext(CoinContext);

  return (
    <div className="swap-container">
      <ConvertCurrenciesContainer
        type="swap"
        title="From"
        currency={swapFromCurrency}
        value={swapFromCurrencyValue}
        handleChange={handleCurrencyValueChange}
        usdValue={swapFromUsdValue}
        onClick={() => setActiveOverlay("swapFrom")}
      />
      <SwapButton type="swap" />
      <ConvertCurrenciesContainer
        type="swap"
        title="To"
        currency={swapToCurrency}
        value={swapToCurrencyValue}
        handleChange={handleCurrencyValueChange}
        usdValue={swapToUsdValue}
        onClick={() => setActiveOverlay("swapTo")}
      />
      {["swapFrom", "swapTo"].map((type) => (
        <TokensSelection key={type} type={type} tradeType="swap" />
      ))}
    </div>
  );
};

export default SwapContainer;
