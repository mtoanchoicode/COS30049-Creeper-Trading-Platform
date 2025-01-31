import React from "react";
import PopularConversions from "./PopularConversionsHandle";

import CoinIcon from "../../../assets/Coin-icon.svg";
import Cardpos from "../../../assets/Card-pos.svg";
import ShopingCart from "../../../assets/Shopping-cart.svg";
import BuyCoin from "../../../assets/Buy-crypto.svg";

const PopularConversionsList = () => {
  const conversions = [
    {
      src_1: CoinIcon,
      alt_1: "picture of step 1",
      src_2: Cardpos,
      alt_2: "picture of step 12",
      LinkTitle: "USDT to USD",
      PriceDifference: "1 USDT = 0.999364 USD"
    },
    {
        src_1: Cardpos,
        alt_1: "picture of step 13",
        src_2: CoinIcon,
        alt_2: "picture of step 14",
        LinkTitle: "USDT to USD",
        PriceDifference: "1 USDT = 0.999364 USD"
    },
    {
      src_1: ShopingCart,
      alt_1: "picture of step 15",
      src_2: ShopingCart,
      alt_2: "picture of step 16",
      LinkTitle: "USDT to USD",
      PriceDifference: "1 USDT = 0.999364 USD"
    },
    {
        src_1: BuyCoin,
        alt_1: "picture of step 17",
        src_2: ShopingCart,
        alt_2: "picture of step 18",
        LinkTitle: "USDT to USD",
        PriceDifference: "1 USDT = 0.999364 USD"
    },
    {
        src_1: BuyCoin,
        alt_1: "picture of step 17",
        src_2: ShopingCart,
        alt_2: "picture of step 18",
        LinkTitle: "USDT to USD",
        PriceDifference: "1 USDT = 0.999364 USD"
    },
    {
        src_1: BuyCoin,
        alt_1: "picture of step 17",
        src_2: ShopingCart,
        alt_2: "picture of step 18",
        LinkTitle: "USDT to USD",
        PriceDifference: "1 USDT = 0.999364 USD"
    },
  ];

  return <PopularConversions 
    conversions={conversions} 
    title="Popular Tether USDt Conversions" 
    subtitle = "A selection of other popular currency conversions of Tether USDt to various fiat currencies."
  />;
};

export default PopularConversionsList;
