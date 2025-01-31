import React from "react";
import "./ConnectUs.css"
import { Link } from "react-router-dom";

const ConnectUs = ({ items, title }) => {
    return (
        <section className="ConnectUs-container">
            <div className= "ConnectUs-title">
                <h1 className="ConnectUs-heading">
                    {title}
                </h1>
            </div>

            <div className = "ConnectUs-Block-Container">
                {items?.map((Item, index) => {
                    return (
                    <a href={Item.href} key = {index} className = {`ConnectUs-Block-Item ${Item.bgColor}`}>
                        <div className="ConnectUs-Label-Container"> 
                            <div className="ConnectUs-Label">
                                <span>{Item.label}</span>
                                <i className="fa-solid fa-arrow-right"></i>
                            </div>
                        </div>

                        <div className="ConnectUs-Content-Container">
                            {Item.renderContent()}
                        </div>
                    </a>
                    )
                })}
            </div>
        </section>
    )
}

export default ConnectUs