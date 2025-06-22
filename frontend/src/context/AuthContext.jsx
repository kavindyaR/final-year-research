import { createContext, useContext, useEffect, useState } from "react";
import axios from "../api/axiosInstance";
import { ENDPOINTS } from "../api/endpoints";
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
        const response = await axios.get(ENDPOINTS.USERPROFILE); // API to verify token
        setUser(response.data);
      } catch (error) {
        console.log("Auth check failed:", error.message);
        setUser(null);
        logout();
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
      const response = await axios.post(ENDPOINTS.LOGIN, {
        email,
        password,
      });
      localStorage.setItem("accessToken", response.data.token);
      localStorage.setItem("refreshToken", response.data.refreshToken);
      setUser(response.data);

      navigate("/");
    } catch (error) {
      console.error("Login failed", error.response?.data?.message);
      navigate("/login");
    }
  };

  const register = async (userName, email, password) => {
    try {
      await axios.post(ENDPOINTS.REGISTER, {
        userName,
        email,
        password,
      });
      console.log("Im here");
      login(email, password); // Auto-login after registration
    } catch (error) {
      console.error("Registration failed", error.response?.data?.message);
    }
  };

  const logout = async () => {
    try {
      // console.log(localStorage.getItem("refreshToken"));
      await axios.get(ENDPOINTS.LOGOUT, {
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
