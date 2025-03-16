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
        const response = await api.get("/api/auth/me"); // API to verify token
        setUser(response.data.user.id);
        if (user) navigate("/dashboard");
      } catch (error) {
        console.log(error);
        logout();
      }
    };

    const token = localStorage.getItem("token");
    if (token) checkAuth();
  }, [user]);

  const login = async (email, password) => {
    try {
      const response = await api.post("/api/auth/login", { email, password });
      localStorage.setItem("token", response.data.token);
      // setUser(response.data.user);
      setUser("user");
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
