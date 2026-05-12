import React from "react";

import "./TransactionList.css";

export default function TransactionList() {

  const transactions = [

    {
      title: "Money Added",
      amount: "+ ₹1000"
    },

    {
      title: "Recharge",
      amount: "- ₹299"
    },

    {
      title: "Sent Money",
      amount: "- ₹500"
    }
  ];

  return (

    <div className="transaction-box">

      <h2>Recent Transactions</h2>

      {
        transactions.map((item, index) => (

          <div className="transaction-item" key={index}>

            <span>{item.title}</span>

            <p>{item.amount}</p>

          </div>
        ))
      }

    </div>
  );
}