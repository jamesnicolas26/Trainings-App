// src/components/Navbar.js
import React from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom"

const Navbar = () => {
    const location = useLocation();

    const hideNavbar = location.pathname.startsWith("/edituser/");

    if (hideNavbar) {
        return null;
    }
    
  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        background: "#333",
        color: "#fff",
        padding: "1rem",
        zIndex: 1000,
      }}
    >
      <ul
        style={{
          display: "flex",
          justifyContent: "space-around",
          listStyle: "none",
          margin: 0,
          padding: 0,
        }}
      >
        <li><Link to="/home" style={{ color: "#fff", textDecoration: "none" }}>Home</Link></li>
        <li><Link to="/trainings" style={{ color: "#fff", textDecoration: "none" }}>Trainings</Link></li>
        <li><Link to="/users" style={{ color: "#fff", textDecoration: "none" }}>Users</Link></li>
        <li><Link to="/logout" style={{ color: "#fff", textDecoration: "none" }}>Logout</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
