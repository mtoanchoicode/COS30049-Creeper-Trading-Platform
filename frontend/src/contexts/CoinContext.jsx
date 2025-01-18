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
    current_price: 43452,
    market_cap: 814230000000,
  });
  const [toCurrency, setToCurrency] = useState({
    id: "tether",
    symbol: "USDT",
    name: "Tether",
    image: "https://assets.coingecko.com/coins/images/325/large/Tether.png",
    current_price: 1.0,
    market_cap: 69000000000,
  });

  console.log(toCurrency);

  const swapCurrency = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  const handleFromCoinSelection = (selectedCoin) => {
    setFromCurrency({
      name: selectedCoin.name,
      symbol: selectedCoin.symbol.toUpperCase(),
      image: selectedCoin.image,
    });
    setActiveOverlay(null);
  };

  const handleToCoinSelection = (selectedCoin) => {
    setToCurrency({
      name: selectedCoin.name,
      symbol: selectedCoin.symbol.toUpperCase(),
      image: selectedCoin.image,
    });
    setActiveOverlay(null);
  };

  const handleOverlay = (type, value) => {
    setActiveOverlay(value ? type : null);
  };

  const contextValue = {
    coins,
    fromCurrency,
    toCurrency,
    activeOverlay,
    swapCurrency,
    handleFromCoinSelection,
    handleToCoinSelection,
    handleOverlay,
    setActiveOverlay
  };

  return (
    <CoinContext.Provider value={contextValue}>{children}</CoinContext.Provider>
  );
};

export default CoinProvider;
