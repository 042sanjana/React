import React, { useState, useEffect } from "react";
import { transferMoney, getWallet } from "../api/api";
import "./Transfer.css";

export default function Transfer() {

  const [formData, setFormData] = useState({
    senderUserId: localStorage.getItem("userId"),
    receiverUserId: "",
    amount: "",
    description: "Shopping"
  });

  const [walletBalance, setWalletBalance] = useState(0);

  const [loading, setLoading] = useState(false);

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

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

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

  const handleSubmit = async (e) => {

    e.preventDefault();

    // VALIDATIONS

    if (!formData.receiverUserId) {

      alert("Enter Receiver User ID");
      return;
    }

    if (
      !formData.amount ||
      Number(formData.amount) <= 0
    ) {

      alert("Enter valid amount");
      return;
    }

    if (Number(formData.amount) > walletBalance) {

      alert("Insufficient Balance");
      return;
    }

    try {

      setLoading(true);

      const response = await transferMoney(formData);

      alert("Transfer Successful");

      console.log(response);

      // REFRESH BALANCE
      await loadWallet();

      // RESET FORM
      setFormData({
        senderUserId: localStorage.getItem("userId"),
        receiverUserId: "",
        amount: "",
        description: "Shopping"
      });

    } catch (err) {

      console.log(err);

      alert("Transfer Failed");

    } finally {

      setLoading(false);
    }
  };

  return (

    <div className="transfer-page">

      <div className="transfer-card">

        <h2>Money Transfer</h2>

        <div className="balance-box">
          Current Balance:
          <span> ₹ {walletBalance}</span>
        </div>

        <form onSubmit={handleSubmit}>

          {/* SENDER ID */}

          <input
            type="number"
            name="senderUserId"
            value={formData.senderUserId}
            readOnly
          />

          {/* RECEIVER ID */}

          <input
            type="number"
            name="receiverUserId"
            placeholder="Receiver User ID"
            value={formData.receiverUserId}
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

          {/* EXPENSE CATEGORY */}

          <select
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="dropdown"
          >

            {expenseOptions.map((item, index) => (

              <option key={index} value={item}>
                {item}
              </option>
            ))}

          </select>

          {/* SUBMIT BUTTON */}

          <button type="submit">

            {loading
              ? "Processing..."
              : "Transfer Money"}

          </button>

        </form>

      </div>

    </div>
  );
}