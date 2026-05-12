import React, { useEffect, useState } from "react";

import { getTransactionHistory } from "../api/api";

import "./History.css";

export default function History() {

  const [transactions, setTransactions] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState(null);

  const walletId = localStorage.getItem("userId");

  useEffect(() => {

    fetchHistory();

  }, []);

  const fetchHistory = async () => {

    try {

      const data = await getTransactionHistory(walletId);

      setTransactions(data);

    } catch (err) {

      setError(err.message);

      console.log(err);

    } finally {

      setLoading(false);
    }
  };

  const formatDate = (date) => {

    return new Date(date).toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (loading) {
    return (
      <div className="history-page">
        <h1>Loading...</h1>
      </div>
    );
  }

  if (error) {
    return (
      <div className="history-page">
        <h1>{error}</h1>
      </div>
    );
  }

  return (

    <div className="history-page">

      <h1 className="history-title">
        Transaction History
      </h1>

      <div className="history-container">

        {transactions.length === 0 ? (

          <p className="empty-text">
            No Transactions Found
          </p>

        ) : (

          transactions.map((tx) => (

            <div
              key={tx.id}
              className={`history-card ${tx.type}`}
            >

              <div className="history-top">

                <h2>
                  {tx.type === "CREDIT"
                    ? "Money Credited"
                    : "Money Debited"}
                </h2>

                <span className="amount">
                  ₹{tx.amount}
                </span>

              </div>

              <div className="history-bottom">

                <p>
                  Transaction ID: #{tx.id}
                </p>

                <p>
                  {formatDate(tx.createdAt)}
                </p>

              </div>

            </div>
          ))
        )}
      </div>

    </div>
  );
}