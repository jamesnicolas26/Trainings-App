import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Trainings from "./pages/Trainings";
import Users from "./pages/Users";
import Login from "./components/Login";
import Register from "./components/Register";
import AddTraining from "./components/AddTraining";
import EditUser from "./components/EditUser"; // Import EditUser component

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
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login users={users} />} />
        <Route path="/home" element={<Home />} />
        <Route
          path="/trainings"
          element={<Trainings trainings={trainings} deleteTraining={deleteTraining} />}
        />
        <Route path="/addtraining" element={<AddTraining addTraining={addTraining} />} />
        <Route path="/users" element={<Users users={users} deleteUser={deleteUser} />} />
        <Route
          path="/edituser/:id"
          element={<EditUser users={users} updateUser={updateUser} />} // Add EditUser route
        />
        <Route path="/register" element={<Register addUser={addUser} />} />
        <Route path="*" element={<div>404 - Page Not Found</div>} />
      </Routes>
    </BrowserRouter>
  );
}
