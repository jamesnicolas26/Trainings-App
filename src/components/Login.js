import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = ({ users }) => {
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const user = users.find(
      (u) =>
        u.email === formData.email &&
        u.username === formData.username &&
        u.password === formData.password
    );

    if (user) {
      setError("");
      alert("Login successful!");
      navigate("/home");
    } else {
      setError("Invalid credentials. Please try again.");
    }
  };

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
      <div
        style={{
          backgroundColor: "#ffffff",
          borderRadius: "10px",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          padding: "2rem",
          maxWidth: "400px",
          width: "100%",
          textAlign: "center",
        }}
      >
        <h1 style={{ color: "#2c3e50", marginBottom: "1rem" }}>Login</h1>
        <p style={{ color: "#7f8c8d", marginBottom: "1.5rem" }}>
          Welcome! Please log in to continue.
        </p>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "1rem" }}>
            <label style={{ display: "block", marginBottom: "0.5rem" }}>
              Email
            </label>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              style={{
                width: "100%",
                padding: "0.8rem",
                borderRadius: "5px",
                border: "1px solid #dcdfe6",
              }}
            />
          </div>
          <div style={{ marginBottom: "1rem" }}>
            <label style={{ display: "block", marginBottom: "0.5rem" }}>
              Username
            </label>
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
              style={{
                width: "100%",
                padding: "0.8rem",
                borderRadius: "5px",
                border: "1px solid #dcdfe6",
              }}
            />
          </div>
          <div style={{ marginBottom: "1.5rem" }}>
            <label style={{ display: "block", marginBottom: "0.5rem" }}>
              Password
            </label>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              style={{
                width: "100%",
                padding: "0.8rem",
                borderRadius: "5px",
                border: "1px solid #dcdfe6",
              }}
            />
          </div>
          <button
            type="submit"
            style={{
              backgroundColor: "#3498db",
              color: "#fff",
              padding: "0.8rem 1.5rem",
              borderRadius: "5px",
              border: "none",
              cursor: "pointer",
              fontSize: "1rem",
            }}
          >
            Login
          </button>
          {error && (
            <p style={{ color: "red", marginTop: "1rem", fontWeight: "bold" }}>
              {error}
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default Login;
