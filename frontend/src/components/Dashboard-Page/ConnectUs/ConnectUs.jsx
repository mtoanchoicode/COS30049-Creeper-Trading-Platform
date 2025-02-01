import React from "react";
import ConnectUsHandle from "./ConnectUsHandle.jsx";


const ConnectUs = () => {
  const items = [
    {  
        label: "Stay Connected", 
        href: "https://x.com/?lang=en",
        bgColor: "bg-Orange",
        renderContent: () => (  
            <span>Follow @Creeper on X for the latest updates</span>
        ),
    },
    {
        label: "Help center", 
        href: "https://x.com/?lang=en",
        bgColor: "bg-Blue",
        renderContent: () => (
           <span>Get Support</span>
        ),   
    },
    {
        label: "Blog", 
        href: "https://x.com/?lang=en",
        bgColor: "bg-Pink",
        renderContent: () => ( 
            <span>News from the dev team</span>
        ),
    },
  ];

  return <ConnectUsHandle 
    items={items} 
    title = "Connect with us"
  />;
};

export default ConnectUs;


  
  
  