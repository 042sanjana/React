const BASE_URL = "http://localhost:8082";
const GATEWAY_URL = "http://localhost:8080";

/* ======================================================
   HELPERS
====================================================== */

const getToken = () =>
  localStorage.getItem("token");

const getUserId = () =>
  localStorage.getItem("userId");

const getEmail = () =>
  localStorage.getItem("email");

/* ======================================================
   REGISTER USER
====================================================== */

export const registerUser = async (data) => {

  const res = await fetch(
    `${BASE_URL}/register`,
    {
      method: "POST",
      headers: {
        "Content-Type":
          "application/json"
      },
      body: JSON.stringify(data),
    }
  );

  if (!res.ok) {

    const text = await res.text();

    throw new Error(
      text || "Registration Failed"
    );
  }

  const result = await res.json();

  // SAVE TOKEN
  localStorage.setItem(
    "token",
    result.token
  );

  // FETCH PROFILE
  const profileRes = await fetch(
    `${GATEWAY_URL}/users/user/profile`,
    {
      method: "GET",
      headers: {
        "Content-Type":
          "application/json",

        Authorization:
          `Bearer ${result.token}`,
      },
    }
  );

  if (profileRes.ok) {

    const profile =
      await profileRes.json();

    localStorage.setItem(
      "userId",
      profile.userId
    );

    localStorage.setItem(
      "email",
      profile.email
    );

    localStorage.setItem(
      "fullName",
      profile.fullName
    );
  }

  return result;
};

/* ======================================================
   LOGIN USER
====================================================== */

export const loginUser = async (data) => {

  const res = await fetch(
    `${BASE_URL}/login`,
    {
      method: "POST",
      headers: {
        "Content-Type":
          "application/json"
      },
      body: JSON.stringify(data),
    }
  );

  if (!res.ok) {

    const text = await res.text();

    throw new Error(
      text || "Invalid Credentials"
    );
  }

  const result = await res.json();

  localStorage.setItem(
    "token",
    result.token
  );

  // FETCH PROFILE
  const profileRes = await fetch(
    `${GATEWAY_URL}/users/user/profile`,
    {
      method: "GET",
      headers: {
        "Content-Type":
          "application/json",

        Authorization:
          `Bearer ${result.token}`,
      },
    }
  );

  if (profileRes.ok) {

    const profile =
      await profileRes.json();

    localStorage.setItem(
      "userId",
      profile.userId
    );

    localStorage.setItem(
      "email",
      profile.email
    );

    localStorage.setItem(
      "fullName",
      profile.fullName
    );
  }

  return result;
};

/* ======================================================
   GET PROFILE
====================================================== */

export const getUserProfile =
  async () => {

    const response = await fetch(
      `${GATEWAY_URL}/users/user/profile`,
      {
        method: "GET",
        headers: {
          "Content-Type":
            "application/json",

          Authorization:
            `Bearer ${getToken()}`
        },
      }
    );

    if (!response.ok) {

      const text =
        await response.text();

      throw new Error(text);
    }

    const data =
      await response.json();

    localStorage.setItem(
      "userId",
      data.userId
    );

    localStorage.setItem(
      "email",
      data.email
    );

    localStorage.setItem(
      "fullName",
      data.fullName
    );

    return data;
  };

/* ======================================================
   GET WALLET
====================================================== */

export const getWallet =
  async () => {

    const response = await fetch(
      `${GATEWAY_URL}/wallet/${getUserId()}`,
      {
        method: "GET",
        headers: {
          "Content-Type":
            "application/json",

          Authorization:
            `Bearer ${getToken()}`
        },
      }
    );

    if (!response.ok) {

      const text =
        await response.text();

      throw new Error(text);
    }

    return await response.json();
  };

/* ======================================================
   CREDIT MONEY
====================================================== */

