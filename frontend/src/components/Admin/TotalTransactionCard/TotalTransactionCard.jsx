import React from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import "./TotalTransactionCard.css";

const TotalTransactionCard = ({ transactions }) => {
  const totalTransactions = transactions.length;

  // Count transactions per method
  const methodCounts = transactions.reduce((acc, tx) => {
    acc[tx.Method] = (acc[tx.Method] || 0) + 1;
    return acc;
  }, {});

  // Convert to chart data format
  const transactionData = Object.entries(methodCounts).map(
    ([method, count]) => ({
      name: method,
      value: count,
    })
  );

  // Define colors for each transaction method
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  return (
    <div className="col-md-4">
      <div className="p-3 bg-white shadow-sm d-flex flex-column align-items-center rounded">
        <h3 className="fs-2">Total Transactions</h3>
        <p className="fs-4">{totalTransactions}</p>
        {/* Pie Chart */}
        <PieChart width={250} height={250}>
          <Pie
            data={transactionData}
            cx="50%"
            cy="50%"
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
            label
          >
            {transactionData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </div>
    </div>
  );
};

export default TotalTransactionCard;
