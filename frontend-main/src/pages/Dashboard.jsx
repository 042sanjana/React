import React, { useEffect, useState } from "react";

import WalletCard from "../components/WalletCard";
import TransactionList from "../components/TransactionList";

import {
  getWallet,
  getUserProfile,

} from "../api/api";

import "./Dashboard.css";

export default function Dashboard() {

  const [wallet, setWallet] = useState(null);

  const [user, setUser] = useState(null);

  const [transactions, setTransactions] = useState([]);

  const userId = localStorage.getItem("userId");

  useEffect(() => {

    const loadDashboard = async () => {

      try {

        const walletData = await getWallet(userId);

        const profileData = await getUserProfile();

        const txData = await getTransactions();

        setWallet(walletData);

        setUser(profileData);

        setTransactions(txData);

      } catch (err) {

        console.log(err);
      }
    };

    loadDashboard();

  }, [userId]);

  /* ================= LOGOUT ================= */

  const handleLogout = () => {

    localStorage.removeItem("token");

    localStorage.removeItem("userId");

    window.location.href = "/login";
  };

  return (

    <div className="dashboard-page">

      {/* HEADER */}

      <div className="dashboard-header">

        <div>
          <h1 className="dashboard-title">
            Welcome {user?.fullName}
          </h1>

          <p className="dashboard-subtitle">
            Manage your wallet and transactions
          </p>
        </div>

        <button
          className="logout-btn"
          onClick={handleLogout}
        >
          Logout
        </button>

      </div>

      {/* WALLET CARD */}

      <div className="dashboard-wallet">

        <WalletCard balance={wallet?.balance} />

      </div>

      {/* TRANSACTIONS */}

      <div className="dashboard-transactions">

        <h2 className="section-title">
          Recent Transactions
        </h2>

        <TransactionList transactions={transactions} />

      </div>

    </div>
  );
}