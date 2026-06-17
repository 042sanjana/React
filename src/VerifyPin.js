import React, { useState } from "react";

import {
  useNavigate,
  useLocation
} from "react-router-dom";

import {
  debitMoney
} from "./api/api";

const VerifyPin = () => {

  const navigate =
    useNavigate();

  const location =
    useLocation();

  const [pin, setPin] =
    useState("");

  const [error, setError] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  // =========================
  // GET PAGE TYPE
  // =========================

  const type =
    location.state?.type;

  // =========================
  // LOCAL STORAGE DATA
  // =========================

  const savedPin =
    localStorage.getItem("pin");

  const amount =
    localStorage.getItem("transferAmount");

  const userId =
    localStorage.getItem("userId");

  const receiverEmail =
    localStorage.getItem("receiverEmail");

  // =========================
  // VERIFY
  // =========================

  const handleVerify = async () => {

    try {

      setLoading(true);

      setError("");

      // EMPTY PIN

      if (!pin) {

        setError("Enter PIN");

        return;
      }

      // WRONG PIN

      if (pin !== savedPin) {

        setError("Incorrect PIN");

        return;
      }

      // =========================
      // LOGIN FLOW
      // =========================

      if (type === "login") {

        alert("Login Successful");

        navigate("/dashboard");

        return;
      }

      // =========================
      // DEBIT FLOW
      // =========================

      if (type === "debit") {

        if (!amount) {

          setError("Amount missing");

          return;
        }

        await debitMoney(
          userId,
          amount
        );

        alert(
          `₹ ${amount} debited successfully`
        );

        // CLEAR STORAGE

        localStorage.removeItem(
          "transferAmount"
        );

        localStorage.removeItem(
          "receiverEmail"
        );

        navigate("/dashboard");
      }

    } catch (err) {

      console.log(err);

      setError(
        err.message ||
        "Verification Failed"
      );

    } finally {

      setLoading(false);
    }
  };

  return (

    <div className="auth-container">

      <h2>
        Verify PIN
      </h2>

      {
        type === "debit" && (

          <>

            <p>
              Receiver:
              <strong>
                {" "}
                {receiverEmail}
              </strong>
            </p>

            <p>
              Amount:
              <strong>
                {" "}
                ₹ {amount}
              </strong>
            </p>

          </>
        )
      }

      <input
        type="password"
        placeholder="Enter PIN"
        maxLength="6"
        value={pin}
        onChange={(e) =>
          setPin(e.target.value)
        }
      />

      <button onClick={handleVerify}>

        {
          loading
            ? "Processing..."
            : "Verify PIN"
        }

      </button>

      {
        error && (

          <p style={{ color: "red" }}>

            {error}

          </p>
        )
      }

    </div>
  );
};

export default VerifyPin;