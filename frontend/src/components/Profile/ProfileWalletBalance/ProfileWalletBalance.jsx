import React, { useState } from "react";
import "./ProfileWalletBalance.css";

const ProfileWalletBalance = ({ walletBalance }) => {
  // Check if there are tokens available
  const hasTokens = walletBalance.tokenHoldings.length > 0;

  // Set initial selected token if available, otherwise null
  const [selectedToken, setSelectedToken] = useState(
    hasTokens ? walletBalance.tokenHoldings[0] : null
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
            {/* Display "--" if no tokens exist */}
            <p>
              {hasTokens
                ? `${parseFloat(selectedToken.balance).toFixed(2)}`
                : "--"}
            </p>

            {/* Show dropdown only if tokens exist */}
            <select
              value={selectedToken ? selectedToken.symbol : ""}
              onChange={(e) =>
                setSelectedToken(
                  walletBalance.tokenHoldings.find(
                    (token) => token.symbol === e.target.value
                  )
                )
              }
              disabled={!hasTokens} // Disable if no tokens
            >
              {hasTokens ? (
                walletBalance.tokenHoldings.map((token) => (
                  <option key={token.symbol} value={token.symbol}>
                    {token.symbol}
                  </option>
                ))
              ) : (
                <option value="">No Tokens</option>
              )}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileWalletBalance;
