import React, { createContext, useState, useEffect } from "react";
import coinData from "../data/coins.json";

export const CoinContext = createContext();

const CoinProvider = ({ children }) => {
  const [coins, setCoins] = useState([]);
  const [activeOverlay, setActiveOverlay] = useState(null);

  const [fromCurrency, setFromCurrency] = useState({
    id: "ethereum",
  });
  const [toCurrency, setToCurrency] = useState({
    id: "tether",
  });

  useEffect(() => {
    fetch(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=25&page=1&sparkline=false"
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

        if (ethCoin) setFromCurrency(ethCoin);
        if (usdtCoin) setToCurrency(usdtCoin);
      })
      .catch((error) => console.error("Error fetching coin data:", error));
  }, []);

  console.log(coins);

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
