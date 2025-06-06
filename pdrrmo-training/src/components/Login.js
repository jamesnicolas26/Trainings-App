import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Auth/AuthContext";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:5000";

const Login = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
  
    if (!formData.username || !formData.password) {
      setError("Username and password are required.");
      setIsLoading(false);
      return;
    }
  
    try {
<<<<<<< HEAD
      const response = await fetch(`${API_BASE_URL}/login`, {
=======
      const response = await fetch("https://pdrrmo.bulacan.gov.ph/pdrrmo-training/login", {
>>>>>>> 21c6ebde26bb8c8c4914e84f2bfbefe7088de331
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
  
      const data = await response.json();
      console.log("Response:", response);
      console.log("Data:", data);
  
      if (response.ok) {
        if (data.role === "Admin" || data.isApproved) {
          login(data); // Update AuthContext
          navigate("/home");
        } else {
          setError("Your account is not approved by an admin yet.");
        }
      } else {
        setError(data.message || "Invalid credentials. Please try again.");
      }
    } catch (err) {
      setError("An error occurred. Please try again later.");
      console.error("Login error:", err);
    } finally {
      setIsLoading(false);
    }
  };  

  const inputStyle = {
    width: "100%",
    padding: "0.8rem",
    borderRadius: "5px",
    border: "1px solid #dcdfe6",
    fontSize: "1rem",
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
        <form onSubmit={handleSubmit} autoComplete="off">
          <div style={{ marginBottom: "1rem" }}>
            <label
              htmlFor="username"
              style={{ display: "block", marginBottom: "0.5rem" }}
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
              style={inputStyle}
              aria-label="Username"
              autoComplete="off"
            />
          </div>
          <div style={{ marginBottom: "1.5rem" }}>
            <label
              htmlFor="password"
              style={{ display: "block", marginBottom: "0.5rem" }}
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              style={inputStyle}
              aria-label="Password"
              autoComplete="off"
            />
          </div>
          <button
            type="submit"
            style={{
              backgroundColor: isLoading ? "#95a5a6" : "#3498db",
              color: "#fff",
              padding: "0.8rem 1.5rem",
              borderRadius: "5px",
              border: "none",
              cursor: isLoading ? "not-allowed" : "pointer",
              fontSize: "1rem",
            }}
            disabled={isLoading}
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>
          {error && (
            <p
              style={{
                color: "red",
                marginTop: "1rem",
                fontWeight: "bold",
                textAlign: "center",
              }}
            >
              {error}
            </p>
          )}
          <br />
          <br />
          <p style={{ color: "#7f8c8d" }}>
            Don't have an account yet?{" "}
            <a
              href="/register"
              style={{ color: "#3498db", textDecoration: "none" }}
            >
              Register
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
