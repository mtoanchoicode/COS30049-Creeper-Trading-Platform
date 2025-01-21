import React from "react";
import AccordionFQAs from "./AccordionFQAsHanle";


const FQAsections = () => {
  const items = [
    { 
        id: 1, 
        label: "What is a cryptocurrency exchange?", 
        renderContent: () => (
            <div>
                <a href = "https://www.binance.com/en/price">Creeper</a>&nbsp;
                is digital marketplaces that enable users to buy and sell cryptocurrencies like  Bitcoin, Ethereum, and Tether.
            </div>
        ),
    },
    {
        id: 2, 
        label: "What products does Creeper provide?", 
        renderContent: () => (
           <div>
                <p>
                Creeper is the world's leading cryptocurrency exchange, 
                catering to 235 million registered users in over 180 countries. 
                With low fees and over 350 cryptocurrencies to trade, 
                Creeper is the preferred exchange to trade Bitcoin, Altcoins, 
                and other virtual assets.
                </p> 
                <br></br>
                <li>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
                    sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </li>
                <li>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
                    sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </li>
                <li>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
                    sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </li>
                <li>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
                    sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </li>
                <li>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
                    sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </li>
           </div>
          
        ),   
    },
    {
        id: 3, 
        label: "How to track cryptocurrency prices", 
        renderContent: () => ( 
        <div>
            <a href = "https://www.binance.com/en/price">Creeper</a>&nbsp;
            is digital marketplaces that enable users to buy and sell cryptocurrencies like  Bitcoin, Ethereum, and Tether.
        </div>
        ),
    },
    {
        id: 4, 
        label: "How to trade cryptocurrencies on Creeper", 
        renderContent: () => (
            <p>
                 Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
                 sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
        ), 
    },
    {
        id: 5, 
        label: "How to earn from crypto on Creeper", 
        renderContent: () => (
        <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
            sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
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


  
  
  