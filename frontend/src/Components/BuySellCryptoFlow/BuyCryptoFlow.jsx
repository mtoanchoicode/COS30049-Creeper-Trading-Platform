import React from "react";
import Steps from "../StepsFlow/StepsFlow";

import CoinIcon from "../../assets/Coin-icon.svg";
import Cardpos from "../../assets/Card-pos.svg";
import ShopingCart from "../../assets/Shopping-cart.svg";
import BuyCoin from "../../assets/Buy-crypto.svg";

const BuyCryptoFlow = () => {
  const steps = [
    {
      src: CoinIcon,
      alt: "picture of step 1",
      desc: "Enter Amount",
    },
    {
      src: Cardpos,
      alt: "picture of step 2",
      desc: "Select Payment",
    },
    {
      src: ShopingCart,
      alt: "picture of step 3",
      desc: "Confirm Order",
    },
    {
      src: BuyCoin,
      alt: "picture of step 4",
      desc: "Receive Crypto",
    },
  ];

  return <Steps steps={steps} title="How to Buy Crypto" />;
};

export default BuyCryptoFlow;
