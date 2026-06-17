import React, { useEffect, useState } from "react";
import { getWallet } from "../api/api";
import { useLocation } from "react-router-dom";

export default function Balance() {
  const [wallet, setWallet] = useState(null);
  const [error, setError] = useState(null);
  const location = useLocation(); // ✅ detects every navigation to this page

  useEffect(() => {
    const loadData = async () => {
      try {
        setWallet(null);  // reset to show loading on every visit
        setError(null);
        const data = await getWallet();
        setWallet(data);
      } catch (err) {
        setError(err.message);
        console.error(err);
      }
    };
    loadData();
  }, [location]); // ✅ refetches every time you navigate to this page

  if (error)   return <div className="page"><p style={{ color: "red" }}>Error: {error}</p></div>;
  if (!wallet) return <div className="page"><p>Loading...</p></div>;

  return (
    <div className="page">
      <h1>Wallet Balance</h1>
      <h2>₹ {Number(wallet.balance).toFixed(2)}</h2>
      <p>Account: {wallet.email}</p>
    </div>
  );
}