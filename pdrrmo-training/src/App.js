import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Trainings from "./pages/Trainings";
import Users from "./pages/Users";
import Login from "./components/Login";
import Register from "./components/Register";
import AddTraining from "./components/AddTraining";
import EditUser from "./components/EditUser"; // Import EditUser component
import Logout from "./components/Logout"; // Import Logout component
import PrivateRoute from "./Auth/PrivateRoute"; // Import PrivateRoute component

export default function App() {
  const [users, setUsers] = useState(() => {
    try {
      const savedUsers = localStorage.getItem("users");
      return savedUsers ? JSON.parse(savedUsers) : [];
    } catch (error) {
      console.error("Error reading users from localStorage:", error);
      return [];
    }
  });

  const [trainings, setTrainings] = useState(() => {
    try {
      const savedTrainings = localStorage.getItem("trainings");
      return savedTrainings ? JSON.parse(savedTrainings) : [];
    } catch (error) {
      console.error("Error reading trainings from localStorage:", error);
      return [];
    }
  });

  const [isAuthenticated, setIsAuthenticated] = useState(false); // Authentication state

  useEffect(() => {
    try {
      localStorage.setItem("users", JSON.stringify(users));
    } catch (error) {
      console.error("Error saving users to localStorage:", error);
    }
  }, [users]);

  useEffect(() => {
    try {
      localStorage.setItem("trainings", JSON.stringify(trainings));
    } catch (error) {
      console.error("Error saving trainings to localStorage:", error);
    }
  }, [trainings]);

  const addUser = (user) => {
    setUsers((prevUsers) => [...prevUsers, user]);
  };

  const deleteUser = (index) => {
    setUsers((prevUsers) => prevUsers.filter((_, i) => i !== index));
  };

  const updateUser = (index, updatedUser) => {
    setUsers((prevUsers) => {
      const updatedUsers = [...prevUsers];
      updatedUsers[index] = updatedUser;
      return updatedUsers;
    });
  };

  const addTraining = (training) => {
    setTrainings((prevTrainings) => [...prevTrainings, training]);
  };

  const deleteTraining = (index) => {
    setTrainings((prevTrainings) => prevTrainings.filter((_, i) => i !== index));
  };

  const login = () => {
    setIsAuthenticated(true);
  };

  const logout = () => {
    setIsAuthenticated(false);
  };

  return (
      <Routes>
        <Route
          path="/"
          element={<Login users={users} onLogin={login} />} // Pass login function to Login
        />
        <Route
          path="/home"
          element={
            <PrivateRoute isAuthenticated={isAuthenticated}>
              <Home />
            </PrivateRoute>
          }
        />
        <Route
          path="/trainings"
          element={
            <PrivateRoute isAuthenticated={isAuthenticated}>
              <Trainings trainings={trainings} deleteTraining={deleteTraining} />
            </PrivateRoute>
          }
        />
        <Route
          path="/addtraining"
          element={
            <PrivateRoute isAuthenticated={isAuthenticated}>
              <AddTraining addTraining={addTraining} />
            </PrivateRoute>
          }
        />
        <Route
          path="/users"
          element={
            <PrivateRoute isAuthenticated={isAuthenticated}>
              <Users users={users} deleteUser={deleteUser} />
            </PrivateRoute>
          }
        />
        <Route
          path="/edituser/:id"
          element={
            <PrivateRoute isAuthenticated={isAuthenticated}>
              <EditUser users={users} updateUser={updateUser} />
            </PrivateRoute>
          }
        />
        <Route
          path="/logout"
          element={
            <PrivateRoute isAuthenticated={isAuthenticated}>
              <Logout onLogout={logout} />
            </PrivateRoute>
          }
        />
        <Route path="/register" element={<Register addUser={addUser} />} />
        <Route path="*" element={<div>404 - Page Not Found</div>} />
      </Routes>
  );
}
