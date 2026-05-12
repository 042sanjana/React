import React, { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import { getWallet } from "../api/api";

export default function Debit() {

  const [email, setEmail] = useState("");

  const [amount, setAmount] = useState("");

  const [balance, setBalance] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {

    loadWallet();

  }, []);

  const loadWallet = async () => {

    try {

      const wallet = await getWallet();

      setBalance(wallet.balance);

    } catch (err) {

      console.log(err);
    }
  };

  const validateEmail = (email) => {

    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleContinue = () => {

    // EMAIL EMPTY

    if (!email) {

      alert("Enter receiver email");

      return;
    }

    // INVALID EMAIL

    if (!validateEmail(email)) {

      alert("Enter valid email address");

      return;
    }

    // INVALID AMOUNT

    if (!amount || Number(amount) <= 0) {

      alert("Enter valid amount");

      return;
    }

    // INSUFFICIENT BALANCE

    if (Number(amount) > Number(balance)) {

      alert("Insufficient Balance");

      return;
    }

    // SAVE TEMP DATA

    localStorage.setItem("receiverEmail", email);

    localStorage.setItem("transferAmount", amount);

    // NAVIGATE TO VERIFY PIN

    navigate("/verify-pin");
  };

  return (

    <div className="page">

      <h1>Send Money</h1>

      <h3>
        Current Balance: ₹ {balance}
      </h3>

      <input
        type="email"
        placeholder="Receiver Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="number"
        placeholder="Enter Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />

      <button onClick={handleContinue}>
        Continue
      </button>

    </div>
  );
}