import React from "react";
import AccordionFQAs from "./AccordionFQAsHanle";


const FQAsections = () => {
  const items = [
    { 
        id: 1, 
        label: "What is the purpose of the Decentralized Trading System?", 
        renderContent: () => (
            <div>
                The system is designed to enable peer-to-peer trading of digital assets without intermediaries, 
                ensuring trustless, transparent, and secure transactions through blockchain technology and smart contracts.
            </div>
        ),
    },
    {
        id: 2, 
        label: "What products does Creeper provide?", 
        renderContent: () => (
           <div>
                <a href = "/">The Creeper</a>&nbsp;
                offers the following features:
                <br></br>
                <ul>
                    <li>
                        Trade with Smart Contract: Users can swap, limit ,send, and buy the digital assets
                    </li>
                    <li>
                        Search & Filter: Users can search and apply filters to find specific assets of interest.
                    </li>
                    <li>
                        Transaction History: Users can access their past trades for reference
                    </li>
                    <li>
                        Secure Trading with Smart Contracts: Smart contracts act as escrow, 
                        ensuring safe and transparent transactions.
                    </li>
                </ul>
           </div>
          
        ),   
    },
    {
        id: 3, 
        label: "How to track cryptocurrency prices", 
        renderContent: () => ( 
        <div>
            <a href = "https://www.binance.com/en/price">Creeper</a>&nbsp;
            provides the explore pages, , designed for users to effortlessly check coin prices and explore a wealth of exciting features. Dive in and unlock the potential of your crypto journey!
        </div>
        ),
    },
    {
        id: 4, 
        label: "How does the system ensure the security of trades?", 
        renderContent: () => (
            <p>
                 The system uses smart contracts as escrow, holding assets securely until both parties fulfill the trade conditions. 
                 This prevents fraud and ensures that transactions are completed fairly.
            </p>
        ), 
    },
    {
        id: 5, 
        label: "What is a network cost?", 
        renderContent: () => (
        <p>
            Every blockchain transaction has a non-refundable network cost, even if it fails. Validators use their resources 
            to determine a transaction's outcome, relying on their own computers to verify and process transactions without a 
            central authority. 
        </p>
        ), 
    },
  ];

  return <AccordionFQAs 
    items={items} 
    keepOthersOpen={false}
    title = "Frequently Asked Questions"
  />;
};

export default FQAsections;


  
  
  