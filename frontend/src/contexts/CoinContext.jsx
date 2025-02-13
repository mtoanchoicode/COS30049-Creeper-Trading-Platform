import React, { createContext, useState, useEffect } from "react";

export const CoinContext = createContext();

const CoinProvider = ({ children }) => {
  const [coins, setCoins] = useState([]);
  const [activeOverlay, setActiveOverlay] = useState(null);

  const defaultCurrency = {
    symbol: "USD", // Default symbol
    name: "US Dollar", // Default name
  };

  const [buyCurrency, setBuyCurrency] = useState(null);

  const [sendCurrency, setSendCurrency] = useState(defaultCurrency);
  const [sendCurrencyValue, setSendCurrencyValue] = useState(0);

  const [limitFromCurrency, setLimitFromCurrency] = useState(defaultCurrency);
  const [limitToCurrency, setLimitToCurrency] = useState(defaultCurrency);
  const [limitFromCurrencyValue, setLimitFromCurrencyValue] = useState("");
  const [limitToCurrencyValue, setLimitToCurrencyValue] = useState("");

  const [swapFromCurrency, setSwapFromCurrency] = useState(defaultCurrency);
  const [swapToCurrency, setSwapToCurrency] = useState(defaultCurrency);
  const [swapFromCurrencyValue, setSwapFromCurrencyValue] = useState("");
  const [swapToCurrencyValue, setSwapToCurrencyValue] = useState("");
  const [swapFromUsdValue, setSwapFromUsdValue] = useState(0);
  const [swapToUsdValue, setSwapToUsdValue] = useState(0);
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
        const usdcCoin = data.find(
          (coin) => coin.symbol.toLowerCase() === "usdc"
        );

        if (ethCoin) setSwapFromCurrency(ethCoin);
        if (usdtCoin) setSwapToCurrency(usdtCoin);

        if (ethCoin) setLimitFromCurrency(ethCoin);
        if (usdcCoin) setLimitToCurrency(usdcCoin);

        if (ethCoin) setSendCurrency(ethCoin);
      })
      .catch((error) => console.error("Error fetching coin data:", error));
  }, []);

  const resetValues = () => {
    setSwapFromCurrencyValue("");
    setSwapToCurrencyValue("");
    setSwapFromUsdValue("");
    setSwapToUsdValue("");

    setLimitFromCurrencyValue(""); 
  setLimitToCurrencyValue(""); 
  };

  const handleCurrencyValueChange = (e, type, tradeType) => {
    const value = e.target.value;

    if (value === "") {
      resetValues();
      return;
    }

    const minmaxValue = Math.max(0, Math.min(10000, Number(value)));
    const numericValue = parseFloat(minmaxValue);

    const fromCurrency =
      tradeType === "swap" ? swapFromCurrency : limitFromCurrency;
    const toCurrency = tradeType === "swap" ? swapToCurrency : limitToCurrency;
    const setFromCurrencyValue =
      tradeType === "swap"
        ? setSwapFromCurrencyValue
        : setLimitFromCurrencyValue;
    const setToCurrencyValue =
      tradeType === "swap" ? setSwapToCurrencyValue : setLimitToCurrencyValue;
    const setFromUsdValue =
      tradeType === "swap" ? setSwapFromUsdValue : () => {};
    const setToUsdValue = tradeType === "swap" ? setSwapToUsdValue : () => {};

    if (type === "From") {
      setFromCurrencyValue(numericValue);

      const usdFromValue = numericValue * fromCurrency.current_price;
      setFromUsdValue(usdFromValue);

      const toValue = usdFromValue / toCurrency.current_price;
      setToCurrencyValue(toValue);

      const usdToValue = toValue * toCurrency.current_price;
      setToUsdValue(usdToValue);
    } else if (type === "To") {
      setToCurrencyValue(numericValue);

      const usdToValue = numericValue * toCurrency.current_price;
      setToUsdValue(usdToValue);

      const fromValue = usdToValue / fromCurrency.current_price;
      setFromCurrencyValue(fromValue);

      const usdFromValue = fromValue * fromCurrency.current_price;
      setFromUsdValue(usdFromValue);
    }
  };

  const handleSendCurrencyValueChange = (input) => {
    let numericValue = typeof input === "number" ? input : parseFloat(input);

    if (isNaN(numericValue) || numericValue < 0) {
      setSendCurrencyValue(0);
      return;
    }

    if (!sendCurrency || !sendCurrency.current_price) {
      console.error("sendCurrency or its price is undefined");
      setSendCurrencyValue(0);
      return;
    }

    const amount = numericValue / sendCurrency.current_price;
    setSendCurrencyValue(amount);
  };

  const swapCurrency = (type) => {
    if (type === "swap") {
      setSwapFromCurrency(swapToCurrency);
      setSwapToCurrency(swapFromCurrency);

      setSwapFromCurrencyValue(swapToCurrencyValue);
      setSwapToCurrencyValue(swapFromCurrencyValue);

      setSwapFromUsdValue(swapToUsdValue);
      setSwapToUsdValue(swapFromUsdValue);
    }
    if (type === "limit") {
      setLimitFromCurrency(limitToCurrency);
      setLimitToCurrency(limitFromCurrency);
    }
  };

  const handleCoinSelection = (selectedCoin, type, tradeType) => {
    const isFromType = type === "from";

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

    if (tradeType === "swap") {
      let otherType = isFromType ? swapToCurrency : swapFromCurrency;
      if (selectedCoin.id === otherType.id) {
        swapCurrency();
      } else {
        if (isFromType) {
          setSwapFromCurrency(updatedCurrency);
        } else {
          setSwapToCurrency(updatedCurrency);
        }
      }
    } else if (tradeType === "limit") {
      if (isFromType) {
        setLimitFromCurrency(updatedCurrency);
      } else {
        setLimitToCurrency(updatedCurrency);
      }
    } else if (tradeType === "send") {
      setSendCurrency(updatedCurrency);
    } else if (tradeType === "buy") {
      setBuyCurrency(updatedCurrency);
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
    sendCurrencyValue,
    buyCurrency,
    swapFromCurrency,
    swapToCurrency,
    limitFromCurrency,
    limitToCurrency,
    limitFromCurrencyValue,
    limitToCurrencyValue,
    swapFromCurrencyValue,
    swapToCurrencyValue,
    swapFromUsdValue,
    swapToUsdValue,
    activeOverlay,
    swapCurrency,
    handleCoinSelection,
    handleOverlay,
    setActiveOverlay,
    handleCurrencyValueChange,
    handleSendCurrencyValueChange,
  };

  return (
    <CoinContext.Provider value={contextValue}>{children}</CoinContext.Provider>
  );
};

export default CoinProvider;
