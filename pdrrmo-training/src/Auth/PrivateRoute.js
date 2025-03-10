import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useAuth(); // Access authentication state from context

  return isAuthenticated ? children : <Navigate to="/" />;
};

export default PrivateRoute;
