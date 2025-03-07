import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const EditUser = ({ users, updateUser }) => {
  const { id } = useParams(); // Get the user index from the URL
  const navigate = useNavigate();

  // Retrieve the current user details using the index
  const currentUser = users[parseInt(id)];

  const [formData, setFormData] = useState({
    title: currentUser.title || "",
    lastname: currentUser.lastname || "",
    firstname: currentUser.firstname || "",
    middlename: currentUser.middlename || "",
    office: currentUser.office || "",
    username: currentUser.username || "",
    email: currentUser.email || "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Update the user in the parent state
    updateUser(parseInt(id), formData);

    alert("User details updated successfully!");
    navigate("/users"); // Navigate back to the Users page
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
          maxWidth: "500px",
          width: "100%",
        }}
      >
        <h1 style={{ color: "#2c3e50", marginBottom: "1rem", textAlign: "center" }}>
          Edit User
        </h1>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "1rem" }}>
            <label style={{ display: "block", marginBottom: "0.5rem" }}>Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
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
            <label style={{ display: "block", marginBottom: "0.5rem" }}>Last Name</label>
            <input
              type="text"
              name="lastname"
              value={formData.lastname}
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
            <label style={{ display: "block", marginBottom: "0.5rem" }}>First Name</label>
            <input
              type="text"
              name="firstname"
              value={formData.firstname}
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
            <label style={{ display: "block", marginBottom: "0.5rem" }}>Middle Name</label>
            <input
              type="text"
              name="middlename"
              value={formData.middlename}
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
            <label style={{ display: "block", marginBottom: "0.5rem" }}>Office</label>
            <input
              type="text"
              name="office"
              value={formData.office}
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
            <label style={{ display: "block", marginBottom: "0.5rem" }}>Username</label>
            <input
              type="text"
              name="username"
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
            <label style={{ display: "block", marginBottom: "0.5rem" }}>Email</label>
            <input
              type="email"
              name="email"
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

          <div style={{ display: "flex", justifyContent: "flex-end", gap: "1rem" }}>
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
              Save Changes
            </button>
            <button
              type="button"
              onClick={() => navigate("/users")}
              style={{
                backgroundColor: "#e74c3c",
                color: "#fff",
                padding: "0.8rem 1.5rem",
                borderRadius: "5px",
                border: "none",
                cursor: "pointer",
                fontSize: "1rem",
              }}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditUser;
