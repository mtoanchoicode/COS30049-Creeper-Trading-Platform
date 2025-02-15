import React from "react";
import "./SmartContract.css";
import LogoIcon from "../../../assets/Logo.png";

const SmartContractHandle = ({ items, title, subtitle }) => {
  return (
    <section className="SmartContract-container">
      <div className="SmartContract-side_2">
        <div className="SmartContract-title">
          <h1 className="SmartContract-heading">{title}</h1>

          <h2 className="SmartContract-Subheading">{subtitle}</h2>
        </div>

        <div className="SmartContract-Block-Container">
          {items?.map((item, index) => {
            return (
              <div key={index} className="SmartContract-Block">
                <div className="SmartContract-Block-Item">
                  <div className="SmartContract-Block-Heading">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="16 18 22 12 16 6"></polyline>
                      <polyline points="8 6 2 12 8 18"></polyline>
                    </svg>
                    <span>Smart Contract</span>
                  </div>

                  <div className="SmartContract-Content-Container">
                    <div className="SmartContract-Label-Container">
                      <span>{item.label}</span>
                    </div>

                    <div className="SmartContract-Content">
                      {item.renderContent()}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="SmartContract-side_1">
        <div className="SmartContract-Icon-Container layer1">
          <div className="SmartContract-Icon-Container layer2">
            <img src={LogoIcon} alt="Creeper icon"></img>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SmartContractHandle;
