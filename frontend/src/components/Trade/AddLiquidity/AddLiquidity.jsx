import React from "react";
import { ExportOutlined } from "@ant-design/icons";
import { Input } from "antd";
import "./AddLiquidity.css"

const addLiquidity = (props) => {
  
  const cepAmount = parseFloat(props.CEP);
  const lnxAmount = parseFloat(props.LNX);
  const total_reserve = cepAmount + lnxAmount;

  const reserve_CEP = (cepAmount) / (total_reserve) * 100
  const reserve_LNX = (lnxAmount) / (total_reserve) * 100

  const handleInputChangeCEP = (e) => {
    const value = e.target.value;
    if (/^\d*\.?\d*$/.test(value)) {
      // ✅ Allow only numbers and decimals
      props.setAmountCEP(value);
    }
  };

  const handleInputChangeLNX = (e) => {
    const value = e.target.value;
    if (/^\d*\.?\d*$/.test(value)) {
      // ✅ Allow only numbers and decimals
      props.setAmountLNX(value);
    }
  };

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
            <p>add to get the mint</p>
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
            <div 
            className="Liquidity_Line CEP_line"
            style={{ width: `${reserve_CEP}%` }}
            />
          
            <div 
            className="Liquidity_Line LNX_line"
            style={{ width: `${reserve_LNX}%` }}
            />
        </div>

        <div className="addLiquidity_input_container">
            <p>Enter amount of token CEP to add:</p>
            <Input
              className="addLiquidity_input"
              value={props.amountCEP}
              onChange={handleInputChangeCEP}
              disabled={props.isLoading}
              suffix="Tokens"
            />
            <p>Enter amount of token LNX to add:</p>
            <Input
             className="addLiquidity_input"
              value={props.amountLNX}
              onChange={handleInputChangeLNX}
              disabled={props.isLoading}
              suffix="Tokens"
            />
        </div>  
      </div>
    </div>
  );
};

export default addLiquidity;
