import React, { useState } from "react";
import "./ConvertCurrencies.css";
import SwapButton from "../SwapButton/SwapButton";
import ConvertCurrenciesContainer from "../ConvertCurrenciesContainer/ConvertCurrenciesContainer";
import CurrencyOverlay from "../CurrencyOverlay/CurrencyOverlay";

const ConvertCurrencies = () => {
  const [fromCurrency, setFromCurrency] = useState({
    symbol: "BTC",
    image: "https://coin-images.coingecko.com/coins/images/1/large/bitcoin.png?1696501400",
  });
  const [toCurrency, setToCurrency] = useState({
    symbol: "USDT",
    image: "https://coin-images.coingecko.com/coins/images/325/large/Tether.png?1696501661",
  });
  const [amount, setAmount] = useState(1);
  const [availableBalance, setAvailableBalance] = useState(100000);
  const [activeOverlay, setActiveOverlay] = useState(null);

  const exchangeRate = 15.3;
  const fromCurrencyValue = amount;
  const toCurrencyValue = (amount * exchangeRate).toFixed(2);

  const handleSwap = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  const handleOverlay = (type, value) => {
    setActiveOverlay(value ? type : null);
  };

  const handleFromCoinSelection = (selectedCoin) => {
    setFromCurrency({
      symbol: selectedCoin.symbol.toUpperCase(),
      image: selectedCoin.image,
    });
    setActiveOverlay(null);
  };

  const handleToCoinSelection = (selectedCoin) => {
    setToCurrency({
      symbol: selectedCoin.symbol.toUpperCase(),
      image: selectedCoin.image,
    });
    setActiveOverlay(null);
  };

  console.log(toCurrency.image)

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
      <SwapButton onClick={handleSwap} />
      <ConvertCurrenciesContainer
        title="To"
        balance={availableBalance}
        currency={toCurrency}
        amount={toCurrencyValue}
        usdValue={`$${(toCurrencyValue * 94422.72).toFixed(2)}`}
        onClick={() => setActiveOverlay("to")}
      />
      <CurrencyOverlay
        type="from"
        activeOverlay={activeOverlay}
        onClose={handleOverlay}
        onCoinSelect={handleFromCoinSelection}
      />
      <CurrencyOverlay
        type="to"
        activeOverlay={activeOverlay}
        onClose={handleOverlay}
        onCoinSelect={handleToCoinSelection}
      />
    </div>
  );
};

export default ConvertCurrencies;
