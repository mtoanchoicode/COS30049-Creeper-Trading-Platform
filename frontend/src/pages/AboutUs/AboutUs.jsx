import React from 'react'
import BuyCryptoFlow from "../../components/AboutUs-page/StepsFlow/BuyCryptoFlow";
import WalletList from "../../components/AboutUs-page/WalletList/WalletList";
import CreeperEcosystem from "../../components/AboutUs-page/CreeperEcosystem/CreeperEcosystem";
import AboutCenter from "../../components/AboutUs-page/AboutCenter/AboutCenter";
import FounderDetails from "../../components/AboutUs-page/FounderDetails/FounderDetails";


const AboutUS = () => {
  return (
    <>
      <AboutCenter/>
      <BuyCryptoFlow />
      <WalletList />
      <CreeperEcosystem/>
      <FounderDetails/>
    </>
  )
}

export default AboutUS;