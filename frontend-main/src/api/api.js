const BASE_URL = "http://localhost:8082";
const GATEWAY_URL = "http://localhost:8080";

const getToken = () => localStorage.getItem("token");
const getUserId = () => localStorage.getItem("userId");

export const registerUser = async (data) => {
  const res = await fetch(`${BASE_URL}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res;
};

export const loginUser = async (data) => {
  const res = await fetch(`${BASE_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || "Invalid credentials");
  }

  const result = await res.json();
  localStorage.setItem("token", result.token);

  // ✅ Fetch profile immediately to store numeric userId
  const profileRes = await fetch(`${GATEWAY_URL}/users/user/profile`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${result.token}`, // use result.token directly, not getToken()
    },
  });

  if (profileRes.ok) {
    const profileText = await profileRes.text();
    const profile = JSON.parse(profileText);
    localStorage.setItem("userId", profile.userId); // ✅ stored immediately after login
    console.log("userId stored:", profile.userId);
  }

  return result;
};
export const getUserProfile = async () => {
  const token = getToken();

  const response = await fetch(`${GATEWAY_URL}/users/user/profile`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const text = await response.text();
  if (!response.ok) throw new Error(text);
  const data = JSON.parse(text);

  localStorage.setItem("userId", data.userId); // ✅ stores numeric userId
  return data;
};
export const getWallet = async () => {
  const token = getToken();
  const userId = getUserId();

  const response = await fetch(`${GATEWAY_URL}/wallet/${userId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const text = await response.text();
  if (!response.ok) throw new Error(text);
  return JSON.parse(text);
};

export const creditMoney = async (amount) => {
  const token = getToken();
  const userId = getUserId();

  const response = await fetch(`${GATEWAY_URL}/wallet/${userId}/credit?amount=${amount}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const text = await response.text();
  if (!response.ok) throw new Error(text);
  return text;
};

export const debitMoney = async (amount) => {
  const token = getToken();
  const userId = getUserId();

  const response = await fetch(`${GATEWAY_URL}/wallet/${userId}/debit?amount=${amount}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const text = await response.text();
  if (!response.ok) throw new Error(text);
  return text;
};

export const setPinAPI = async (pin) => {
  const res = await fetch(`${GATEWAY_URL}/wallet/set-pin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify({ pin }),
  });
  return res;
};

export const verifyPinAPI = async (pin) => {
  const res = await fetch(`${GATEWAY_URL}/wallet/verify-pin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify({ pin }),
  });
  return res;
};

export const getTransactionHistory = async (walletId) => {

  const response = await fetch(
    `http://localhost:8080/transactions/history/${userId}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch transaction history");
  }

  return await response.json();
};

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

    throw new Error(text || "Transfer failed");
  }

  return await response.json();
};


export const getTransferHistory = async (userId) => {

  const response = await fetch(
    `http://localhost:8080/transactions/history/${userId}`,
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



