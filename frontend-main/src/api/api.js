const BASE_URL = "http://localhost:8082";
const GATEWAY_URL = "http://localhost:8080";

/* ======================================================
   HELPERS
====================================================== */

const getToken = () => localStorage.getItem("token");

const getUserId = () => localStorage.getItem("userId");

/* ======================================================
   REGISTER USER
====================================================== */

export const registerUser = async (data) => {

  const res = await fetch(`${BASE_URL}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {

    const text = await res.text();

    throw new Error(text || "Registration Failed");
  }

  const result = await res.json();

  // SAVE TOKEN
  localStorage.setItem("token", result.token);

  // FETCH PROFILE
  const profileRes = await fetch(
    `${GATEWAY_URL}/users/user/profile`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${result.token}`,
      },
    }
  );

  if (profileRes.ok) {

    const profile = await profileRes.json();

    localStorage.setItem("userId", profile.userId);

    localStorage.setItem("email", profile.email);

    localStorage.setItem("fullName", profile.fullName);

    console.log("REGISTER PROFILE:", profile);
  }

  return result;
};

/* ======================================================
   LOGIN USER
====================================================== */

export const loginUser = async (data) => {

  const res = await fetch(`${BASE_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {

    const text = await res.text();

    throw new Error(text || "Invalid Credentials");
  }

  const result = await res.json();

  // SAVE TOKEN
  localStorage.setItem("token", result.token);

  // FETCH PROFILE
  const profileRes = await fetch(
    `${GATEWAY_URL}/users/user/profile`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${result.token}`,
      },
    }
  );

  if (profileRes.ok) {

    const profile = await profileRes.json();

    localStorage.setItem("userId", profile.userId);

    localStorage.setItem("email", profile.email);

    localStorage.setItem("fullName", profile.fullName);

    console.log("LOGIN PROFILE:", profile);
  }

  return result;
};

/* ======================================================
   GET USER PROFILE
====================================================== */

export const getUserProfile = async () => {

  const token = getToken();

  const response = await fetch(
    `${GATEWAY_URL}/users/user/profile`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!response.ok) {

    const text = await response.text();

    throw new Error(text);
  }

  const data = await response.json();

  // SAVE PROFILE AGAIN
  localStorage.setItem("userId", data.userId);

  localStorage.setItem("email", data.email);

  localStorage.setItem("fullName", data.fullName);

  return data;
};

/* ======================================================
   GET WALLET
====================================================== */

export const getWallet = async () => {

  const token = getToken();

  const userId = getUserId();

  const response = await fetch(
    `${GATEWAY_URL}/wallet/${userId}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!response.ok) {

    const text = await response.text();

    throw new Error(text);
  }

  return await response.json();
};

/* ======================================================
   CREDIT MONEY
====================================================== */

export const creditMoney = async (amount) => {

  const token = getToken();

  const userId = getUserId();

  const response = await fetch(
    `${GATEWAY_URL}/wallet/${userId}/credit?amount=${amount}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const text = await response.text();

  if (!response.ok) {

    throw new Error(text);
  }

  return text;
};

/* ======================================================
   DEBIT MONEY
====================================================== */

export const debitMoney = async (amount) => {

  const token = getToken();

  const userId = getUserId();

  const response = await fetch(
    `${GATEWAY_URL}/wallet/${userId}/debit?amount=${amount}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const text = await response.text();

  if (!response.ok) {

    throw new Error(text);
  }

  return text;
};

/* ======================================================
   SET PIN
====================================================== */

export const setPinAPI = async (pin) => {

  const response = await fetch(
    `${GATEWAY_URL}/wallet/set-pin`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`,
      },
      body: JSON.stringify({ pin }),
    }
  );

  return response;
};

/* ======================================================
   VERIFY PIN
====================================================== */

export const verifyPinAPI = async (pin) => {

  const response = await fetch(
    `${GATEWAY_URL}/wallet/verify-pin`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`,
      },
      body: JSON.stringify({ pin }),
    }
  );

  return response;
};

/* ======================================================
   TRANSFER MONEY
====================================================== */

export const transferMoney = async (data) => {

  const token = getToken();

  const response = await fetch(
    `${GATEWAY_URL}/transactions/transfer`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    }
  );

  if (!response.ok) {

    const text = await response.text();

    throw new Error(text || "Transfer Failed");
  }

  return await response.json();
};

/* ======================================================
   GET TRANSFER HISTORY
====================================================== */

export const getTransferHistory = async (userId) => {

  const response = await fetch(
    `${GATEWAY_URL}/transactions/history/${userId}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`
      }
    }
  );

  if (!response.ok) {

    throw new Error("Failed to fetch history");
  }

  return await response.json();
};

/* ======================================================
   GET TRANSACTION HISTORY
====================================================== */

export const getTransactionHistory = async (userId) => {

  const response = await fetch(
    `${GATEWAY_URL}/transactions/history/${userId}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`
      }
    }
  );

  if (!response.ok) {

    throw new Error("Failed to fetch transaction history");
  }

  return await response.json();
};

/* ======================================================
   LOGOUT
====================================================== */

export const logoutUser = () => {

  localStorage.removeItem("token");

  localStorage.removeItem("userId");

  localStorage.removeItem("email");

  localStorage.removeItem("fullName");

  window.location.href = "/";
};