import React from "react";
import "./Navbar.css";

const Navbar = () => {
  return (
    <div className="navbar">
      <h1>E-Wallet Transactions</h1>
      <div className="nav-right">
        <button>Dashboard</button>
        <button>History</button>
      </div>
    </div>
  );
};

export default Navbar;