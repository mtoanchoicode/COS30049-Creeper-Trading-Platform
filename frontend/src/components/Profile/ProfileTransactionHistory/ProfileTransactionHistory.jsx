import React, { useState } from "react";
import "./ProfileTransactionHistory.css";
import exportIcon from "../../../assets/Export Icon.svg";
import Icons from "../../Icons/Icons";
import shortenAddress from "../../../utils/utils";
import { CopyOutlined } from "@ant-design/icons";

const TransactionsHistory = ({ walletDetail }) => {
  const [view, setView] = useState("transactions");
  const transactionHistory = walletDetail.transactionHistory;

  const columns = ["Hash", "Method", "Block", "From", "To", "Amount", "Fee"];

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    alert("Copied to clipboard!");
  };

  const renderCell = (transactionHistory, column) => {
    const value = transactionHistory[column.toLowerCase().replace(" ", "")];
    if (["Hash", "From", "To"].includes(column)) {
      return (
        <div className="profileTH-AddressContainer">
          <div className="profileTH-TooltipContainer">
            <span className="profileTH-AddressText">
              {shortenAddress(value)}
            </span>
            <div className="profileTH-Tooltip">{value}</div>
          </div>

          <button
            className="profileTH-CopyButton"
            onClick={() => copyToClipboard(value)}
          >
            <CopyOutlined />
          </button>
        </div>
      );
    } else if (["Amount"].includes(column)) {
      return `${value} ETH`;
    } else {
      return value;
    }
  };

  return (
    <>
      <div className="profileTH-switchView">
        <button
          onClick={() => setView("transactions")}
          className={`profileTH-button ${
            view === "transactions" ? "active" : ""
          }`}
        >
          Transactions
        </button>
        <button
          onClick={() => setView("visualize")}
          className={`profileTH-button ${view === "visualize" ? "active" : ""}`}
        >
          Visualize
        </button>
      </div>
      <div className="profileTH-card">
        <div className="profileTH-header">
          <h2 className="profileTH-heading">Transactions</h2>
        </div>

        {view === "transactions" ? (
          <table className="profileTH-table table-wrapper">
            <thead>
              <tr>
                {columns.map((column, index) => (
                  <th key={index}>{column}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {transactionHistory.map((transaction, index) => (
                <tr key={index}>
                  {columns.map((column, colIndex) => (
                    <td key={colIndex}>{renderCell(transaction, column)}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="profileTH-visualizeComingSoon">
            <h3>Coming Soon</h3>
          </div>
        )}
      </div>
    </>
  );
};

export default TransactionsHistory;
