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

  // =========================
  // AGE CALCULATION
  // =========================

  const calculateAge = (dob) => {
    if (!dob) return "";

    const birthDate = new Date(dob);
    const today = new Date();

    if (birthDate > today) {
      return -1;
    }

    let calculatedAge =
      today.getFullYear() -
      birthDate.getFullYear();

    const monthDifference =
      today.getMonth() -
      birthDate.getMonth();

    if (
      monthDifference < 0 ||
      (monthDifference === 0 &&
        today.getDate() < birthDate.getDate())
    ) {
      calculatedAge--;
    }

    return calculatedAge;
  };

  // =========================
  // DOB CHANGE
  // =========================

  const handleDOBChange = (e) => {
    const dob = e.target.value;

    setDateOfBirth(dob);

    const calculatedAge =
      calculateAge(dob);

    setAge(
      calculatedAge > 0
        ? calculatedAge
        : ""
    );
  };

  // =========================
  // VALIDATIONS
  // =========================

  const validateForm = () => {

    // FULL NAME
    const nameRegex =
      /^[A-Za-z ]{3,50}$/;

    if (
      !nameRegex.test(
        fullName.trim()
      )
    ) {
      alert(
        "Full Name must contain only letters and spaces (3-50 characters)"
      );
      return false;
    }

    // PHONE NUMBER
    const phoneRegex =
      /^[0-9]{10}$/;

    if (
      !phoneRegex.test(
        phoneNumber
      )
    ) {
      alert(
        "Phone number must contain exactly 10 digits"
      );
      return false;
    }

    // GMAIL ONLY
    const gmailRegex =
      /^[a-zA-Z0-9._%+-]+@gmail\.com$/;

    if (
      !gmailRegex.test(
        email.trim()
      )
    ) {
      alert(
        "Only Gmail addresses are allowed"
      );
      return false;
    }

    // PASSWORD
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&]).{8,}$/;

    if (
      !passwordRegex.test(
        password
      )
    ) {
      alert(
        "Password must contain:\n\n" +
        "• Minimum 8 characters\n" +
        "• At least 1 uppercase letter\n" +
        "• At least 1 lowercase letter\n" +
        "• At least 1 number\n" +
        "• At least 1 special character"
      );

      return false;
    }

    // DOB REQUIRED
    if (!dateOfBirth) {
      alert(
        "Date of Birth is required"
      );
      return false;
    }

    const birthDate =
      new Date(dateOfBirth);

    const today =
      new Date();

    // FUTURE DATE
    if (
      birthDate > today
    ) {
      alert(
        "Date of Birth cannot be in the future"
      );
      return false;
    }

    const calculatedAge =
      calculateAge(
        dateOfBirth
      );

    // INVALID DOB
    if (
      calculatedAge < 0
    ) {
      alert(
        "Invalid Date of Birth"
      );
      return false;
    }

    // MIN AGE
    if (
      calculatedAge < 18
    ) {
      alert(
        "You must be at least 18 years old to register"
      );
      return false;
    }

    // MAX AGE
    if (
      calculatedAge > 100
    ) {
      alert(
        "Please enter a valid Date of Birth"
      );
      return false;
    }

    return true;
  };

  // =========================
  // REGISTER
  // =========================

  const handleRegister =
    async () => {

      if (
        !fullName ||
        !phoneNumber ||
        !email ||
        !password ||
        !dateOfBirth
      ) {
        alert(
          "Please fill in all fields"
        );
        return;
      }

      if (
        !validateForm()
      ) {
        return;
      }

      try {

        const normalizedEmail =
          email
            .trim()
            .toLowerCase();

        await registerUser({
          fullName:
            fullName.trim(),

          phoneNumber:
            `${countryCode}${phoneNumber}`,

          email:
            normalizedEmail,

          password,

          dateOfBirth,

          age,
        });

        localStorage.setItem(
          "userProfile",

          JSON.stringify({

            id:
              "U" +
              Date.now(),

            fullName:
              fullName.trim(),

            phoneNumber:
              `${countryCode}${phoneNumber}`,

            email:
              normalizedEmail,

            dateOfBirth,

            age,
          })
        );

        alert(
          "Registration Successful"
        );

        nav("/set-pin");

      } catch (err) {

        console.error(
          "ERROR:",
          err
        );

        alert(
          err.message ||
          "Registration Failed"
        );
      }
    };

  return (

    <div className="auth-container">

      <h2>
        Create Account
      </h2>

      {/* FULL NAME */}

      <input
        type="text"
        placeholder="Full Name"
        value={fullName}
        maxLength={50}
        onChange={(e) =>
          setFullName(
            e.target.value
          )
        }
      />

      {/* PHONE */}

      <div className="phone-container">

        <select
          value={
            countryCode
          }
          onChange={(e) =>
            setCountryCode(
              e.target.value
            )
          }
        >
          <option value="+91">
            🇮🇳 +91
          </option>

          <option value="+1">
            🇺🇸 +1
          </option>

          <option value="+44">
            🇬🇧 +44
          </option>

          <option value="+61">
            🇦🇺 +61
          </option>

          <option value="+81">
            🇯🇵 +81
          </option>

          <option value="+971">
            🇦🇪 +971
          </option>

        </select>

        <input
          type="tel"
          placeholder="Phone Number"
          value={
            phoneNumber
          }
          maxLength={10}
          onChange={(e) =>
            setPhoneNumber(
              e.target.value.replace(
                /\D/g,
                ""
              )
            )
          }
        />

      </div>

      {/* EMAIL */}

      <input
        type="email"
        placeholder="Enter Gmail Address"
        value={email}
        onChange={(e) =>
          setEmail(
            e.target.value
          )
        }
      />

      {/* PASSWORD */}

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) =>
          setPassword(
            e.target.value
          )
        }
      />

      {/* DOB */}

      <input
        type="date"
        value={
          dateOfBirth
        }
        onChange={
          handleDOBChange
        }
        min="1926-01-01"
        max={
          new Date(
            new Date().setFullYear(
              new Date().getFullYear() - 10
            )
          )
            .toISOString()
            .split("T")[0]
        }
      />

      {/* AGE */}

      <input
        type="text"
        placeholder="Age"
        value={age}
        readOnly
      />

      <button
        onClick={
          handleRegister
        }
      >
        Register
      </button>

      <p
        onClick={() =>
          nav("/login")
        }
        style={{
          cursor: "pointer"
        }}
      >
        Already have an account?
        Sign In
      </p>

    </div>
  );
};

export default Register;