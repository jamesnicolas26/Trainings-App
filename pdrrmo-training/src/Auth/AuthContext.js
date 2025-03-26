import React, { createContext, useState, useContext, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const login = async (userData) => {
    try {
      if (!userData.role) {
        console.error("Role is missing in user data during login.");
        throw new Error("User role is required.");
      }
      setUser(userData);
      localStorage.setItem("user", JSON.stringify(userData));
      localStorage.setItem("token", userData.token);
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
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
      setUser((prevUser) => ({
        ...prevUser,
        token: data.token,
        role: data.role || prevUser.role, // Ensure role is preserved or updated
      }));
      localStorage.setItem("token", data.token);
      localStorage.setItem(
        "user",
        JSON.stringify({
          ...user,
          token: data.token,
          role: data.role || user?.role,
        })
      );
    } catch (error) {
      console.error("Error regenerating token:", error.message);
    }
  };

  useEffect(() => {
    const checkAndRefreshToken = async () => {
      const token = localStorage.getItem("token");

      if (token) {
        const tokenExpiry = JSON.parse(atob(token.split(".")[1])).exp * 1000;
        const now = Date.now();

        if (tokenExpiry - now < 5 * 60 * 1000) {
          await clearAndRegenerateToken();
        }
      }
    };

    checkAndRefreshToken();
  }, []);

  const isAuthenticated = Boolean(user);

  return (
    <AuthContext.Provider
      value={{
        user,
        currentUser: user,
        login,
        logout,
        isAuthenticated,
        clearAndRegenerateToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
