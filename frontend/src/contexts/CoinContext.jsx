import React, { createContext, useState, useEffect } from "react";
import lnx_icon from "../assets/LNX Icon.png";
import cep_icon from "../assets/CEP Icon.png";
import sepolica_icon from "../assets/Sepolia Icon.png";

export const CoinContext = createContext();

const CoinProvider = ({ children }) => {
  const [coins, setCoins] = useState([]);
  const [activeOverlay, setActiveOverlay] = useState(null);
  const [ethCoin, setEthCoin] = useState("");

  useEffect(() => {
    fetch(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=20&page=1&sparkline=false"
    )
      .then((response) => response.json())
      .then((data) => {
        setCoins(data);

        const ethCoin = data.find(
          (coin) => coin.symbol.toLowerCase() === "eth"
        );

        if (ethCoin) setEthCoin(ethCoin);
      })
      .catch((error) => console.error("Error fetching coin data:", error));
  }, []);

  const localCoins = [
    {
      id: "eth",
      name: "SepoliaETH",
      symbol: "ETH",
      image: sepolica_icon,
      current_price: ethCoin.current_price,
      address: null,
    },
    {
      id: "cep",
      name: "Creeper Trading Token",
      symbol: "CEP",
      image: cep_icon,
      current_price: 2,
      address: "0x1559368328F951a72da9B7571C6611667dfc72d2"
    },
    {
      id: "lnx",
      name: "Ancient Forest",
      symbol: "LNX",
      image: lnx_icon,
      current_price: 1,
      address: "0xD1e9eac1381B94421cBDAB76875d8086e7Def8D9"
    },
  ];

  const [buyCurrency, setBuyCurrency] = useState(localCoins[1]);

  const [sendCurrency, setSendCurrency] = useState(localCoins[0]);
  const [sendCurrencyValue, setSendCurrencyValue] = useState(0);

  const [limitFromCurrency, setLimitFromCurrency] = useState(localCoins[1]);
  const [limitToCurrency, setLimitToCurrency] = useState(localCoins[2]);

  const [limitFromCurrencyValue, setLimitFromCurrencyValue] = useState("");
  const [limitToCurrencyValue, setLimitToCurrencyValue] = useState("");

  const [swapFromCurrency, setSwapFromCurrency] = useState(localCoins[1]);
  const [swapToCurrency, setSwapToCurrency] = useState(localCoins[2]);

  const [swapFromCurrencyValue, setSwapFromCurrencyValue] = useState("");
  const [swapToCurrencyValue, setSwapToCurrencyValue] = useState("");

  const [swapFromUsdValue, setSwapFromUsdValue] = useState(0);
  const [swapToUsdValue, setSwapToUsdValue] = useState(0);

  const resetValues = () => {
    setSwapFromCurrencyValue("");
    setSwapToCurrencyValue("");
    setSwapFromUsdValue("");
    setSwapToUsdValue("");

    setLimitFromCurrencyValue("");

    setSendCurrencyValue("");
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
    localCoins,
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
