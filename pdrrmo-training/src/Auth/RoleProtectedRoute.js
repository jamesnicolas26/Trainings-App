import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

const RoleProtectedRoute = ({ children, requiredRole }) => {
  const { user } = useAuth();

  if (!user || user.role !== requiredRole) {
    alert("Access denied. You do not have the required permissions.");
    return <Navigate to="/home" />;
  }

  return children;
};

export default RoleProtectedRoute;
