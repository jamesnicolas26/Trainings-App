import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Trainings from "./pages/Trainings";
import Users from "./pages/Users";
import Login from "./components/Login";
import Register from "./components/Register";
import AddTraining from "./components/AddTraining";
import EditUser from "./components/EditUser";
import Logout from "./components/Logout";
import PrivateRoute from "./Auth/PrivateRoute";
import { AuthProvider } from "./Auth/AuthContext"; // Ensure AuthProvider is wrapping the app

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

  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/home"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
        <Route
          path="/trainings"
          element={
            <PrivateRoute>
              <Trainings trainings={trainings} deleteTraining={deleteTraining} />
            </PrivateRoute>
          }
        />
        <Route
          path="/addtraining"
          element={
            <PrivateRoute>
              <AddTraining addTraining={addTraining} />
            </PrivateRoute>
          }
        />
        <Route
          path="/users"
          element={
            <PrivateRoute>
              <Users users={users} deleteUser={deleteUser} />
            </PrivateRoute>
          }
        />
        <Route
          path="/edituser/:id"
          element={
            <PrivateRoute>
              <EditUser users={users} updateUser={updateUser} />
            </PrivateRoute>
          }
        />
        <Route
          path="/logout"
          element={
            <PrivateRoute>
              <Logout />
            </PrivateRoute>
          }
        />
        <Route
          path="/register"
          element={<Register addUser={addUser} />} // Public route
        />
        <Route path="*" element={<div>404 - Page Not Found</div>} />
      </Routes>
    </AuthProvider>
  );
}
