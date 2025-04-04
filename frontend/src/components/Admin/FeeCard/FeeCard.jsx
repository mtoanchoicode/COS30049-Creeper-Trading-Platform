import React, { useEffect, useState } from "react";
import "./FeeCard.css";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const FeeCard = ({ feeData }) => {
  console.log("gg", feeData);
  // Check if there are tokens available
  const hasTokens = feeData.length > 0;

  // State for the selected token
  const [selectedToken, setSelectedToken] = useState(null);

  // Set the first token as the default when `feeData` changes
  useEffect(() => {
    if (hasTokens) {
      setSelectedToken(feeData[0]); // Set the first token when `feeData` updates
    }
  }, [feeData]); // Run this effect whenever `feeData` changes

  // Calculate total balance of all tokens
  const totalBalance = feeData.reduce(
    (sum, token) => sum + (token.balance || 0),
    0
  );

  // Normalize balances as percentages
  const chartData = feeData.map((token) => ({
    name: token.symbol,
    percentage:
      totalBalance > 0 ? ((token.balance / totalBalance) * 100).toFixed(2) : 0,
  }));

  return (
    <div className="col-md-4">
      <div className="p-3 bg-white shadow-sm d-flex flex-column align-items-center rounded">
        <h3 className="fs-2">Total Fee</h3>
        <div className="adminFee-tokenBalance">
          {/* Display "--" if no tokens exist */}
          <p className="fs-4">
            {selectedToken
              ? `${parseFloat(selectedToken?.balance || 0).toFixed(5)}`
              : "--"}
          </p>

          {/* Show dropdown only if tokens exist */}
          <select
            value={selectedToken ? selectedToken.symbol : ""}
            onChange={(e) =>
              setSelectedToken(
                feeData.find((token) => token.symbol === e.target.value)
              )
            }
            disabled={!hasTokens} // Disable if no tokens
            className="fs-4"
          >
            {hasTokens ? (
              feeData.map((token) => (
                <option key={token.symbol} value={token.symbol}>
                  {token.symbol}
                </option>
              ))
            ) : (
              <option value="">No Tokens</option>
            )}
          </select>
        </div>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={chartData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="percentage" fill="#00da5b" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default FeeCard;
