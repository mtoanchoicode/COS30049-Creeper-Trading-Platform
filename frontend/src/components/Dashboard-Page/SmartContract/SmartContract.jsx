import React from "react";
import SmartContractHandle from "./SmartContractHandle.jsx";


const SmartContract = () => {
  const items = [
    {  
        label: "Stay Connected", 
        renderContent: () => (  
            <span>Follow @Creeper on X for the latest updates</span>
        ),
    },
    {
        label: "Help center", 
        renderContent: () => (
           <span>Hello</span>
        ),   
    },
    {
        label: "Blog", 
        renderContent: () => ( 
            <span>News from the dev team</span>
        ),
    },
    {
        label: "test", 
        renderContent: () => ( 
            <span>News from the dev team</span>
        ),
    },
  ];

  return <SmartContractHandle 
    items={items} 
    title = "Smart Contract"
    subtitle = "Lorem ispum ibesstd fadiya" 
  />;
};

export default SmartContract;


  
  
  