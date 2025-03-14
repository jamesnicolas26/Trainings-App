import React, { createContext, useState, useContext, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const login = async (userData) => {
    try {
      setUser(userData);
      localStorage.setItem("user", JSON.stringify(userData)); // Store user details including JWT token
      localStorage.setItem("token", userData.token); // Save token separately
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token"); // Ensure token is cleared during logout
  };

  const clearAndRegenerateToken = async () => {
    try {
      const oldToken = localStorage.getItem("token");

      if (!oldToken) {
        console.error("No token found to refresh.");
        return;
      }

      const response = await fetch("http://localhost:5000/api/auth/refresh-token", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${oldToken}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to generate new token.");
      }

      const data = await response.json();
      localStorage.setItem("token", data.token); // Save the new token
      setUser((prevUser) => ({ ...prevUser, token: data.token })); // Update user state
      console.log("New token generated:", data.token);
    } catch (error) {
      console.error("Error regenerating token:", error.message);
    }
  };

  useEffect(() => {
    const checkAndRefreshToken = async () => {
      const token = localStorage.getItem("token");

      if (token) {
        const tokenExpiry = JSON.parse(atob(token.split(".")[1])).exp * 1000; // Decode JWT and get expiry
        const now = Date.now();

        if (tokenExpiry - now < 5 * 60 * 1000) { // Refresh if less than 5 minutes left
          await clearAndRegenerateToken();
        }
      }
    };

    checkAndRefreshToken();
  }, []);

  const isAuthenticated = Boolean(user);

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated, clearAndRegenerateToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);