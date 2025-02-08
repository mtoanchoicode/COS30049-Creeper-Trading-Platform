import React, { createContext, useState, useEffect } from "react";

export const CoinContext = createContext();

const CoinProvider = ({ children }) => {
  const [coins, setCoins] = useState([]);
  const [activeOverlay, setActiveOverlay] = useState(null);

  const defaultCurrency = {
    symbol: "USD", // Default symbol
    name: "US Dollar", // Default name
  };

  const [sendCurrency, setSendCurrency] = useState(defaultCurrency);

  const [limitFromCurrency, setLimitFromCurrency] = useState(defaultCurrency);
  const [limitToCurrency, setLimitToCurrency] = useState(defaultCurrency);

  const [swapFromCurrency, setSwapFromCurrency] = useState(defaultCurrency);
  const [swapToCurrency, setSwapToCurrency] = useState(defaultCurrency);
  useEffect(() => {
    fetch(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=20&page=1&sparkline=false"
    )
      .then((response) => response.json())
      .then((data) => {
        setCoins(data);

        // Set default currencies to ETH and USDT
        const ethCoin = data.find(
          (coin) => coin.symbol.toLowerCase() === "eth"
        );
        const usdtCoin = data.find(
          (coin) => coin.symbol.toLowerCase() === "usdt"
        );

        if (ethCoin) setSwapFromCurrency(ethCoin);
        if (usdtCoin) setSwapToCurrency(usdtCoin);

        if (ethCoin) setLimitFromCurrency(ethCoin);
        if (usdtCoin) setLimitToCurrency(usdtCoin);

        if (ethCoin) setSendCurrency(ethCoin);
      })
      .catch((error) => console.error("Error fetching coin data:", error));
  }, []);

  const [fromCurrencyValue, setFromCurrencyValue] = useState("");
  const [toCurrencyValue, setToCurrencyValue] = useState("");
  const [fromUsdValue, setFromUsdValue] = useState(0);
  const [toUsdValue, setToUsdValue] = useState(0);

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

    // Convert the swapFromCurrency value to USD
    const usdFromValue = numericValue * swapFromCurrency.current_price;
    setFromUsdValue(usdFromValue);

    // Convert that USD value into swapToCurrency
    const toValue = usdFromValue / swapToCurrency.current_price;
    setToCurrencyValue(toValue);

    //Convert the swapToCurrency value to USD
    const usdToValue = toValue * swapToCurrency.current_price;
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

    // Convert the swapToCurrency value to USD
    const usdToValue = numericValue * swapToCurrency.current_price;
    setToUsdValue(usdToValue);

    // Convert that USD value into swapFromCurrency
    const fromValue = usdToValue / swapFromCurrency.current_price;
    setFromCurrencyValue(fromValue);

    //Convert the swapFromCurrency value to USD
    const usdFromValue = fromValue * swapFromCurrency.current_price;
    setFromUsdValue(usdFromValue);
  };

  const swapCurrency = () => {
    setSwapFromCurrency(swapToCurrency);
    setSwapToCurrency(swapFromCurrency);

    setFromCurrencyValue(toCurrencyValue);
    setToCurrencyValue(fromCurrencyValue);

    setFromUsdValue(toUsdValue);
    setToUsdValue(fromUsdValue);

    setLimitFromCurrency(limitToCurrency);
    setLimitToCurrency(limitFromCurrency);
  };

  const handleCoinSelection = (selectedCoin, type, tradeType) => {
    const isFromType = type === "from";

    // Determine the correct state variables based on trade type
    const otherType =
      tradeType === "swap"
        ? isFromType
          ? swapToCurrency
          : swapFromCurrency
        : isFromType
        ? limitToCurrency
        : limitFromCurrency;

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

    // If selecting the same coin, swap them
    if (selectedCoin.id === otherType.id) {
      swapCurrency();
    } else {
      if (tradeType === "swap") {
        isFromType
          ? setSwapFromCurrency(updatedCurrency)
          : setSwapToCurrency(updatedCurrency);
      } else {
        isFromType
          ? setLimitFromCurrency(updatedCurrency)
          : setLimitToCurrency(updatedCurrency);
      }
    }

    setActiveOverlay(null);
    resetValues();
  };

  const handleOverlay = (type, value) => {
    setActiveOverlay(value ? type : null);
  };

  const contextValue = {
    coins,
    sendCurrency,
    swapFromCurrency,
    swapToCurrency,
    limitFromCurrency,
    limitToCurrency,
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
