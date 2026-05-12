import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const VerifyPin = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [pin, setPin] = useState("");
  const [error, setError] = useState("");

  const savedPin = localStorage.getItem("pin");

  const handleVerify = () => {
    if (pin === savedPin) {
      navigate("/walletDashboard", {
        state: {
          success: true,
          amount: location.state?.amount || 0
        }
      });
    } else {
      setError("Incorrect PIN. Please try again.");
    }
  };
  return (
    <div className="auth-container">
      <h2>Verify Your PIN</h2>
      <input
        type="password"
        maxLength="6"
        placeholder="Enter your 6-digit PIN"
        value={pin}
        onChange={(e) => setPin(e.target.value)}
      />
      <button onClick={handleVerify}>Verify PIN</button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default VerifyPin;