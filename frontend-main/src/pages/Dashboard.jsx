import React, { useEffect, useState } from "react";

import WalletCard from "../components/WalletCard";

import {
  getWallet,
  getUserProfile
} from "../api/api";

import "./Dashboard.css";

export default function Dashboard() {

  const [wallet, setWallet] = useState(null);

  const [user, setUser] = useState(null);

  useEffect(() => {

    const loadDashboard = async () => {

      try {

        // FETCH WALLET
        const walletData = await getWallet();

        // FETCH USER PROFILE
        const profileData = await getUserProfile();

        setWallet(walletData);

        setUser(profileData);

      } catch (err) {

        console.log("Dashboard Error:", err);
      }
    };

    loadDashboard();

  }, []);

  /* LOGOUT */

  const handleLogout = () => {

    localStorage.removeItem("token");

    localStorage.removeItem("userId");

    window.location.href = "/";
  };

  return (

    <div className="dashboard-page">

      {/* HEADER */}

      <div className="dashboard-header">

        <div>

          <h1 className="dashboard-title">
            Welcome {user?.fullName || "User"}
          </h1>

          <p className="dashboard-subtitle">
            {user?.email}
          </p>

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

        <WalletCard balance={wallet?.balance || 0} />

      </div>

    </div>
  );
}