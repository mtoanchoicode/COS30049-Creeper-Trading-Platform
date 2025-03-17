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
  const [linkPrice, setLinkPrice] = useState(0);
  const [btcPrice, setBtcPrice] = useState(0);
  const [ethPrice, setEthPrice] = useState(0);

  const api = import.meta.env.VITE_INFURA_API_KEY;

  const provider = new ethers.JsonRpcProvider(
    `https://sepolia.infura.io/v3/${api}`
  );

  const contractAddress = "0x0ddbDB06684B2763789D8462996A7F8C74035C67";

  const contractABI = [
    {
      inputs: [],
      name: "getLatestBtcPrice",
      outputs: [{ internalType: "int256", name: "", type: "int256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "getLatestEthPrice",
      outputs: [{ internalType: "int256", name: "", type: "int256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "getLatestLinkPrice",
      outputs: [{ internalType: "int256", name: "", type: "int256" }],
      stateMutability: "view",
      type: "function",
    },
  ];

  let lastFetchTime = 0;
  const fetchInterval = 60000; // 60 seconds

  async function fetchPrices() {
    const now = Date.now();
    if (now - lastFetchTime < fetchInterval) return; // Prevent excessive calls
    lastFetchTime = now;

    const contract = new ethers.Contract(
      contractAddress,
      contractABI,
      provider
    );
    try {
      const rpcBtcPrice = await contract.getLatestBtcPrice();
      const rpcEthPrice = await contract.getLatestEthPrice();
      const rpcLinkPrice = await contract.getLatestLinkPrice();
    } catch (error) {
      console.error("Error fetching prices:", error);
    }
  }

  setInterval(fetchPrices, fetchInterval); // Fetch every 60 seconds

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

        const linkCoin = data.find(
          (coin) => coin.symbol.toLowerCase() === "link"
        );
        const wbtcCoin = data.find(
          (coin) => coin.symbol.toLowerCase() === "wbtc"
        );

        if (linkCoin) setLinkPrice(linkCoin.current_price);
        if (wbtcCoin) setBtcPrice(wbtcCoin.current_price);
        if (ethCoin) setEthPrice(ethCoin.current_price);
      })
      .catch((error) => console.error("Error fetching coin data:", error));
  }, []);

  const RPCcoins = [
    {
      id: "link",
      name: "Chainlink",
      symbol: "LINK",
      image: link_icon,
      current_price: linkPrice,
    },
    {
      id: "wbtc",
      name: "Wrap Bitcoin",
      symbol: "WBTC",
      image: wbtc_icon,
      current_price: btcPrice,
    },
    {
      id: "eth",
      name: "Ethereum",
      symbol: "ETH",
      image: eth_icon,
      current_price: ethPrice,
    },
    {
      id: "usdt",
      name: "Tether",
      symbol: "USDT",
      image: usdt_icon,
      current_price: 1,
    },
  ];

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
  ];

  const [sendTokenAddress, setSendTokenAddress] = useState(
    localCoins[0]?.address || null
  );

  const [buyCurrency, setBuyCurrency] = useState(localCoins[1]);
  const [buyCurrencyValue, setBuyCurrencyValue] = useState(0);

  const [faucetCurrency, setfaucetCurrency] = useState(localCoins[1]);

  const [sendCurrency, setSendCurrency] = useState(localCoins[0]);
  const [sendCurrencyValue, setSendCurrencyValue] = useState(0);

  const [swapFromCurrency, setSwapFromCurrency] = useState(RPCcoins[3]);
  const [swapToCurrency, setSwapToCurrency] = useState(RPCcoins[0]);

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

  const handleCurrencyValueChange = (e, type) => {
    const value = e.target.value;

    if (value === "") {
      resetValues();
      return;
    }

    const minmaxValue = Math.max(0, Math.min(10000, Number(value)));
    const numericValue = parseFloat(minmaxValue);

    const fromCurrency = swapFromCurrency;
    const toCurrency = swapToCurrency;

    if (type === "From") {
      setSwapFromCurrencyValue(numericValue);

      const usdFromValue = numericValue * fromCurrency.current_price;
      setSwapFromUsdValue(usdFromValue);

      const toValue = usdFromValue / toCurrency.current_price;
      setSwapToCurrencyValue(toValue);

      const usdToValue = toValue * toCurrency.current_price;
      setSwapToUsdValue(usdToValue);
    } else if (type === "To") {
      setSwapToCurrencyValue(numericValue);

      const usdToValue = numericValue * toCurrency.current_price;
      setSwapToUsdValue(usdToValue);

      const fromValue = usdToValue / fromCurrency.current_price;
      setSwapFromCurrencyValue(fromValue);

      const usdFromValue = fromValue * fromCurrency.current_price;
      setSwapFromUsdValue(usdFromValue);
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
    const updatedCurrency = {
      ...selectedCoin,
      name: selectedCoin.name,
      symbol: selectedCoin.symbol.toUpperCase(),
      image: selectedCoin.image,
      current_price: selectedCoin.current_price,
      market_cap: selectedCoin.market_cap,
      min_transaction_amount: selectedCoin.min_transaction_amount,
      max_transaction_amount: selectedCoin.max_transaction_amount,
      address: selectedCoin.address || null,
    };

    if (tradeType === "send") {
      setSendTokenAddress(updatedCurrency.address || null);
      setSendCurrency(updatedCurrency);
    } else if (tradeType === "faucet") {
      // setSendTokenAddress(updatedCurrency.address || null);
      setfaucetCurrency(updatedCurrency);
    } else if (tradeType === "swap") {
      if (type === "swapTo") {
        // If selecting swapTo and it's the same as swapFrom, swap them
        if (swapFromCurrency?.symbol === updatedCurrency.symbol) {
          setSwapFromCurrency(swapToCurrency);
        }
        setSwapToCurrency(updatedCurrency);
      } else if (type === "swapFrom") {
        // If selecting swapFrom and it's the same as swapTo, swap them
        if (swapToCurrency?.symbol === updatedCurrency.symbol) {
          setSwapToCurrency(swapFromCurrency);
        }
        setSwapFromCurrency(updatedCurrency);
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
    RPCcoins,
  };

  return (
    <CoinContext.Provider value={contextValue}>{children}</CoinContext.Provider>
  );
};

export default CoinProvider;
