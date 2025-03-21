import React, { createContext, useState, useEffect } from "react";
import { ethers } from "ethers";
import lnx_icon from "../assets/LNX Icon.png";
import cep_icon from "../assets/CEP Icon.png";
import sepolica_icon from "../assets/Sepolia Icon.png";
import eth_icon from "../assets/eth.png";
import wbtc_icon from "../assets/wbtc.png";
import usdt_icon from "../assets/usdt.png";
import link_icon from "../assets/link.png";

// CoinContext
export const CoinContext = createContext();

const CoinProvider = ({ children }) => {
  const [coins, setCoins] = useState([]);
  const [activeOverlay, setActiveOverlay] = useState(null);
  const [ethCoin, setEthCoin] = useState(null);
  const [linkCoin, setLinkCoin] = useState(null);
  const [wbtcCoin, setWbtCoin] = useState(null);
  const [usdtCoin, setUsdtCoin] = useState(null);

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
        const linkCoin = data.find(
          (coin) => coin.symbol.toLowerCase() === "link"
        );
        const wbtcCoin = data.find(
          (coin) => coin.symbol.toLowerCase() === "wbtc"
        );
        const usdtCoin = data.find(
          (coin) => coin.symbol.toLowerCase() === "usdt"
        );

        if (ethCoin) setEthCoin(ethCoin);
        if (linkCoin) setLinkCoin(linkCoin);
        if (wbtcCoin) setWbtCoin(wbtcCoin);
        if (usdtCoin) setUsdtCoin(usdtCoin);
      })
      .catch((error) => console.error("Error fetching coin data:", error));
  }, []);

  const localCoins = [
    {
      id: "eth",
      name: "SepoliaETH",
      address: "0x0000000000000000000000000000000000000000",
      symbol: "ETH",
      image: sepolica_icon,
      current_price: ethCoin?.current_price ?? 1868,
    },
    {
      id: "cep",
      name: "Creeper Trading Token",
      address: "0x1559368328F951a72da9B7571C6611667dfc72d2",
      symbol: "CEP",
      image: cep_icon,
      current_price: 2,
    },
    {
      id: "lnx",
      name: "Ancient Forest",
      address: "0xD1e9eac1381B94421cBDAB76875d8086e7Def8D9",
      symbol: "LNX",
      image: lnx_icon,
      current_price: 1,
    },
    {
      id: "eth",
      name: "Ethereum",
      address: "0x5F29D014a869Ce3869c841790f5E1dEcfb273468",
      symbol: "ETH",
      image: eth_icon,
      current_price: ethCoin?.current_price ?? 1868,
    },
    {
      id: "link",
      name: "Chainlink",
      address: "0x860e57dD7c2eA7d9D4b05598B0a3A8668B8c2d62",
      symbol: "LINK",
      image: link_icon,
      current_price: linkCoin?.current_price ?? 15,
    },
    {
      id: "usdt",
      name: "Tether",
      address: "0x4B381C5B09482C10feAB7730b21Cf97D1d45EBd1",
      symbol: "USDT",
      image: usdt_icon,
      current_price: usdtCoin?.current_price ?? 1,
    },
    {
      id: "wbtc",
      name: "Wrapped Bitcoin",
      address: "0x0919d20cC9DEf0d60D860030C247BD213a0A22b0",
      symbol: "WBTC",
      image: wbtc_icon,
      current_price: wbtcCoin?.current_price ?? 80000,
    },
  ];

  const [sendTokenAddress, setSendTokenAddress] = useState(
    localCoins[0]?.address || null
  );

  const [buyCurrency, setBuyCurrency] = useState(localCoins[1]);
  const [buyCurrencyValue, setBuyCurrencyValue] = useState(0);

  const [faucetCurrency, setfaucetCurrency] = useState(localCoins[1]);

  const [sendCurrency, setSendCurrency] = useState(localCoins[0]);
  const [sendCurrencyValue, setSendCurrencyValue] = useState(0);

  const [swapFromCurrency, setSwapFromCurrency] = useState(localCoins[5]);
  const [swapToCurrency, setSwapToCurrency] = useState(localCoins[4]);

  const [swapFromCurrencyValue, setSwapFromCurrencyValue] = useState("");
  const [swapToCurrencyValue, setSwapToCurrencyValue] = useState("");

  const [swapFromUsdValue, setSwapFromUsdValue] = useState(0);
  const [swapToUsdValue, setSwapToUsdValue] = useState(0);

  const resetValues = () => {
    setSwapFromCurrencyValue("");
    setSwapToCurrencyValue("");
    setSwapFromUsdValue("");
    setSwapToUsdValue("");
    setSendCurrencyValue("");
  };

  const handleCurrencyValueChange = (e, type, tradeType) => {
    const value = e.target.value;

    if (value === "") {
      resetValues();
      return;
    }

    const minmaxValue = Math.max(0, Math.min(10000, Number(value)));
    const numericValue = parseFloat(minmaxValue);

    const fromCurrency = swapFromCurrency;
    const toCurrency = swapToCurrency;
    const setFromUsdValue =
      tradeType === "swap" ? setSwapFromUsdValue : () => {};
    const setToUsdValue = tradeType === "swap" ? setSwapToUsdValue : () => {};

    if (type === "From") {
      setSwapFromCurrencyValue(numericValue);

      const usdFromValue = numericValue * fromCurrency.current_price;
      setFromUsdValue(usdFromValue);

      const toValue = usdFromValue / toCurrency.current_price;
      setSwapToCurrencyValue(toValue);

      const usdToValue = toValue * toCurrency.current_price;
      setToUsdValue(usdToValue);
    } else if (type === "To") {
      setSwapToCurrencyValue(numericValue);

      const usdToValue = numericValue * toCurrency.current_price;
      setToUsdValue(usdToValue);

      const fromValue = usdToValue / fromCurrency.current_price;
      setSwapFromCurrencyValue(fromValue);

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

  const handleBuyCurrencyValueChange = (input) => {
    let numericValue = typeof input === "number" ? input : parseFloat(input);
    if (isNaN(numericValue) || numericValue < 0) {
      setBuyCurrencyValue(0);
      return;
    }

    if (!buyCurrency || !buyCurrency.current_price) {
      console.error("sendCurrency or its price is undefined");
      setBuyCurrencyValue(0);
      return;
    }

    const amount = numericValue / buyCurrency.current_price;
    setBuyCurrencyValue(amount);
  };

  const swapCurrency = () => {
    setSwapFromCurrency(swapToCurrency);
    setSwapToCurrency(swapFromCurrency);

    setSwapFromCurrencyValue(swapToCurrencyValue);
    setSwapToCurrencyValue(swapFromCurrencyValue);

    setSwapFromUsdValue(swapToUsdValue);
    setSwapToUsdValue(swapFromUsdValue);
  };

  const handleCoinSelection = (selectedCoin, type, tradeType) => {
    const isFromType = type === "from";

    const updatedCurrency = {
      ...selectedCoin,
      name: selectedCoin.name,
      symbol: selectedCoin.symbol.toUpperCase(),
      image: selectedCoin.image,
      current_price: selectedCoin.current_price,
      address: selectedCoin.address || null,
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
    } else if (tradeType === "send") {
      setSendTokenAddress(updatedCurrency.address || null);
      setSendCurrency(updatedCurrency);
    } else if (tradeType === "faucet") {
      setfaucetCurrency(updatedCurrency);
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
    sendTokenAddress,
    setSendTokenAddress,
    buyCurrency,
    buyCurrencyValue,
    swapFromCurrency,
    swapToCurrency,
    swapFromCurrencyValue,
    swapToCurrencyValue,
    swapFromUsdValue,
    swapToUsdValue,
    activeOverlay,
    swapCurrency,
    handleCoinSelection,
    handleOverlay,
    setActiveOverlay,
    handleBuyCurrencyValueChange,
    handleCurrencyValueChange,
    handleSendCurrencyValueChange,
    faucetCurrency,
    setfaucetCurrency,
    resetValues,
  };

  return (
    <CoinContext.Provider value={contextValue}>{children}</CoinContext.Provider>
  );
};

export default CoinProvider;
