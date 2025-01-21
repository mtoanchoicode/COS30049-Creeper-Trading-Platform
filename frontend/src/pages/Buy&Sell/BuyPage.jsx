import React from 'react'
import BuyCryptoFlow from "../../components/BuySellCryptoFlow/BuyCryptoFlow";
import WalletList from "../../components/WalletList/WalletList";
import PopularConversions from "../../components/PopularConversions/PopularConversions";

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
