import React, { useContext} from "react";
import "./ConvertCurrencies.css";
import SwapButton from "../TradeButton/TradeButton";
import ConvertCurrenciesContainer from "../ConvertCurrenciesContainer/ConvertCurrenciesContainer";
import CurrencySelectOverlay from "../TokensSelection/TokensSelection";
import { CoinContext } from "../../../contexts/CoinContext";

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

  return (
    <div className="convert-currencies">
      <ConvertCurrenciesContainer
        title="From"
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
