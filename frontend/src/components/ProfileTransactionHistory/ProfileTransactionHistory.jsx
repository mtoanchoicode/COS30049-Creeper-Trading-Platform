import React from "react";
import { Table } from "antd";

const columns = [
  { title: "Order Time", dataIndex: "orderTime", key: "orderTime" },
  { title: "Pair", dataIndex: "pair", key: "pair" },
  { title: "Action", dataIndex: "action", key: "action" },
  { title: "Amount", dataIndex: "amount", key: "amount" },
  { title: "Total", dataIndex: "total", key: "total" },
  { title: "Status", dataIndex: "status", key: "status" },
];

const data = [
  {
    key: "1",
    orderTime: "2025-10-1 08:09:41",
    pair: "DOGE/USDT",
    action: "Buy",
    amount: "5",
    total: "0.0005",
    status: "Pending",
  },
  {
    key: "2",
    orderTime: "2025-10-1 08:09:41",
    pair: "BTC/USDT",
    action: "Buy",
    amount: "5",
    total: "0.5",
    status: "Complete",
  },
];

const TransactionHistory = () => (
  <Table columns={columns} dataSource={data} pagination={false} />
);

export default TransactionHistory;
