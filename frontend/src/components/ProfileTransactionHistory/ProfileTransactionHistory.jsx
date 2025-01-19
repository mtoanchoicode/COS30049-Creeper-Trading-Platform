import React from "react";
import "./ProfileTransactionHistory.css";

const TransactionsHistory = ({ shortVersion = true }) => {
  const transactions = [
    {
      orderTime: "2025-10-01 08:09:41",
      pair: "DOGE/USDT",
      type: "$2.25",
      action: "Buy",
      average: "0.0001",
      price: "Market",
      amount: 5,
      total: 0.0005,
      status: "Pending",
    },
    {
      orderTime: "2025-10-01 08:09:41",
      pair: "BTC/USDT",
      type: "$187.06",
      action: "Buy",
      average: "0.1",
      price: "Market",
      amount: 5,
      total: 0.5,
      status: "Complete",
    },
    {
      orderTime: "2025-10-01 08:09:41",
      pair: "ETH/USDTz",
      type: "$689.86",
      action: "Sell",
      average: "0.1",
      price: "Market",
      amount: 2,
      total: 0.2,
      status: "Complete",
    },
    {
      orderTime: "2025-10-01 08:09:41",
      pair: "DOGE/USDT",
      type: "$2.25",
      action: "Buy",
      average: "0.0001",
      price: "Market",
      amount: 5,
      total: 0.0005,
      status: "Pending",
    },
    {
      orderTime: "2025-10-01 08:09:41",
      pair: "BTC/USDT",
      type: "$187.06",
      action: "Buy",
      average: "0.1",
      price: "Market",
      amount: 5,
      total: 0.5,
      status: "Complete",
    },
    {
      orderTime: "2025-10-01 08:09:41",
      pair: "ETH/USDTz",
      type: "$689.86",
      action: "Sell",
      average: "0.1",
      price: "Market",
      amount: 2,
      total: 0.2,
      status: "Complete",
    },
  ];

  const displayedTransactions = shortVersion
    ? transactions.slice(0, 2)
    : transactions;

  const columns = shortVersion
    ? ["Order Time", "Pair", "Action", "Amount", "Total", "Status"]
    : [
        "Order Time",
        "Pair",
        "Type",
        "Action",
        "Average",
        "Price",
        "Amount",
        "Total",
        "Status",
      ];

  const renderCell = (transaction, column) => {
    switch (column) {
      case "Order Time":
        return transaction.orderTime;
      case "Pair":
        return transaction.pair;
      case "Type":
        return transaction.type;
      case "Action":
        return (
          <span
            className={
              transaction.action === "Buy" ? "profileTH-buy" : "profileTH-sell"
            }
          >
            {transaction.action}
          </span>
        );
      case "Average":
        return transaction.average;
      case "Price":
        return transaction.price;
      case "Amount":
        return transaction.amount;
      case "Total":
        return transaction.total;
      case "Status":
        return transaction.status;
      default:
        return null;
    }
  };

  return (
    <div
      className={`profileTH-card ${
        shortVersion ? "profileTH-card-shrink" : ""
      }`}
    >
      <div className="profileTH-header">
        <h2 className="profileTH-heading">Transactions History</h2>
        {shortVersion ? "" : <button>Export</button>}
      </div>

      <table className="profileTH-table table-wrapper">
        <thead>
          <tr>
            {columns.map((column, index) => (
              <th key={index}>{column}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {displayedTransactions.map((transaction, index) => (
            <tr key={index}>
              {columns.map((column, colIndex) => (
                <td key={colIndex}>{renderCell(transaction, column)}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionsHistory;
