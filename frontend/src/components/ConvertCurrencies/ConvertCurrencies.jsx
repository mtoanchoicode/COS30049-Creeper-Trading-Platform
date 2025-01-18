import React, { useContext, useState } from "react";
import "./ConvertCurrencies.css";
import SwapButton from "../SwapButton/SwapButton";
import ConvertCurrenciesContainer from "../ConvertCurrenciesContainer/ConvertCurrenciesContainer";
import CurrencyOverlay from "../CurrencyOverlay/CurrencyOverlay";
import { CoinContext } from "../../contexts/CoinContext";

const ConvertCurrencies = () => {
  const {
    fromCurrency,
    toCurrency,
    handleFromCoinSelection,
    handleToCoinSelection,
    handleOverlay,
    activeOverlay,
    setActiveOverlay,
  } = useContext(CoinContext);
  const [amount, setAmount] = useState(1);
  const [availableBalance, setAvailableBalance] = useState(100000);

  const exchangeRate = 15.3;
  const fromCurrencyValue = amount;
  const toCurrencyValue = (amount * exchangeRate).toFixed(2);

  return (
    <div className="convert-currencies">
      <ConvertCurrenciesContainer
        title="From"
        balance={availableBalance}
        currency={fromCurrency}
        amount={fromCurrencyValue}
        usdValue={`$${(amount * 94422.72).toFixed(2)}`}
        onClick={() => setActiveOverlay("from")}
      />
      <SwapButton />
      <ConvertCurrenciesContainer
        title="To"
        balance={availableBalance}
        currency={toCurrency}
        amount={toCurrencyValue}
        usdValue={`$${(toCurrencyValue * 94422.72).toFixed(2)}`}
        onClick={() => setActiveOverlay("to")}
      />
      {["from", "to"].map((type) => (
        <CurrencyOverlay
          key={type}
          type={type}
          activeOverlay={activeOverlay}
          onClose={handleOverlay}
          onCoinSelect={
            type === "from" ? handleFromCoinSelection : handleToCoinSelection
          }
        />
      ))}
    </div>
  );
};

export default ConvertCurrencies;
