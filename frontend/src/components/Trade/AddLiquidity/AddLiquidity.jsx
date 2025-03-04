import React, { useContext, useState } from "react";
import { ExportOutlined } from "@ant-design/icons";
import "./AddLiquidity.css"

const addLiquidity = (props) => {
  return (
    <div className="addLiquidity_container">
      <div className="addLiquidity_top">
        <span>You are adding the coin to CEP / LNX pool </span>
      </div>

      <div className="addLiquidity_token_container">
        <div className="addLiquidity_token">
            <p>CEP / LNX </p>
        </div>

        <div className="addLiquidity_token_link">
            <a
                className="trade-contractAddress"
                href={`https://sepolia.etherscan.io/address/${props.address}`}
                target="_blank"
            >
            <span>0x...xx</span>
            <ExportOutlined />
            </a>
        </div>

        <div className="addLiquidity_rate">
            <p>add 0.1% of balance</p>
        </div>
      </div>

      <div className="addLiquidity_reservers_container">
        <div className="addLiquidity_pool_heading">
            <p>Pool Balance</p>
        </div>

        <div className="addLiquidity_token">
            <div className="addLiquidity_CEP_reservers">
                <p>{props.CEP} CEP </p>
            </div>

            <div className="addLiquidity_LNX_reservers">
                <p>{props.LNX} LNX</p>
            </div>
        </div>

        <div className="addLiquidity_line_container">
            <div className="Liquidity_Line CEP_line">
               
            </div>

            <div className="Liquidity_Line LNX_line">
                
            </div>
        </div>
        
      </div>
    </div>
  );
};

export default addLiquidity;
