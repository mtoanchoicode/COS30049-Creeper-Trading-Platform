import React, { useState, useEffect } from "react";
import "./TransactionHistory.css";
import getAllTransactions from "../../../utils/getAllTransaction";
import { Spin } from "antd";

const TransactionHistory = ({ method }) => {
  const [transactions, setTransactions] = useState([]);
  const [error, setError] = useState(null);
  const [copied, setCopied] = useState(null);
  const [loading, setLoading] = useState(true); // Loading state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // State to track the selected category
  const [selectedMethod, setSelectedMethod] = useState(`${method}`);

  useEffect(() => {
    const fetchAllTransactions = async () => {
      setLoading(true);
      const data = await getAllTransactions();
      if (data) setTransactions(data.reverse());
      setLoading(false);
    };

    fetchAllTransactions();
  }, []);

  const filterTransaction = transactions.filter(
    (transaction) => transaction.Method === selectedMethod
  );

  const totalPages = Math.ceil(filterTransaction.length / itemsPerPage);
  const startIdx = (currentPage - 1) * itemsPerPage;
  const endIdx = startIdx + itemsPerPage;
  const paginatedTransactions = filterTransaction.slice(startIdx, endIdx);

  const shortenAddress = (address) => {
    return `${address.slice(0, 9)}...${address.slice(-4)}`;
  };

  const copyToClipboard = (address) => {
    navigator.clipboard.writeText(address);
    setCopied(address);

    // Reset copied state after 2 seconds
    setTimeout(() => setCopied(null), 2000);
  };

  const calculateAge = (timestamp) => {
    const Timenow = new Date();
    const createdAt = new Date(timestamp); // Convert timestamp to Date object
    const diffMs = Timenow - createdAt; // Difference in milliseconds

    // Convert to seconds, minutes, hours, etc.
    const seconds = Math.floor(diffMs / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (seconds < 60) return `${seconds} sec ago`;
    if (minutes < 60) return `${minutes} min ago`;
    if (hours < 24) return `${hours} hrs ago`;
    return `${days} days ago`;
  };

  return (
    <div className="transaction-history">
      {loading ? ( // Show loader while loading
        //<Loader/>
        <Spin tip="Loading" size="large" style={{ padding: 50 }}></Spin>
      ) : (
        <>
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
              {paginatedTransactions.map((txn, index) => (
                <tr key={index}>
                  <td>
                    <div>
                      <a
                        href={`https://sepolia.etherscan.io/tx/${txn.HashCode}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {shortenAddress(txn.HashCode)}
                      </a>
                      <div
                        className="copy-btn"
                        onClick={() => copyToClipboard(txn.HashCode)}
                      >
                        {copied === txn.HashCode ? (
                          <i className="fa-solid fa-check"></i>
                        ) : (
                          <i className="fa-solid fa-copy"></i>
                        )}
                      </div>
                    </div>
                  </td>
                  <td>{txn.Method}</td>
                  <td>{calculateAge(txn.CreatedAt) || "N/A"}</td>
                  <td>
                    <div>
                      <a
                        href={`https://sepolia.etherscan.io/address/${txn.AddressTo}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {shortenAddress(txn.AddressFrom)}
                      </a>
                      <div
                        className="copy-btn"
                        onClick={() => copyToClipboard(txn.AddressFrom)}
                      >
                        {copied === txn.AddressFrom ? (
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
                        href={`https://sepolia.etherscan.io/address/${txn.AddressTo}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {shortenAddress(txn.AddressTo)}
                      </a>
                      <div
                        className="copy-btn"
                        onClick={() => copyToClipboard(txn.AddressTo)}
                      >
                        {copied === txn.AddressTo ? (
                          <i className="fa-solid fa-check"></i>
                        ) : (
                          <i className="fa-solid fa-copy"></i>
                        )}
                      </div>
                    </div>
                  </td>
                  <td>{parseFloat(txn.Amount).toFixed(3)}</td>
                  <td>{parseFloat(txn.Fee).toFixed(3)}</td>
                  <td>
                    <div>
                      <a
                        href={`https://sepolia.etherscan.io/address/${txn.TokenAddress}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {shortenAddress(txn.TokenAddress)}
                      </a>
                      <div
                        className="copy-btn"
                        onClick={() => copyToClipboard(txn.TokenAddress)}
                      >
                        {copied === txn.TokenAddress ? (
                          <i className="fa-solid fa-check"></i>
                        ) : (
                          <i className="fa-solid fa-copy"></i>
                        )}
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="transaction-history-pagination">
            <button
              className={`transaction-history-pagination-btn ${
                currentPage === 1 ? "disabled" : ""
              }`}
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(currentPage - 1)}
            >
              <i className="fa-solid fa-chevron-left"></i>
            </button>
            <span>
              Page {currentPage} of {totalPages}
            </span>
            <button
              className={`transaction-history-pagination-btn ${
                currentPage === totalPages ? "disabled" : ""
              }`}
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(currentPage + 1)}
            >
              <i className="fa-solid fa-chevron-right"></i>
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default TransactionHistory;
