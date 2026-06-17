import React, { useEffect, useState } from "react";

import {
  getTransferHistory
} from "../api/api";

import "./Transaction.css";

function Transaction() {

  const [transactions, setTransactions] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  // =========================
  // GET LOGGED IN EMAIL
  // =========================

  const email =
    localStorage.getItem("email");

  // =========================
  // LOAD HISTORY
  // =========================

  useEffect(() => {

    loadHistory();

  }, []);

  const loadHistory = async () => {

    try {

      const data =
        await getTransferHistory(email);

      setTransactions(data);

    } catch (err) {

      console.log(err);

    } finally {

      setLoading(false);
    }
  };

  return (

    <div className="history-page">

      <div className="history-container">

        <h2 className="history-title">
          Transaction History
        </h2>

        {loading ? (

          <p className="loading-text">
            Loading...
          </p>

        ) : transactions.length === 0 ? (

          <p className="empty-text">
            No Transactions Found
          </p>

        ) : (

          <div className="history-list">

            {transactions.map((tx) => (

              <div
                className="history-card"
                key={tx.id}
              >

                <div className="history-top">

                  <div>

                    <h3>
                      ₹ {tx.amount}
                    </h3>

                    <p>
                      {tx.description}
                    </p>

                  </div>

                  <span
                    className={`status ${tx.status}`}
                  >

                    {tx.status}

                  </span>

                </div>

                <div className="history-bottom">

                  <p>
                    Sender Email:
                    <strong>
                      {" "}
                      {tx.senderEmail}
                    </strong>
                  </p>

                  <p>
                    Receiver Email:
                    <strong>
                      {" "}
                      {tx.receiverEmail}
                    </strong>
                  </p>

                  <p>
                    {
                      new Date(
                        tx.createdAt
                      ).toLocaleString()
                    }
                  </p>

                </div>

              </div>
            ))}

          </div>
        )}

      </div>

    </div>
  );
}

export default Transaction;