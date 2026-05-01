const BASE_URL = "https://interview-backend-3n8v.onrender.com";

// REGISTER (always USER)
export const registerUser = async (data) => {
  const res = await fetch(`${BASE_URL}/users/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("Register failed");
  return res.json();
};

// LOGIN
export const loginUser = async (data) => {
  const res = await fetch(`${BASE_URL}/users/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  const result = await res.json();

  if (!res.ok) throw new Error("Login failed");

  localStorage.setItem("token", result.token);
  localStorage.setItem("role", result.role);

  return result;
};

// ADD QUESTION (ADMIN)
export const addQuestion = async (question) => {
  const token = localStorage.getItem("token");

  const res = await fetch(`${BASE_URL}/questions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(question),
  });

  if (!res.ok) throw new Error("Add failed");
  return res.json();
};

// get questions
export const getQuestions = async () => {
  const token = localStorage.getItem("token");

  const res = await fetch(`${BASE_URL}/questions`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) throw new Error("Failed to fetch");

  return res.json();
};