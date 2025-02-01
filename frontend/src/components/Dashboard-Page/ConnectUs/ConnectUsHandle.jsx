import React from "react";
import "./SmartContract.css"
import { Link } from "react-router-dom";

const SmartContractHandle = ({ items, title }) => {
    return (
        <section className="SmartContract-container">
            <div className= "SmartContract-title">
                <h1 className="SmartContract-heading">
                    {title}
                </h1>
            </div>

            <div className = "SmartContract-Block-Container">
                {items?.map((item, index) => {
                    return (
                    <div key = {index} className = "SmartContract-Block-Item" >
                        <div className="SmartContract-Label-Container"> 
                            <div className="SmartContract-Label">
                                <span>{Item.label}</span>
                            </div>
                        </div>

                        <div className="SmartContract-Content-Container">
                            {Item.renderContent()}
                        </div>
                    </div>
                    )
                })}
            </div>
        </section>
    )
}

export default SmartContractHandle