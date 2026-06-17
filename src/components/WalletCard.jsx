import React from "react";

import "./WalletCard.css";

export default function WalletCard({ balance }) {

  return (

    <div className="wallet-card">

      <p>Total Wallet Balance</p>

      <h1>₹ {balance}</h1>

    </div>
  );
}