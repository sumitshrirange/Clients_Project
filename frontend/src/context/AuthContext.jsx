import { createContext, useContext, useEffect, useState, useCallback } from "react";
import * as authApi from "../services/adminService";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);

  // On mount, check for a persistent session (the httpOnly cookie set at
  // login) so a page refresh doesn't kick the admin back to the login screen.
  useEffect(() => {
    authApi
      .getMe()
      .then(setAdmin)
      .catch(() => setAdmin(null))
      .finally(() => setLoading(false));
  }, []);

  const signIn = useCallback(async (email, password) => {
    const res = await authApi.login(email, password);
    localStorage.setItem("pw_admin_token", res.token);
    setAdmin(res.admin);
    return res.admin;
  }, []);

  const signOut = useCallback(async () => {
    try {
      await authApi.logout();
    } finally {
      localStorage.removeItem("pw_admin_token");
      setAdmin(null);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ admin, loading, signIn, signOut, isAuthenticated: !!admin }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
