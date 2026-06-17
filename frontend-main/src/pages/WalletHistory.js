import React, {
  useEffect,
  useState
} from "react";

import {
  getWalletHistory
} from "../api/api";

import "./WalletHistory.css";

export default function WalletHistory() {

  const [history, setHistory] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  // =========================
  // LOAD HISTORY
  // =========================

  useEffect(() => {

    loadHistory();

  }, []);

  const loadHistory = async () => {

    try {

      const data =
        await getWalletHistory();

      setHistory(data);

    } catch (err) {

      console.log(err);

    } finally {

      setLoading(false);
    }
  };

  return (

    <div className="wallet-history-page">

      <div className="wallet-history-container">

        <h1 className="wallet-history-title">

          Wallet History

        </h1>

        {
          loading ? (

            <p className="loading-text">
              Loading...
            </p>

          ) : history.length === 0 ? (

            <p className="empty-text">
              No Wallet Transactions Found
            </p>

          ) : (

            <div className="wallet-history-list">

              {
                history.map((item) => (

                  <div
                    key={item.id}
                    className="wallet-history-card"
                  >

                    <div className="wallet-history-top">

                      <div>

                        <h2>

                          ₹ {item.amount}

                        </h2>

                        <p>

                          Wallet ID:
                          {" "}
                          {item.walletId}

                        </p>

                      </div>

                      <span
                        className={
                          item.type === "CREDIT"
                          ? "credit-badge"
                          : "debit-badge"
                        }
                      >

                        {item.type}

                      </span>

                    </div>

                    <div className="wallet-history-bottom">

                      <p>

                        Transaction ID:
                        {" "}
                        #{item.id}

                      </p>

                      <p>

                        {
                          new Date(
                            item.createdAt
                          ).toLocaleString()
                        }

                      </p>

                    </div>

                  </div>
                ))
              }

            </div>
          )
        }

      </div>

    </div>
  );
}