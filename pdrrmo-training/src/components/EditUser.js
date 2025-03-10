import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const EditUser = ({ updateUser }) => {
  const { id } = useParams(); // Get the user ID from the URL
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    lastname: "",
    firstname: "",
    middlename: "",
    office: "",
    username: "",
    email: "",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        console.log(`Fetching user with ID: ${id}`); // Debug log
        setIsLoading(true);
        const response = await fetch(`http://localhost:5000/api/users/${id}`);
        if (!response.ok) {
          if (response.status === 404) {
            throw new Error('User not found.');
          }
          throw new Error(`Error ${response.status}: Unable to fetch user.`);
        }
        const user = await response.json();
        console.log('Fetched user:', user); // Debug log
        setFormData({
          title: user.title || "",
          lastname: user.lastname || "",
          firstname: user.firstname || "",
          middlename: user.middlename || "",
          office: user.office || "",
          username: user.username || "",
          email: user.email || "",
        });
      } catch (err) {
        console.error('Error fetching user:', err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
  
    if (id) {
      fetchUser();
    } else {
      setError('Invalid user ID.');
    }
  }, [id]);
  
  

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const response = await fetch(`http://localhost:5000/api/users/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "Failed to update user.");
      }

      const updatedUser = await response.json();
      updateUser(id, updatedUser); // Update user in the parent state
      alert("User details updated successfully!");
      navigate("/users");
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
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
          maxWidth: "500px",
          width: "100%",
        }}
      >
        <h1 style={{ color: "#2c3e50", marginBottom: "1rem", textAlign: "center" }}>
          Edit User
        </h1>
        {isLoading ? (
          <p style={{ textAlign: "center", color: "#7f8c8d" }}>Loading...</p>
        ) : (
          <form onSubmit={handleSubmit}>
            {error && (
              <p style={{ color: "red", textAlign: "center", marginBottom: "1rem" }}>
                {error}
              </p>
            )}
            {["title", "lastname", "firstname", "middlename", "office", "username", "email"].map(
              (field) => (
                <div style={{ marginBottom: "1rem" }} key={field}>
                  <label
                    style={{
                      display: "block",
                      marginBottom: "0.5rem",
                      textTransform: "capitalize",
                    }}
                  >
                    {field}
                  </label>
                  <input
                    type={field === "email" ? "email" : "text"}
                    name={field}
                    value={formData[field]}
                    onChange={handleChange}
                    style={{
                      width: "100%",
                      padding: "0.8rem",
                      borderRadius: "5px",
                      border: "1px solid #dcdfe6",
                    }}
                  />
                </div>
              )
            )}
            <div style={{ display: "flex", justifyContent: "flex-end", gap: "1rem" }}>
              <button
                type="submit"
                style={{
                  backgroundColor: "#3498db",
                  color: "#fff",
                  padding: "0.8rem 1.5rem",
                  borderRadius: "5px",
                  border: "none",
                  cursor: isLoading ? "not-allowed" : "pointer",
                  fontSize: "1rem",
                }}
                disabled={isLoading}
              >
                {isLoading ? "Saving..." : "Save Changes"}
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
        )}
      </div>
    </div>
  );
};

export default EditUser;
