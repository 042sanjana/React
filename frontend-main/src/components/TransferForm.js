import React, { useState } from "react";
import { transferMoney } from "../api/api";
import "./TransferForm.css";

const TransferForm = ({ addTransaction }) => {

  const [formData, setFormData] = useState({
    senderUserId: "",
    receiverUserId: "",
    amount: "",
    description: "",
  });

  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      setLoading(true);

      const response = await transferMoney(formData, token);

      addTransaction(response.data);

      alert("Transfer Successful");

      setFormData({
        senderUserId: "",
        receiverUserId: "",
        amount: "",
        description: "",
      });

    } catch (error) {

      console.error(error);
      alert("Transfer Failed");

    } finally {

      setLoading(false);

    }
  };

  return (

    <div className="transfer-container">

      <h2>Transfer Money</h2>

      <form onSubmit={handleSubmit}>

        <input
          type="number"
          name="senderUserId"
          placeholder="Sender User ID"
          value={formData.senderUserId}
          onChange={handleChange}
          required
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

        <input
          type="text"
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
  );
};

export default TransferForm;