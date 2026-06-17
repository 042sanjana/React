import React, { useState } from "react";
import "./TransactionList.css";

const TransactionList = ({ transactions = [] }) => {

  const [filterDate, setFilterDate] =
    useState("");

  const userEmail =
    localStorage
      .getItem("email")
      ?.toLowerCase();

  const filteredTransactions =
    transactions.filter((tx) => {

      if (!filterDate)
        return true;

      const txDate =
        new Date(tx.createdAt)
          .toISOString()
          .split("T")[0];

      return txDate === filterDate;
    });

  return (

    <div className="transaction-list-container">

      <div className="transaction-header">

        <h2>
          Transaction History
        </h2>

        <input
          type="date"
          value={filterDate}
          onChange={(e) =>
            setFilterDate(
              e.target.value
            )
          }
        />

      </div>

      {filteredTransactions.length === 0 ? (

        <p className="no-transactions">
          No transactions found
        </p>

      ) : (

        filteredTransactions.map((tx) => {

          const isCredit =
            tx.receiverEmail
              ?.toLowerCase() ===
            userEmail;

          return (

            <div
              className={`transaction-card ${
                isCredit
                  ? "credit-card"
                  : "debit-card"
              }`}
              key={
                tx.id ||
                tx.transactionId
              }
            >

              <div className="transaction-left">

                <h3
                  className={
                    isCredit
                      ? "credit-amount"
                      : "debit-amount"
                  }
                >

                  {isCredit
                    ? "+"
                    : "-"}

                  ₹ {tx.amount}

                </h3>

                <p>

                  {tx.description ||
                    "Wallet Transfer"}

                </p>

                <p className="email-info">

                  <strong>
                    From:
                  </strong>

                  {" "}

                  {tx.senderEmail}

                </p>

                <p className="email-info">

                  <strong>
                    To:
                  </strong>

                  {" "}

                  {tx.receiverEmail}

                </p>

              </div>

              <div className="transaction-right">

                <span
                  className={`transaction-type ${
                    isCredit
                      ? "credit"
                      : "debit"
                  }`}
                >

                  {isCredit
                    ? "CREDIT"
                    : "DEBIT"}

                </span>

                <span
                  className={`status ${
                    tx.status
                  }`}
                >

                  {tx.status}

                </span>

                <p>

                  {new Date(
                    tx.createdAt
                  ).toLocaleString()}

                </p>

              </div>

            </div>
          );
        })
      )}

    </div>
  );
};

export default TransactionList;