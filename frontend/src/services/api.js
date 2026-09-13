import axios from "axios";

// Never hardcode the API URL — it's read from the environment so the same
// build can point at localhost in dev and the real API host in production.
const baseURL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const api = axios.create({
  baseURL,
  withCredentials: true, // sends the httpOnly JWT cookie set by the backend
});

// If a client stores the token itself (rather than relying purely on the
// cookie), attach it as a Bearer header too.
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("pw_admin_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
