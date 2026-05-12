import React from "react";
import { Link } from "react-router-dom";
import "./Sidebar.css";

export default function Sidebar() {

  return (

    <div className="sidebar">

      <h2 className="logo">E-Wallet</h2>

      <Link to="/dashboard">🏠 Dashboard</Link>

      <Link to="/balance">💰 Balance</Link>

      <Link to="/credit">➕ Credit</Link>

      <Link to="/debit">💸 Debit</Link>

      <Link to="/history">📜 History</Link>

      <Link to="/profile">👤 Profile</Link>

      <Link to="/Transfer ">💳 Transfer</Link>

     <Link to="/Transaction ">💳 Transaction </Link>

    </div>
  );
}