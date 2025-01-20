import React from "react";
import AccordionFQAs from "./AccordionFQAsHanle";


const FQAsections = () => {
  const items = [
    { 
        id: 1, 
        title: "Question 1", 
        renderContent: () => (
            <p>Hello</p>
        ),
    },
    {
        id: 2, 
        title: "Question 2", 
        renderContent: () => (
            <p>
            Lorem ipsum dolor sit amet, 
            consectetuer adipiscing elit. 
            Aenean commodo ligula eget dolor. 
            Aenean massa. Cum sociis natoque penatibus et magnis 
            dis parturient montes, nascetur ridiculus mus. 
            Donec quam felis
           </p> 
        ),   
    },
    {
        id: 3, 
        title: "Question 3", 
        renderContent: () => ( 
        <div>
            <a href = "https://www.binance.com/en/price">Creeper</a>&nbsp;
            is digital marketplaces that enable users to buy and sell cryptocurrencies like  Bitcoin, Ethereum, and Tether.
        </div>
        ),
    },
    {
        id: 4, 
        title: "Question 4", 
        renderContent: () => (
            <button>Hello Veo</button>
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


  
  
  