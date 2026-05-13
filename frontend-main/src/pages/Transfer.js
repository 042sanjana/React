import React, { useState, useEffect } from "react";

import {
  transferMoney,
  getWallet
} from "../api/api";

import "./Transfer.css";

export default function Transfer() {

  const loggedInEmail =
    localStorage.getItem("email");

  const [formData, setFormData] = useState({
    senderEmail: loggedInEmail || "",
    receiverEmail: "",
    amount: "",
    description: "Shopping"
  });

  const [walletBalance, setWalletBalance] =
    useState(0);

  const [loading, setLoading] =
    useState(false);

  const expenseOptions = [
    "Shopping",
    "Food",
    "Dress",
    "Travel",
    "Bills",
    "Recharge",
    "Movies",
    "Medical",
    "Education",
    "Entertainment",
    "Others"
  ];

  // =========================
  // HANDLE INPUT
  // =========================

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // =========================
  // LOAD WALLET
  // =========================

  const loadWallet = async () => {

    try {

      const wallet = await getWallet();

      setWalletBalance(wallet.balance);

    } catch (err) {

      console.log(err);
    }
  };

  useEffect(() => {

    loadWallet();

  }, []);

  // =========================
  // EMAIL VALIDATION
  // =========================

  const validateEmail = (email) => {

    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      .test(email);
  };

  // =========================
  // SUBMIT
  // =========================

  const handleSubmit = async (e) => {

    e.preventDefault();

    // sender validation

    if (
      formData.senderEmail !== loggedInEmail
    ) {

      alert(
        "Sender email must be your registered email"
      );

      return;
    }

    // receiver validation

    if (!formData.receiverEmail) {

      alert("Enter receiver email");

      return;
    }

    if (
      !validateEmail(
        formData.receiverEmail
      )
    ) {

      alert("Enter valid receiver email");

      return;
    }

    // same email check

    if (
      formData.senderEmail ===
      formData.receiverEmail
    ) {

      alert(
        "Sender and receiver cannot be same"
      );

      return;
    }

    // amount validation

    if (
      !formData.amount ||
      Number(formData.amount) <= 0
    ) {

      alert("Enter valid amount");

      return;
    }

    // balance validation

    if (
      Number(formData.amount) >
      walletBalance
    ) {

      alert("Insufficient Balance");

      return;
    }

    try {

      setLoading(true);

      // =========================
      // TRANSFER API
      // =========================

      const response =
        await transferMoney({
          senderEmail:
            formData.senderEmail,

          receiverEmail:
            formData.receiverEmail,

          amount:
            Number(formData.amount),

          description:
            formData.description
        });

      console.log("TRANSFER SUCCESS:", response);

      alert("Transfer Successful");

      // refresh wallet
      await loadWallet();

      // reset form
      setFormData({
        senderEmail: loggedInEmail || "",
        receiverEmail: "",
        amount: "",
        description: "Shopping"
      });

    } catch (err) {

      console.log("TRANSFER ERROR:", err);

      alert(
        err.message ||
        "Transfer Failed"
      );

    } finally {

      setLoading(false);
    }
  };

  return (

    <div className="transfer-page">

      <div className="transfer-card">

        <h2>
          Money Transfer
        </h2>

        <div className="balance-box">

          Current Balance:

          <span>
            ₹ {walletBalance}
          </span>

        </div>

        <form onSubmit={handleSubmit}>

          {/* SENDER EMAIL */}

          <input
            type="email"
            name="senderEmail"
            value={formData.senderEmail}
            readOnly
          />

          {/* RECEIVER EMAIL */}

          <input
            type="email"
            name="receiverEmail"
            placeholder="Receiver Email"
            value={formData.receiverEmail}
            onChange={handleChange}
            required
          />

          {/* AMOUNT */}

          <input
            type="number"
            name="amount"
            placeholder="Enter Amount"
            value={formData.amount}
            onChange={handleChange}
            required
          />

          {/* CATEGORY */}

          <select
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="dropdown"
          >

            {expenseOptions.map(
              (item, index) => (

                <option
                  key={index}
                  value={item}
                >

                  {item}

                </option>
              )
            )}

          </select>

          {/* BUTTON */}

          <button type="submit">

            {
              loading
                ? "Processing..."
                : "Transfer Money"
            }

          </button>

        </form>

      </div>

    </div>
  );
}