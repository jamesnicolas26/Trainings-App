import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

const RoleProtectedRoute = ({ children, requiredRole }) => {
  const { user } = useAuth();

  if (!user || user.role !== requiredRole) {
    return <Navigate to="/not-authorized" />;
  }

  return children;
};

export default RoleProtectedRoute;
