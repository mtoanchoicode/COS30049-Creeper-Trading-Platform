import React from "react";
import "./WalletList.css";
// import Icons from "../Icons/Icons"


const Wallets = ({wallets, title, subtitle}) => {
  return (
    <section className="Wallet-List-Container">
      <p className="Subtest-heading-walletlist">
          {subtitle}
      </p>
      <h3 className="Heading-title_walletlist">
          {title}
      </h3>
         
      <div className="WalletList-Item-Container">
          {wallets.map((wallet, index) => (
            <div className= "Wallet-Item" key = {index}>
              <div className= "Wallet-Image-Container">
                <img className= "Wallet-Image" alt={wallet.alt}  src={wallet.src}/>
              </div>
              <div className = "Wallet-Name-Container">
                <p>
                  {wallet.name}
                </p> 
              </div>                        
            </div>
          ))} 
      </div>
    </section> 
  );
};

export default Wallets;






