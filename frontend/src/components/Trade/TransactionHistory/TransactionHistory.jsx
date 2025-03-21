import React, { useState, useEffect } from "react";
import "./TransactionHistory.css";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const shortenAddress = (address) => {
  return `${address.slice(0, 17)}...${address.slice(-4)}`;
};

const TransactionHistory = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [copied, setCopied] = useState(null);

  const copyToClipboard = (address) => {
    navigator.clipboard.writeText(address);
    setCopied(address);
    setTimeout(() => setCopied(null), 1000);
  };

  return (
    <div className="transaction-history">
      <table className="transaction-table">
        <thead>
          <tr>
            <th>Transaction Hash</th>
            <th>Method</th>
            <th>Age</th>
            <th>From</th>
            <th>To</th>
            <th>Amount</th>
            <th>Fee</th>
            <th>Token</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((txn, index) => (
            <tr key={index}>
              <td>
                <div>
                  <a
                    href={`https://sepolia.etherscan.io/tx/${txn.hashCode}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {shortenAddress(txn.hashCode)}
                  </a>
                  <div
                    className="copy-btn"
                    onClick={() => copyToClipboard(txn.hashCode)}
                  >
                    {copied === txn.hashCode ? (
                      <i className="fa-solid fa-check"></i>
                    ) : (
                      <i className="fa-solid fa-copy"></i>
                    )}
                  </div>
                </div>
              </td>
              <td>{txn.method}</td>
              <td>{txn.age || "N/A"}</td>
              <td>
                <div>
                  <a
                    href={`https://sepolia.etherscan.io/address/${txn.addressFrom}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {shortenAddress(txn.addressFrom)}
                  </a>
                  <div
                    className="copy-btn"
                    onClick={() => copyToClipboard(txn.addressFrom)}
                  >
                    {copied === txn.addressFrom ? (
                      <i className="fa-solid fa-check"></i>
                    ) : (
                      <i className="fa-solid fa-copy"></i>
                    )}
                  </div>
                </div>
              </td>
              <td>
                <div>
                  <a
                    href={`https://sepolia.etherscan.io/address/${txn.addressTo}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {shortenAddress(txn.addressTo)}
                  </a>
                  <div
                    className="copy-btn"
                    onClick={() => copyToClipboard(txn.addressTo)}
                  >
                    {copied === txn.addressTo ? (
                      <i className="fa-solid fa-check"></i>
                    ) : (
                      <i className="fa-solid fa-copy"></i>
                    )}
                  </div>
                </div>
              </td>
              <td>{txn.amount}</td>
              <td>{txn.fee}</td>
              <td>{txn.tokenID}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionHistory;
