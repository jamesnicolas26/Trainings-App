import React, { useEffect } from "react";
import { useAuth } from "../Auth/AuthContext";

const Logout = () => {
  const { logout } = useAuth();

  useEffect(() => {
    logout(); // Log the user out on component mount
  }, [logout]);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#f0f4f8",
      }}
    >
      <h1 style={{ color: "#2c3e50" }}>You have been logged out!</h1>
    </div>
  );
};

export default Logout;
