import React, { useState } from "react";
import { transferMoney, getWallet } from "../api/api";
import "./Transfer.css";

export default function Transfer() {

  const [formData, setFormData] = useState({
    senderUserId: localStorage.getItem("userId"),
    receiverUserId: "",
    amount: "",
    description: ""
  });

  const [walletBalance, setWalletBalance] = useState(null);

  const [loading, setLoading] = useState(false);

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

  React.useEffect(() => {
    loadWallet();
  }, []);

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      setLoading(true);

      const response = await transferMoney(formData);

      alert("Transfer Successful");

      console.log(response);

      // ✅ REFRESH BALANCE
      await loadWallet();

      setFormData({
        senderUserId: localStorage.getItem("userId"),
        receiverUserId: "",
        amount: "",
        description: ""
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

          <input
            type="number"
            name="senderUserId"
            value={formData.senderUserId}
            readOnly
          />

          <input
            type="number"
            name="receiverUserId"
            placeholder="Receiver User ID"
            value={formData.receiverUserId}
            onChange={handleChange}
            required
          />

          <input
            type="number"
            name="amount"
            placeholder="Amount"
            value={formData.amount}
            onChange={handleChange}
            required
          />

          <textarea
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
          />

          <button type="submit">
            {loading ? "Processing..." : "Transfer"}
          </button>

        </form>

      </div>

    </div>
  );
}