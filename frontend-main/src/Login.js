import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from  "./api/api";
import "./Login.css";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      await loginUser({
        email,
        password
      });

      alert("Login successful");
      navigate("/verify-pin", {
        state: {
          type: "login"
        }
      });

    } catch (error) {
      console.error(error);
      alert(error.message || "Invalid credentials");
    }
  };



  return (
    <div className="auth-container">
      <h2>Sign in to eWallet</h2>

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={handleLogin}>Login</button>

      <p onClick={() => navigate("/register")}>
        New user? Create account
      </p>
    </div>
  );
}

export default Login;