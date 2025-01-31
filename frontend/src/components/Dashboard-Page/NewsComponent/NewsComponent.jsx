import React from "react";
import News from "./NewsComponentHandle";


const NewsComponent = () => {
  const NewsItem = [
    {
        id: 1, 
        NewTitle: "What is a cryptocurrency exchange?", 
        renderContent: () => (
            <div>
                <a href = "https://www.binance.com/en/price">Creeper</a>&nbsp;
                is digital marketplaces that enable users to buy and sell cryptocurrencies like  Bitcoin, Ethereum, and Tether.
            </div>
        ),
    },
    {
        id: 2, 
        NewTitle: "What is a cryptocurrency exchange?", 
        renderContent: () => (
            <div>
                <a href = "https://www.binance.com/en/price">Creeper</a>&nbsp;
                is digital marketplaces that enable users to buy and sell cryptocurrencies like  Bitcoin, Ethereum, and Tether.
            </div>
        ),
    },
    {
        id: 3, 
        NewTitle: "What is a cryptocurrency exchange?", 
        renderContent: () => (
            <div>
                <a href = "https://www.binance.com/en/price">Creeper</a>&nbsp;
                is digital marketplaces that enable users to buy and sell cryptocurrencies like  Bitcoin, Ethereum, and Tether.
            </div>
        ),
    },
    {
        id: 4, 
        NewTitle: "What is a cryptocurrency exchange?", 
        renderContent: () => (
            <div>
                <a href = "https://www.binance.com/en/price">Creeper</a>&nbsp;
                is digital marketplaces that enable users to buy and sell cryptocurrencies like  Bitcoin, Ethereum, and Tether.
            </div>
        ),
    },
  ];

  return <News 
    News={NewsItem} 
    title="News" 
  />;
};

export default NewsComponent;
