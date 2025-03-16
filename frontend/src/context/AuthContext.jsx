import { createContext, useContext, useEffect, useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Check if user is already authenticated
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await api.get("/auth/me"); // API to verify token
        setUser(response.data.user);
      } catch (error) {
        logout();
      }
    };

    const token = localStorage.getItem("token");
    if (token) checkAuth();
  }, []);

  const login = async (email, password) => {
    try {
      const response = await api.post("/auth/login", { email, password });
      localStorage.setItem("token", response.data.token);
      setUser(response.data.user);
      navigate("/dashboard");
    } catch (error) {
      console.error("Login failed", error.response?.data?.message);
    }
  };

  const register = async (email, password) => {
    try {
      await api.post("/auth/register", { email, password });
      login(email, password); // Auto-login after registration
    } catch (error) {
      console.error("Registration failed", error.response?.data?.message);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
