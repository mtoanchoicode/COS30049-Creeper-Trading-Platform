import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const TransactionSuccessRateChart = ({ transactions }) => {
  // Count the number of successful and failed transactions
  const successCount = transactions.filter(
    (tx) => tx.status === "Success"
  ).length;
  const failCount = transactions.filter((tx) => tx.status === "Fail").length;
  const total = successCount + failCount;

  // Chart data
  const data = [
    { name: "Success", value: successCount },
    { name: "Fail", value: failCount },
  ];

  // Colors for the chart
  const COLORS = ["#00da5b", "#ff4d4d"]; // Green for success, Red for fail

  return (
    <div className="col-md-4">
      <div className="p-3 bg-white shadow-sm d-flex flex-column align-items-center rounded">
        <h3 className="fs-2">Success Rate</h3>
        <p className="fs-4">
          {total > 0
            ? `${((successCount / total) * 100).toFixed(2)}% Success`
            : "--"}
        </p>
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default TransactionSuccessRateChart;
