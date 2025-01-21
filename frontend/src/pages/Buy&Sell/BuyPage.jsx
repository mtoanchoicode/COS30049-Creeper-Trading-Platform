import React from 'react'
import BuyCryptoFlow from "../../components/Buy&Sell-Page-Components/BuySellCryptoFlow/BuyCryptoFlow";
import WalletList from "../../components/Buy&Sell-Page-Components/WalletList/WalletList";
import PopularConversions from "../../components/Buy&Sell-Page-Components/PopularConversions/PopularConversions";

const BuyPage = () => {
  return (
    <>
      <BuyCryptoFlow />
      <WalletList />
      <PopularConversions />
    </>
  )
}

export default BuyPage;
