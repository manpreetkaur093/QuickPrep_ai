const BASE_URL = "https://interview-backend-3n8v.onrender.com";

// 🔐 LOGIN
export const loginUser = async (data) => {
  const res = await fetch(`${BASE_URL}/users/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error("Login failed");
  }

  return res.text(); // backend returns token as plain text
};

// 📝 REGISTER
export const registerUser = async (data) => {
  const res = await fetch(`${BASE_URL}/users/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error("Registration failed");
  }

  return res.json();
};

// 📥 GET QUESTIONS (Protected)
export const getQuestions = async () => {
  const token = localStorage.getItem("token");

  const res = await fetch(`${BASE_URL}/questions`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch questions");
  }

  return res.json();
};