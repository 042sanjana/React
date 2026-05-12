import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import "./ChartSection.css";

const COLORS = ["#1e3c72", "#2a5298", "#4caf50", "#ff9800"];

const ChartSection = ({ transactions }) => {
  const chartData = transactions.map((tx) => ({
    name: `Tx ${tx.id}`,
    value: Number(tx.amount),
  }));

  return (<div className="chart-container">
                <h2>Expense Analysis</h2>

                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={chartData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={100}
                      dataKey="value"
                      label
                    >
                      {chartData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>

                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div> );
                   };

                   export default ChartSection;