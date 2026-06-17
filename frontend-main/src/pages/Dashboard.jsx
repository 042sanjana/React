import React, {
  useEffect,
  useState
} from "react";

import WalletCard from "../components/WalletCard";

import {
  getWallet,
  getUserProfile,
  getTransferHistory
} from "../api/api";

import "./Dashboard.css";

export default function Dashboard() {

  const [wallet, setWallet] =
    useState(null);

  const [user, setUser] =
    useState(null);

  const [logoutMessage, setLogoutMessage] =
    useState(false);

  const [stats, setStats] =
    useState({
      totalCredit: 0,
      totalDebit: 0,
      totalTransactions: 0
    });

  // =========================
  // LOAD DASHBOARD
  // =========================

  useEffect(() => {

    loadDashboard();

  }, []);

  const loadDashboard = async () => {

    try {

      // WALLET

      const walletData =
        await getWallet();

      // PROFILE

      const profileData =
        await getUserProfile();

      // TRANSACTIONS

      const txData =
        await getTransferHistory();

      setWallet(walletData);

      setUser(profileData);

      // =========================
      // CALCULATE STATS
      // =========================

      let totalCredit = 0;

      let totalDebit = 0;

      txData.forEach((tx) => {

        // RECEIVED MONEY

        if (
          tx.receiverEmail ===
          profileData.email
        ) {

          totalCredit +=
            Number(tx.amount);
        }

        // SENT MONEY

        if (
          tx.senderEmail ===
          profileData.email
        ) {

          totalDebit +=
            Number(tx.amount);
        }
      });

      setStats({

        totalCredit,

        totalDebit,

        totalTransactions:
          txData.length
      });

    } catch (err) {

      console.log(
        "Dashboard Error:",
        err
      );
    }
  };

  // =========================
  // LOGOUT
  // =========================

  const handleLogout = () => {

    setLogoutMessage(true);

    setTimeout(() => {

      localStorage.removeItem("token");

      localStorage.removeItem("userId");

      localStorage.removeItem("email");

      localStorage.removeItem("fullName");

      window.location.href = "/";

    }, 1800);
  };

  return (

    <div className="dashboard-page">

      {/* LOGOUT MESSAGE */}

      {logoutMessage && (

        <div className="logout-toast">

          Successfully Logged Out 👋

        </div>
      )}

      {/* HEADER */}

      <div className="dashboard-header">

        <div>

          <h1 className="dashboard-title">

            Hello {user?.fullName},
            Welcome Back 👋

          </h1>

          <p className="dashboard-subtitle">

            {user?.email}

          </p>

          <p className="dashboard-subtitle">

            Manage your wallet
            and transactions easily

          </p>

        </div>

        <button
          className="logout-btn"
          onClick={handleLogout}
        >

          Logout

        </button>

      </div>

      {/* WALLET */}

      <div className="dashboard-wallet">

        <WalletCard
          balance={
            wallet?.balance || 0
          }
        />

      </div>

      {/* STATS */}

      <div className="stats-grid">

        {/* TOTAL CREDIT */}

        <div className="stats-card">

          <h3>
            Total Credit
          </h3>

          <p>
            ₹ {stats.totalCredit}
          </p>

        </div>

        {/* TOTAL DEBIT */}

        <div className="stats-card">

          <h3>
            Total Debit
          </h3>

          <p>
            ₹ {stats.totalDebit}
          </p>

        </div>

        {/* TOTAL TRANSACTIONS */}

        <div className="stats-card">

          <h3>
            Transactions
          </h3>

          <p>
            {stats.totalTransactions}
          </p>

        </div>

      </div>

    </div>
  );
}