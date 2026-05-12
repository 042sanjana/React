import React, { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import { getTransferHistory } from "../api/api";
import "./ExpenseChart.css";

export default function ExpenseChart() {

  const [transactions, setTransactions] = useState([]);

  const [selectedMonth, setSelectedMonth] = useState(
    new Date().getMonth() + 1
  );

  const userId = localStorage.getItem("userId");

  useEffect(() => {

    loadTransactions();

  }, []);

  const loadTransactions = async () => {

    try {

      const data = await getTransferHistory(userId);

      setTransactions(data);

    } catch (err) {

      console.log(err);
    }
  };

  // FILTER MONTH

  const filteredTransactions = transactions.filter((tx) => {

    const txMonth = new Date(tx.createdAt).getMonth() + 1;

    return txMonth === Number(selectedMonth);
  });

  // GROUP BY CATEGORY

  const groupedData = filteredTransactions.reduce((acc, tx) => {

    const category = tx.description || "Others";

    const amount = Number(tx.amount);

    const existing = acc.find(
      (item) => item.name === category
    );

    if (existing) {

      existing.value += amount;

    } else {

      acc.push({
        name: category,
        value: amount
      });
    }

    return acc;

  }, []);

  const COLORS = [
    "#2563eb",
    "#7c3aed",
    "#16a34a",
    "#dc2626",
    "#ea580c",
    "#0891b2",
    "#9333ea",
    "#059669"
  ];

  return (

    <div className="expense-chart-container">

      <div className="expense-header">

        <h2>Monthly Expense Tracker</h2>

        <select
          value={selectedMonth}
          onChange={(e) =>
            setSelectedMonth(e.target.value)
          }
        >

          <option value="1">January</option>
          <option value="2">February</option>
          <option value="3">March</option>
          <option value="4">April</option>
          <option value="5">May</option>
          <option value="6">June</option>
          <option value="7">July</option>
          <option value="8">August</option>
          <option value="9">September</option>
          <option value="10">October</option>
          <option value="11">November</option>
          <option value="12">December</option>

        </select>

      </div>

      {groupedData.length === 0 ? (

        <p className="no-data">
          No expenses found for this month
        </p>

      ) : (

        <PieChart width={420} height={350}>

          <Pie
            data={groupedData}
            cx="50%"
            cy="50%"
            outerRadius={110}
            dataKey="value"
            label
          >

            {groupedData.map((entry, index) => (

              <Cell
                key={index}
                fill={
                  COLORS[index % COLORS.length]
                }
              />
            ))}

          </Pie>

          <Tooltip />

          <Legend />

        </PieChart>
      )}

    </div>
  );
}