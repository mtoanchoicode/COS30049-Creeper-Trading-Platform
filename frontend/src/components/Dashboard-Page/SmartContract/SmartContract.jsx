import React from "react";
import SmartContractHandle from "./SmartContractHandle.jsx";


const SmartContract = () => {
  const items = [
    {  
        label: "Decentralization and Transparency", 
        renderContent: () => (  
            <span>No single party controls the contract, 
                and all details of transactions are publicly visible on the blockchain.</span>
        ),
    },
    {
        label: "High Security", 
        renderContent: () => (
           <span>Blockchain security mechanisms prevent fraud and unauthorized changes</span>
        ),   
    },
    {
        label: "Automation", 
        renderContent: () => ( 
            <span>Smart contracts execute agreed terms automatically 
                when conditions are met, reducing human involvement and errors.</span>
        ),
    },
    {
        label: "Programmability", 
        renderContent: () => ( 
            <span>Smart contracts can be programmed for complex functions, 
                enabling various applications in multiple fields.</span>
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


  
  
  