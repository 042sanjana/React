import React, { useState } from "react";

import {
  useNavigate
} from "react-router-dom";

import {
  debitMoney
} from "./api/api";

const VerifyPin = () => {

  const navigate =
    useNavigate();

  const [pin, setPin] =
    useState("");

  const [error, setError] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  // =========================
  // SAVED PIN
  // =========================

  const savedPin =
    localStorage.getItem("pin");

  // =========================
  // VERIFY PIN
  // =========================

  const handleVerify =
    async () => {

      // EMPTY PIN

      if (!pin) {

        setError(
          "Enter PIN"
        );

        return;
      }

      // INVALID PIN

      if (pin !== savedPin) {

        setError(
          "Incorrect PIN"
        );

        return;
      }

      try {

        setLoading(true);

        // =========================
        // GET DATA
        // =========================

        const userId =
          localStorage.getItem(
            "userId"
          );

        const amount =
          localStorage.getItem(
            "transferAmount"
          );

        // =========================
        // DEBIT MONEY
        // =========================

        const response =
          await debitMoney(
            userId,
            amount
          );

        console.log(
          "DEBIT SUCCESS:",
          response
        );

        alert(
          "Amount Debited Successfully"
        );

        // CLEAR TEMP DATA

        localStorage.removeItem(
          "transferAmount"
        );

        localStorage.removeItem(
          "receiverEmail"
        );

        localStorage.removeItem(
          "description"
        );

        // REDIRECT

        navigate("/dashboard");

      } catch (err) {

        console.log(err);

        setError(
          err.message ||
          "Debit Failed"
        );

      } finally {

        setLoading(false);
      }
    };

  return (

    <div className="auth-container">

      <h2>
        Verify Your PIN
      </h2>

      <input
        type="password"
        maxLength="6"
        placeholder="Enter your 6-digit PIN"
        value={pin}
        onChange={(e) =>
          setPin(e.target.value)
        }
      />

      <button
        onClick={handleVerify}
      >

        {
          loading
            ? "Processing..."
            : "Verify PIN"
        }

      </button>

      {error && (

        <p style={{ color: "red" }}>

          {error}

        </p>
      )}

    </div>
  );
};

export default VerifyPin;