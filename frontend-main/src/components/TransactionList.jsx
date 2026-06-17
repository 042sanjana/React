import React, { useState } from "react";
import "./TransactionList.css";

const TransactionList = ({ transactions = [] }) => {

  const [filterDate, setFilterDate] = useState("");

  const filteredTransactions = transactions.filter((tx) => {
    if (!filterDate) return true;

    const txDate = new Date(tx.createdAt)
      .toISOString()
      .split("T")[0];

    return txDate === filterDate;
  });

  return (
    <div className="transaction-list-container">

      <div className="transaction-header">
        <h2>Transaction History</h2>

        <input
          type="date"
          value={filterDate}
          onChange={(e) => setFilterDate(e.target.value)}
        />
      </div>

      {filteredTransactions.length === 0 ? (
        <p className="no-transactions">
          No transactions found
        </p>
      ) : (
        filteredTransactions.map((tx) => (
          <div className="transaction-card" key={tx.id}>

            <div>
              <h3>₹ {tx.amount}</h3>

              <p>{tx.description}</p>
            </div>

            <div className="transaction-right">

              <span className={tx.status}>
                {tx.status}
              </span>

              <p>
                {new Date(tx.createdAt).toLocaleString()}
              </p>

            </div>

          </div>
        ))
      )}
    </div>
  );
};

export default TransactionList;