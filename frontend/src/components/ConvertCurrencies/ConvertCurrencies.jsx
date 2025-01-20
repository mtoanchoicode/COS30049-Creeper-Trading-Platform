import React, { useContext, useState, useEffect } from "react";
import "./ConvertCurrencies.css";
import SwapButton from "../SwapButton/SwapButton";
import ConvertCurrenciesContainer from "../ConvertCurrenciesContainer/ConvertCurrenciesContainer";
import CurrencySelectOverlay from "../CurrencySelectOverlay/CurrencySelectOverlay";
import { CoinContext } from "../../contexts/CoinContext";

const ConvertCurrencies = () => {
  const {
    fromCurrency,
    toCurrency,
    fromCurrencyValue,
    toCurrencyValue,
    setActiveOverlay,
    fromUsdValue,
    toUsdValue,
    handleFromCurrencyValueChange,
    handleToCurrencyValueChange,
  } = useContext(CoinContext);
  const [amount, setAmount] = useState(1); // Amount input for fromCurrency
  const [availableBalance, setAvailableBalance] = useState(100000);

  return (
    <div className="convert-currencies">
      <ConvertCurrenciesContainer
        title="From"
        balance={availableBalance}
        currency={fromCurrency}
        amount={fromCurrencyValue}
        value={fromCurrencyValue}
        handleChange={handleFromCurrencyValueChange}
        usdValue={fromUsdValue}
        onClick={() => setActiveOverlay("from")}
      />
      <SwapButton />
      <ConvertCurrenciesContainer
        title="To"
        balance={availableBalance}
        currency={toCurrency}
        amount={toCurrencyValue}
        value={toCurrencyValue}
        handleChange={handleToCurrencyValueChange}
        usdValue={toUsdValue}
        onClick={() => setActiveOverlay("to")}
      />
      {["from", "to"].map((type) => (
        <CurrencySelectOverlay key={type} type={type} />
      ))}
    </div>
  );
};

export default ConvertCurrencies;
