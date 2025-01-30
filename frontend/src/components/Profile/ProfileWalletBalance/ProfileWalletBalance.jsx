import React, { useState } from "react";
import "./ProfileWalletBalance.css";

const ProfileWalletBalance = ({ walletBalance }) => {
  const [selectedToken, setSelectedToken] = useState(
    walletBalance.tokenHoldings[0]
  );

  return (
    <div className="profileWalletBalance-info">
      <div className="profileWalletBalance-header">
        <h2>Address</h2>
        <span>{walletBalance.walletAddress}</span>
      </div>
      <div className="profileWalletBalance-content">
        {/* ETH Balance */}
        <div className="profileWalletBalance-card">
          <h3>ETH Balance</h3>
          <p>~{parseFloat(walletBalance.ethBalance).toFixed(5)} ETH</p>
        </div>

        {/* Token Holdings */}
        <div className="profileWalletBalance-card">
          <h3>Token Holdings</h3>
          <div className="profileWalletBalance-tokenBalance">
            <p>{parseFloat(selectedToken.balance).toFixed(2)} ETH</p>
            <select
              value={selectedToken.symbol}
              onChange={(e) =>
                setSelectedToken(
                  walletBalance.tokenHoldings.find(
                    (token) => token.symbol === e.target.value
                  )
                )
              }
            >
              {walletBalance.tokenHoldings.map((token) => (
                <option key={token.symbol} value={token.symbol}>
                  {token.symbol}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileWalletBalance;
