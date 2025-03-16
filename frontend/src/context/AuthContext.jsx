import { createContext, useContext, useEffect, useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Check if user is already authenticated
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await api.get("/api/user/profile"); // API to verify token
        setUser(response.data);
      } catch (error) {
        console.log("Auth check failed:", error.message);
        setUser(null);
        // logout();
      } finally {
        setLoading(false);
      }
    };

    const token = localStorage.getItem("accessToken");
    if (token) {
      checkAuth();
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (email, password) => {
    try {
      const response = await api.post("/api/auth/login", { email, password });
      localStorage.setItem("accessToken", response.data.token.accessToken);
      localStorage.setItem("refreshToken", response.data.token.refreshToken);
      // localStorage.setItem("user", response.data.user);
      setUser(response.data.user);
      navigate("/dashboard");
    } catch (error) {
      console.error("Login failed", error.response?.data?.message);
    }
  };

  const register = async (username, email, password) => {
    try {
      await api.post("/api/auth/register", { username, email, password });
      login(email, password); // Auto-login after registration
    } catch (error) {
      console.error("Registration failed", error.response?.data?.message);
    }
  };

  const logout = async () => {
    try {
      await api.post("/api/auth/logout", {
        refreshToken: localStorage.getItem("refreshToken"),
      });
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      setUser(null);
      navigate("/login");
    } catch (error) {
      console.error("Registration failed", error.response?.data?.message);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