export const creditMoney =
  async (amount) => {

    const response = await fetch(
      `${GATEWAY_URL}/wallet/${getUserId()}/credit?amount=${amount}`,
      {
        method: "POST",
        headers: {
          "Content-Type":
            "application/json",

          Authorization:
            `Bearer ${getToken()}`
        },
      }
    );

    const text =
      await response.text();

    if (!response.ok) {

      throw new Error(text);
    }

    return text;
  };

/* ======================================================
   DEBIT MONEY
====================================================== */

/* ======================================================
   DEBIT MONEY
====================================================== */

export const debitMoney = async (
  userId,
  amount
) => {

  const response = await fetch(
    `${GATEWAY_URL}/wallet/${userId}/debit?amount=${amount}`,
    {
      method: "POST",

      headers: {
        "Content-Type": "application/json",

        Authorization:
          `Bearer ${getToken()}`
      }
    }
  );

  const text =
    await response.text();

  if (!response.ok) {

    throw new Error(
      text || "Debit Failed"
    );
  }

  return JSON.parse(text);
};

/* ======================================================
   SET PIN
====================================================== */

export const setPinAPI =
  async (pin) => {

    const response = await fetch(
      `${GATEWAY_URL}/wallet/set-pin`,
      {
        method: "POST",
        headers: {
          "Content-Type":
            "application/json",

          Authorization:
            `Bearer ${getToken()}`
        },

        body: JSON.stringify({
          email: getEmail(),
          pin
        }),
      }
    );

    if (!response.ok) {

      const text =
        await response.text();

      throw new Error(text);
    }

    return await response.text();
  };

/* ======================================================
   VERIFY PIN
====================================================== */

export const verifyPinAPI =
  async (pin) => {

    const response = await fetch(
      `${GATEWAY_URL}/wallet/verify-pin`,
      {
        method: "POST",
        headers: {
          "Content-Type":
            "application/json",

          Authorization:
            `Bearer ${getToken()}`
        },

        body: JSON.stringify({
          email: getEmail(),
          pin
        })
      }
    );

    if (!response.ok) {

      const text =
        await response.text();

      throw new Error(
        text || "Invalid PIN"
      );
    }

    return await response.text();
  };

/* ======================================================
   TRANSFER MONEY
====================================================== */

export const transferMoney =
  async (data) => {

    const response = await fetch(
      `${GATEWAY_URL}/transactions/transfer`,
      {
        method: "POST",

        headers: {
          "Content-Type":
            "application/json",

          Authorization:
            `Bearer ${getToken()}`
        },

        body: JSON.stringify(data),
      }
    );

    if (!response.ok) {

      const text =
        await response.text();

      throw new Error(
        text || "Transfer Failed"
      );
    }

    return await response.json();
  };

/* ======================================================
   TRANSFER HISTORY
====================================================== */

export const getTransferHistory =
  async () => {

    const email =
      encodeURIComponent(
        getEmail()
      );

    const response = await fetch(
      `${GATEWAY_URL}/transactions/history/${email}`,
      {
        method: "GET",

        headers: {
          "Content-Type":
            "application/json",

          Authorization:
            `Bearer ${getToken()}`
        }
      }
    );

    if (!response.ok) {

      throw new Error(
        "Failed to fetch history"
      );
    }

    return await response.json();
  };

/* ======================================================
   GET USER BY EMAIL
====================================================== */

export const logoutUser = () => {

  localStorage.removeItem("token");

  localStorage.removeItem("userId");

  localStorage.removeItem("email");

  localStorage.removeItem("fullName");

  window.location.href = "/";
};
export const getWalletHistory =
  async () => {

    const response = await fetch(
      `${GATEWAY_URL}/wallet/${getUserId()}/history`,
      {
        method: "GET",

        headers: {
          "Content-Type":
            "application/json",

          Authorization:
            `Bearer ${getToken()}`
        }
      }
    );

    if (!response.ok) {

      throw new Error(
        "Failed to fetch wallet history"
      );
    }

    return await response.json();
  };