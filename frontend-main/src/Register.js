import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "./api/api";
import "./Login.css";

const Register = () => {
  const nav = useNavigate();

  const [fullName, setFullName] = useState("");
  const [countryCode, setCountryCode] = useState("+91");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [age, setAge] = useState("");

  // AGE CALCULATION
  const calculateAge = (dob) => {
    if (!dob) return "";

    const birthDate = new Date(dob);
    const today = new Date();

    let calculatedAge = today.getFullYear() - birthDate.getFullYear();

    const monthDifference =
      today.getMonth() - birthDate.getMonth();

    if (
      monthDifference < 0 ||
      (monthDifference === 0 &&
        today.getDate() < birthDate.getDate())
    ) {
      calculatedAge--;
    }

    return calculatedAge;
  };

  // DOB CHANGE
  const handleDOBChange = (e) => {
    const dob = e.target.value;
    setDateOfBirth(dob);

    const calculatedAge = calculateAge(dob);
    setAge(calculatedAge);
  };

  // VALIDATIONS
  const validateForm = () => {
    // Full Name
    if (!fullName.trim()) {
      alert("Full name is required");
      return false;
    }

    // Phone Number Validation (10 digits)
    const phoneRegex = /^[0-9]{10}$/;

    if (!phoneRegex.test(phoneNumber)) {
      alert("Phone number must contain exactly 10 digits");
      return false;
    }

    // Email Validation
    const emailRegex =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      alert("Enter a valid email address");
      return false;
    }

    // Password Validation
    // Minimum 8 chars, 1 letter, 1 number
    const passwordRegex =
      /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,}$/;

    if (!passwordRegex.test(password)) {
      alert(
        "Password must contain minimum 8 characters, at least 1 letter and 1 number"
      );
      return false;
    }

    // Age Validation
    if (age < 10) {
      alert("Age must be above 10");
      return false;
    }

    return true;
  };

  // REGISTER
  const handleRegister = async () => {
    if (
      !fullName ||
      !phoneNumber ||
      !email ||
      !password ||
      !dateOfBirth
    ) {
      alert("Please fill in all fields");
      return;
    }

    if (!validateForm()) {
      return;
    }

    try {
      await registerUser({
        fullName,
        phoneNumber: `${countryCode}${phoneNumber}`,
        email,
        password,
        dateOfBirth,
        age,
      });

      localStorage.setItem(
        "userProfile",
        JSON.stringify({
          id: "U" + Date.now(),
          fullName,
          phoneNumber: `${countryCode}${phoneNumber}`,
          email,
          dateOfBirth,
          age,
        })
      );

      alert("Registration successful");

      nav("/set-pin");

    } catch (err) {
      console.error("ERROR:", err);

      alert(err.message || "Registration failed");
    }
  };

  return (
    <div className="auth-container">
      <h2>Create Account</h2>

      {/* FULL NAME */}
      <input
        type="text"
        placeholder="Full Name"
        value={fullName}
        onChange={(e) => setFullName(e.target.value)}
      />

      {/* PHONE NUMBER WITH COUNTRY CODE */}
      <div className="phone-container">
        <select
          value={countryCode}
          onChange={(e) => setCountryCode(e.target.value)}
        >
          <option value="+91">🇮🇳 +91</option>
          <option value="+1">🇺🇸 +1</option>
          <option value="+44">🇬🇧 +44</option>
          <option value="+61">🇦🇺 +61</option>
          <option value="+81">🇯🇵 +81</option>
          <option value="+971">🇦🇪 +971</option>
        </select>

        <input
          type="tel"
          placeholder="Phone Number"
          value={phoneNumber}
          maxLength="10"
          onChange={(e) =>
            setPhoneNumber(e.target.value.replace(/\D/g, ""))
          }
        />
      </div>

      {/* EMAIL */}
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      {/* PASSWORD */}
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      {/* DOB */}
      <input
        type="date"
        value={dateOfBirth}
        onChange={handleDOBChange}
      />

      {/* AGE */}
      <input
        type="text"
        placeholder="Age"
        value={age}
        readOnly
      />

      <button onClick={handleRegister}>
        Register
      </button>

      <p onClick={() => nav("/login")}>
        Already have an account? Sign in
      </p>
    </div>
  );
};

export default Register;