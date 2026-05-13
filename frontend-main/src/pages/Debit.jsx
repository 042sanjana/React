import React, { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import {
  getWallet,

  transferMoney
} from "../api/api";

export default function Debit() {

  const [email, setEmail] = useState("");

  const [amount, setAmount] = useState("");

  const [balance, setBalance] = useState(0);

  const [currentUserEmail, setCurrentUserEmail] = useState("");

  const navigate = useNavigate();

  useEffect(() => {

    loadData();

  }, []);

  const loadData = async () => {

    try {

      // FETCH WALLET
      const wallet = await getWallet();

      setBalance(wallet.balance);

      // FETCH CURRENT USER
      const profile = await getUserProfile();

      setCurrentUserEmail(profile.email);

    } catch (err) {

      console.log(err);
    }
  };

  // EMAIL VALIDATION

  const validateEmail = (email) => {

    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleContinue = async () => {

    // EMPTY EMAIL

    if (!email) {

      alert("Enter receiver email");

      return;
    }

    // INVALID EMAIL

    if (!validateEmail(email)) {

      alert("Enter valid email address");

      return;
    }

    // USER TRYING TO SEND TO SELF

    if (
      email.toLowerCase() ===
      currentUserEmail.toLowerCase()
    ) {

      alert("You cannot transfer money to your own account");

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

    localStorage.setItem(
      "receiverEmail",
      email
    );

    localStorage.setItem(
      "transferAmount",
      amount
    );

    // GO TO VERIFY PIN PAGE

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
        onChange={(e) =>
          setEmail(e.target.value)
        }
      />

      <input
        type="number"
        placeholder="Enter Amount"
        value={amount}
        onChange={(e) =>
          setAmount(e.target.value)
        }
      />

      <button onClick={handleContinue}>
        Continue
      </button>

    </div>
  );
}