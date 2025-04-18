import React, { useContext, useState } from "react";
import { CloseOutlined } from "@ant-design/icons";
import "./TokensSelection.css";
import { CoinContext } from "../../../contexts/CoinContext";

const shortenAddress = (address) => {
  return `${address.slice(0, 17)}...${address.slice(-4)}`;
};
const TokensSelection = ({ type, tradeType }) => {
  const [copied, setCopied] = useState(null);

  const copyToClipboard = (address) => {
    navigator.clipboard.writeText(address);
    setCopied(address);
    setTimeout(() => setCopied(null), 1000);
  };
  
  const { localCoins, activeOverlay, setActiveOverlay, handleCoinSelection } =
    useContext(CoinContext);

  const filteredCoins =
    tradeType === "swap"
      ? localCoins.slice(3)
      : tradeType === "faucet"
      ? localCoins.slice(1)
      : localCoins.slice(0, 3);
  return (
    activeOverlay === type && (
      <div className={`convert-coin-selection ${tradeType} ${type}`}>
        <div className="convert-coin-selection-container">
          <div className="convert-coin-selection-container-top">
            <p>Select a token</p>
            <div
              className="convert-coin-selection-container-close"
              onClick={() => setActiveOverlay(null)}
            >
              <CloseOutlined />
            </div>
          </div>
          <div className="convert-coin-selection-container-list">
            {filteredCoins.map((coin) => (
              <div
                key={coin.name}
                className="selection-coin-item"
                onClick={() => handleCoinSelection(coin, type, tradeType)}
              >
                <img
                  src={coin.image}
                  alt={coin.name}
                  className="selection-coin-icon"
                />
                <div className="selection-coin-main">
                  <div className="selection-coin-header">
                    <p className="selection-coin-title">{coin.name}</p>
                    <p className="selection-coin-symbol">
                      {coin.symbol.toUpperCase()}
                    </p>
                    <p>
                      <a
                        href={`https://sepolia.etherscan.io/address/${coin.address}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {shortenAddress(coin.address)}{" "}
                      </a>

                      <div
                        className="copy-btn"
                        style={{ display: "inline", marginLeft: "1rem" }}
                        onClick={(e) => {
                          e.stopPropagation(); // Prevent triggering parent onClick
                          copyToClipboard(coin.address);
                        }}
                      >
                        {copied === coin.address ? (
                          <i className="fa-solid fa-check"></i>
                        ) : (
                          <i className="fa-solid fa-copy"></i>
                        )}
                      </div>
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  );
};

export default TokensSelection;
