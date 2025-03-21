import React, { useState, useEffect } from "react";
import "./TransactionHistory.css";
import getAllTransactions from "../../../utils/getAllTransaction";

const shortenAddress = (address) => {
  return `${address.slice(0, 17)}...${address.slice(-4)}`;
};

const copyToClipboard = (address) => {
  navigator.clipboard.writeText(address);
  setCopied(address);

  // Reset copied state after 2 seconds
  setTimeout(() => setCopied(null), 1000);
};

const TransactionHistory = () => {
  const [copied, setCopied] = useState(null);
  const [loading, setLoading] = useState(true); // Loading state
  const [transactions, setTransactions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const totalPages = Math.ceil(transactions.length / itemsPerPage);
 
  useEffect(() => {
    const fetchAllTransactions = async () => {
      setLoading(true); // Set loading to true when fetching starts
      const data = await getAllTransactions();
      if (data) setTransactions(d); //reverse the array to show the latest transaction first
      setLoading(false); // Set loading to falata.reverse()se when fetching ends
    };

    fetchAllTransactions();
  }, []);

  const InPageTransactions = transactions.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );  

  const columns = [
    { key: "TransactionID", label: "ID" },
    { key: "HashCode", label: "Hash" },
    { key: "AddressFrom", label: "From" },
    { key: "AddressTo", label: "To" },
    { key: "TokenAddress", label: "Token" },
    { key: "Amount", label: "Amount" },
    { key: "Fee", label: "Fee" },
    { key: "Gas", label: "Gas" },
    { key: "Method", label: "Method" },
    { key: "Status", label: "Status" },
    { key: "CreatedAt", label: "Created At" },
  ];

  // const transactions = [
  //   {
  //     txHash:
  //       "0xa5325250931d698d929316bd8d33d6561b5d48e23cd297e53aab6fa0be1f9bf5",
  //     method: "Swap",
  //     age: "1 min ago",
  //     from: "0x8B108C954F7bc6Df2f4B507eDcF2EF7F24c7efa2",
  //     to: "0xc54743436C7B19777EC70d40f0A267B0C042C6a3",
  //     amount: 50,
  //     fee: 3,
  //     token: "CEP",
  //   },
  //   {
  //     txHash:
  //       "0x34b3b6f7ad6a45a9b8cbde526e3b2d5923456a7b24d1a2ef5bdb8e2735f6c123",
  //     method: "Transfer",
  //     age: "5 mins ago",
  //     from: "0xAbC123D456E789F012G345HI678J901KLMNO2345",
  //     to: "0x54321KLMNO098J765H432GBA210F987E654D321C",
  //     amount: 100,
  //     fee: 2.5,
  //     token: "LNX",
  //   },
  //   {
  //     txHash:
  //       "0x76a9c123d5678e9f012g345h678j901klmno2345pq6789r012s345t678u901vw",
  //     method: "Approve",
  //     age: "10 mins ago",
  //     from: "0xA1B2C3D4E5F67890123456789ABCDEF012345678",
  //     to: "0x0987FEDCBA5432109876543210FEDCBA98765432",
  //     amount: 200,
  //     fee: 1.8,
  //     token: "ETH",
  //   },
  // ];

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
          {InPageTransactions.map((txn, index) => (
            <tr key={index}>
              <td>
                <div>
                  <a
                    href={`https://sepolia.etherscan.io/tx/${txn.txHash}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {shortenAddress(txn.HashCode)}
                  </a>
                  <div
                    className="copy-btn"
                    onClick={() => copyToClipboard(txn.txHash)}
                  >
                    {copied === txn.HashCode ? (
                      <i className="fa-solid fa-check"></i>
                    ) : (
                      <i className="fa-solid fa-copy"></i>
                    )}
                  </div>
                </div>
              </td>
              <td>
                <span>{txn.Method}</span>
              </td>
              <td>{txn.age}</td>
              <td>
                <div>
                  <a
                    href={`https://sepolia.etherscan.io/address/${txn.from}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {shortenAddress(txn.from)}
                  </a>
                  <div
                    className="copy-btn"
                    onClick={() => copyToClipboard(txn.from)}
                  >
                    {copied === txn.from ? (
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
                    href={`https://sepolia.etherscan.io/address/${txn.to}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {shortenAddress(txn.to)}
                  </a>
                  <div
                    className="copy-btn"
                    onClick={() => copyToClipboard(txn.to)}
                  >
                    {copied === txn.to ? (
                      <i className="fa-solid fa-check"></i>
                    ) : (
                      <i className="fa-solid fa-copy"></i>
                    )}
                  </div>
                </div>
              </td>
              <td>{txn.amount}</td>
              <td>{txn.fee}</td>
              <td>{txn.token}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionHistory;
