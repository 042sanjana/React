import React, { useState } from "react";
import { creditMoney, getWallet } from "../api/api";
import { useNavigate } from "react-router-dom";

export default function Credit() {
  const [amount, setAmount] = useState("");
  const navigate = useNavigate();

  const handleCredit = async () => {
    if (!amount || Number(amount) <= 0) {
      alert("Enter a valid amount");
      return;
    }
    try {
      await creditMoney(amount); // ✅ no userId argument
      alert("Money Credited Successfully");
      setAmount("");
      navigate("/balance"); // ✅ go to balance page
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="page">
      <h1>Credit Money</h1>
      <input
        type="number"
        placeholder="Enter Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <button onClick={handleCredit}>Credit</button>
    </div>
  );
}