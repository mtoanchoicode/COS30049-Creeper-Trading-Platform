import React, { createContext, useState, useEffect } from "react";
import coinData from "../data/coins.json";

export const CoinContext = createContext();

const CoinProvider = ({ children }) => {
  const [coins, setCoins] = useState(coinData);
  const [activeOverlay, setActiveOverlay] = useState(null);

  const [fromCurrency, setFromCurrency] = useState({
    id: "bitcoin",
    symbol: "BTC",
    name: "Bitcoin",
    image: "https://assets.coingecko.com/coins/images/1/large/bitcoin.png",
    current_price: 100000,
    market_cap: 814230000000,
    min_transaction_amount: 0.0001,
    max_transaction_amount: 10,
  });
  const [toCurrency, setToCurrency] = useState({
    id: "tether",
    symbol: "USDT",
    name: "Tether",
    image: "https://assets.coingecko.com/coins/images/325/large/Tether.png",
    current_price: 1.0,
    market_cap: 69000000000,
    min_transaction_amount: 1,
    max_transaction_amount: 100000,
  });

  const [fromCurrencyValue, setFromCurrencyValue] = useState("");
  const [toCurrencyValue, setToCurrencyValue] = useState("");
  const [fromUsdValue, setFromUsdValue] = useState("");
  const [toUsdValue, setToUsdValue] = useState("");

  const resetValues = () => {
    setFromCurrencyValue("");
    setToCurrencyValue("");
    setFromUsdValue("");
    setToUsdValue("");
  };

  const handleFromCurrencyValueChange = (e) => {
    const value = e.target.value;

    // If the input is empty, clear related states
    if (value === "") {
      resetValues();
      return;
    }

    const numericValue = parseFloat(value);
    setFromCurrencyValue(numericValue);

    // Convert the fromCurrency value to USD
    const usdFromValue = numericValue * fromCurrency.current_price;
    setFromUsdValue(usdFromValue);

    // Convert that USD value into toCurrency
    const toValue = usdFromValue / toCurrency.current_price;
    setToCurrencyValue(toValue);

    //Convert the toCurrency value to USD
    const usdToValue = toValue * toCurrency.current_price;
    setToUsdValue(usdToValue);
  };

  const handleToCurrencyValueChange = (e) => {
    const value = e.target.value;

    // If the input is empty, clear related states
    if (value === "") {
      resetValues();
      return;
    }

    const numericValue = parseFloat(value);
    setToCurrencyValue(numericValue);

    // Convert the toCurrency value to USD
    const usdToValue = numericValue * toCurrency.current_price;
    setToUsdValue(usdToValue);

    // Convert that USD value into fromCurrency
    const fromValue = usdToValue / fromCurrency.current_price;
    setFromCurrencyValue(fromValue);

    //Convert the fromCurrency value to USD
    const usdFromValue = fromValue * fromCurrency.current_price;
    setFromUsdValue(usdFromValue);
  };

  const swapCurrency = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);

    setFromCurrencyValue(toCurrencyValue);
    setToCurrencyValue(fromCurrencyValue);

    setFromUsdValue(toUsdValue);
    setToUsdValue(fromUsdValue);
  };

  const handleCoinSelection = (selectedCoin, type) => {
    const isFromType = type === "from";
    const otherType = isFromType ? toCurrency : fromCurrency;

    const updatedCurrency = {
      ...selectedCoin,
      name: selectedCoin.name,
      symbol: selectedCoin.symbol.toUpperCase(),
      image: selectedCoin.image,
      current_price: selectedCoin.current_price,
      market_cap: selectedCoin.market_cap,
      min_transaction_amount: selectedCoin.min_transaction_amount,
      max_transaction_amount: selectedCoin.max_transaction_amount,
    };

    if (selectedCoin.id === otherType.id) {
      swapCurrency();
    } else if (isFromType) {
      setFromCurrency(updatedCurrency);
    } else {
      setToCurrency(updatedCurrency);
    }

    setActiveOverlay(null);
    resetValues();
  };

  const handleOverlay = (type, value) => {
    setActiveOverlay(value ? type : null);
  };

  const contextValue = {
    coins,
    fromCurrency,
    toCurrency,
    fromCurrencyValue,
    toCurrencyValue,
    fromUsdValue,
    toUsdValue,
    activeOverlay,
    swapCurrency,
    handleCoinSelection,
    handleOverlay,
    setActiveOverlay,
    handleFromCurrencyValueChange,
    handleToCurrencyValueChange,
  };

  return (
    <CoinContext.Provider value={contextValue}>{children}</CoinContext.Provider>
  );
};

export default CoinProvider;
