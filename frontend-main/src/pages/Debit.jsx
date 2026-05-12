import React, { useState } from "react";
import { debitMoney } from "../api/api";
import { useNavigate } from "react-router-dom";

export default function Debit() {
  const [amount, setAmount] = useState("");
  const navigate = useNavigate();

  const handleDebit = async () => {
    if (!amount || Number(amount) <= 0) {
      alert("Enter a valid amount");
      return;
    }
    try {
      await debitMoney(amount); // ✅ no userId argument
      alert("Money Debited Successfully");
      setAmount("");
      navigate("/balance"); // ✅ go to balance page
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="page">
      <h1>Debit Money</h1>
      <input
        type="number"
        placeholder="Enter Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <button onClick={handleDebit}>Debit</button>
    </div>
  );
}