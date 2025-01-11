import React from 'react';
import Steps from '../StepsFlow/StepsFlow';

import bellIcon from "../../assets/White Bell Icon.svg";
import globeIcon from "../../assets/GLobe Icon.svg";
import walletIcon from "../../assets/Wallet Icon.svg";
import userIcon from "../../assets/User Icon.svg";

const BuyCryptoFlow = () => {
  const steps = [
    { 
        src: bellIcon, 
        alt: 'picture of step 1',
        desc: 'Enter Amount' 
    },
    { 
        src: globeIcon, 
        alt: 'picture of step 2',
        desc: 'Select Payment' 
    },
    { 
        src: walletIcon, 
        alt: 'picture of step 3',
        desc: 'Confirm Order' 
    },
    { 
        src: userIcon, 
        alt: 'picture of step 4',
        desc: 'Receive Crypto' 
    },
  ];

  return <Steps steps={steps} title="How to Buy Crypto" />;
};

export default BuyCryptoFlow;
