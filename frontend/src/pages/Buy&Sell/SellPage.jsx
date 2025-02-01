import React from 'react'
import SellCryptoFlow from "../../components/Buy&Sell-Page-Components/BuySellCryptoFlow/SellCryptoFlow";
import WalletList from "../../components/Buy&Sell-Page-Components/WalletList/WalletList";
import PopularConversions from "../../components/Buy&Sell-Page-Components/PopularConversions/PopularConversions";

const SellPage = () => {
  return (
    <>
      <SellCryptoFlow />
      <WalletList />
      <PopularConversions />
    </>
  )
}

export default SellPage;
