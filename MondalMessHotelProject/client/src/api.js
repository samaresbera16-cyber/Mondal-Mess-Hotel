import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
});

// Login korar por token ebong user save korbe
export function saveSession(token, user) {
  if (!token || !user) {
    throw new Error("Login response is missing token or user information");
  }

  localStorage.setItem("mmh_token", token);
  localStorage.setItem("mmh_user", JSON.stringify(user));
}

// Refresh hole saved user restore korbe
export function getLoggedInUser() {
  try {
    const token = localStorage.getItem("mmh_token");
    const savedUser = localStorage.getItem("mmh_user");

    if (!token || !savedUser) {
      return null;
    }

    return JSON.parse(savedUser);
  } catch (error) {
    console.error("Could not restore login session:", error);
    clearSession();
    return null;
  }
}

// Logout korle token ebong user delete korbe
export function clearSession() {
  localStorage.removeItem("mmh_token");
  localStorage.removeItem("mmh_user");
}

// Prottek protected API request-e JWT token pathabe
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("mmh_token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default api;