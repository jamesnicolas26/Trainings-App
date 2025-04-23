import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Auth/AuthContext";

const AddTraining = ({ addTraining }) => {
  const { user } = useAuth(); // Get the current user's info from AuthContext
  const [formData, setFormData] = useState({
    title: "",
    type: "",
    startDate: "",
    endDate: "",
    hours: "",
    sponsor: "",
    author: "",
    office: "",
    certificate: null,
  });

  const navigate = useNavigate();
  const [authors, setAuthors] = useState([]); // Store fetched authors
  const [trainingTitles, setTrainingTitles] = useState([]); // Training titles from the backend
  const [newTitle, setNewTitle] = useState(""); // New title input
  const fileInputRef = useRef(null);

  // Fetch training titles and authors
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch training titles without requiring authentication
        const titlesResponse = await fetch("http://localhost:5000/api/training-titles");
    
        if (!titlesResponse.ok) {
          throw new Error("Failed to fetch training titles");
        }
    
        const titlesData = await titlesResponse.json();
        setTrainingTitles(titlesData);
    
        // Fetch authors with token if needed
        const token = localStorage.getItem("token");
        if (!token) throw new Error("Authentication token not found");
    
        const authorsResponse = await fetch("http://localhost:5000/api/users", {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
    
        if (!authorsResponse.ok) {
          throw new Error("Failed to fetch authors");
        }
    
        const authorsData = await authorsResponse.json();
        setAuthors(authorsData);
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };    

    fetchData();
  }, []);

  // Add a new training title
  const handleAddTitle = async () => {
    if (!newTitle.trim()) {
      alert("Please enter a valid training title.");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Authentication token not found");

      const response = await fetch("http://localhost:5000/api/training-titles", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: newTitle }),
      });

      if (!response.ok) {
        throw new Error("Failed to add training title");
      }

      const addedTitle = await response.json();
      setTrainingTitles((prev) => [...prev, addedTitle]); // Update the list
      setNewTitle(""); // Clear the input
      alert("Training title added successfully!");
    } catch (error) {
      console.error("Error adding training title:", error.message);
      alert("Failed to add training title. Please try again.");
    }
  };

  // Automatically set author and office for "Member" role
  useEffect(() => {
    if (user?.role === "Member") {
      setFormData((prev) => ({
        ...prev,
        author: `${user.firstname} ${user.lastname}`,
        office: user.office,
      }));
    }
  }, [user]);

  const today = new Date().toISOString().split("T")[0];

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "author") {
      const selectedAuthor = authors.find(
        (author) => `${author.firstname} ${author.lastname}` === value
      );
      setFormData((prev) => ({
        ...prev,
        author: value,
        office: selectedAuthor ? selectedAuthor.office : "",
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setFormData((prev) => ({
          ...prev,
          certificate: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addTraining(formData);
    setFormData({
      title: "",
      type: "",
      startDate: "",
      endDate: "",
      hours: "",
      sponsor: "",
      author: "",
      office: "",
      certificate: null,
    });
    if (fileInputRef.current) fileInputRef.current.value = "";
    alert("Training added successfully!");
    navigate("/trainings");
  };

  return (
    <div>
      <div style={{ maxWidth: "600px", margin: "20px auto", padding: "20px", border: "1px solid #ccc", borderRadius: "10px", boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)" }}>
        <h1 style={{ textAlign: "center", marginBottom: "20px" }}>Add Training</h1>
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
          {/* Title */}
          <div>
            <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>Title:</label>
            <select required name="title" value={formData.title} onChange={handleChange} style={{ width: "100%", padding: "10px", border: "1px solid #ccc", borderRadius: "5px" }}>
              <option value="" disabled>Select Training Title</option>
              {trainingTitles.map((title) => (
                <option key={title._id} value={title.name}>
                  {title.name}
                </option>
              ))}
            </select>
          </div>

          {/* Type */}
        <div>
          <label
            style={{
              display: "block",
              marginBottom: "5px",
              fontWeight: "bold",
            }}
          >
            Type:
            </label>
            <select
              required
              name="type"
              value={formData.type}
              onChange={handleChange}
              style={{
                width: "100%",
                padding: "10px",
                border: "1px solid #ccc",
                borderRadius: "5px",
              }}
            >
              <option value="" disabled>
                Select type
              </option>
              <option value="Managerial">Managerial</option>
              <option value="Supervisory">Supervisory</option>
              <option value="Technical">Technical</option>
            </select>
          </div>

          {/* Start Date */}
          <div>
            <label
              style={{
                display: "block",
                marginBottom: "5px",
                fontWeight: "bold",
              }}
            >
              Start Date:
            </label>
            <input
              type="date"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              max={today}
              required
              style={{
                width: "100%",
                padding: "10px",
                border: "1px solid #ccc",
                borderRadius: "5px",
              }}
            />
          </div>

          {/* End Date */}
          <div>
            <label
              style={{
                display: "block",
                marginBottom: "5px",
                fontWeight: "bold",
              }}
            >
              End Date:
            </label>
            <input
              type="date"
              name="endDate"
              value={formData.endDate}
              onChange={handleChange}
              max={today}
              required
              style={{
                width: "100%",
                padding: "10px",
                border: "1px solid #ccc",
                borderRadius: "5px",
              }}
            />
          </div>

          {/* Hours */}
          <div>
            <label
              style={{
                display: "block",
                marginBottom: "5px",
                fontWeight: "bold",
              }}
            >
              Hours:
            </label>
            <input
              type="number"
              name="hours"
              value={formData.hours}
              onChange={handleChange}
              required
              style={{
                width: "100%",
                padding: "10px",
                border: "1px solid #ccc",
                borderRadius: "5px",
              }}
            />
          </div>

          {/* Sponsor */}
          <div>
            <label
              style={{
                display: "block",
                marginBottom: "5px",
                fontWeight: "bold",
              }}
            >
              Sponsor:
            </label>
            <input
              type="text"
              name="sponsor"
              value={formData.sponsor}
              onChange={handleChange}
              required
              style={{
                width: "100%",
                padding: "10px",
                border: "1px solid #ccc",
                borderRadius: "5px",
              }}
            />
          </div>

          {/* Author */}
          <div>
            <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>Author:</label>
            {user?.role === "Member" ? (
              <input type="text" name="author" value={formData.author} readOnly style={{ width: "100%", padding: "10px", border: "1px solid #ccc", borderRadius: "5px", backgroundColor: "#f9f9f9" }} />
            ) : (
              <select required name="author" value={formData.author} onChange={handleChange} style={{ width: "100%", padding: "10px", border: "1px solid #ccc", borderRadius: "5px" }}>
                <option value="" disabled>Select Author</option>
                {authors.map((author) => (
                  <option key={author._id} value={`${author.firstname} ${author.lastname}`}>
                    {author.firstname} {author.lastname}
                  </option>
                ))}
              </select>
            )}
          </div>

          {/* Office */}
          <div>
            <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>Office:</label>
            <input type="text" name="office" value={formData.office} readOnly style={{ width: "100%", padding: "10px", border: "1px solid #ccc", borderRadius: "5px", backgroundColor: "#f9f9f9" }} />
          </div>

          {/* Certificate */}
          <div>
            <label
              style={{
                display: "block",
                marginBottom: "5px",
                fontWeight: "bold",
              }}
            >
              Certificate:
            </label>
            <input
              type="file"
              accept=".jpg,.jpeg,.png,.pdf"
              onChange={handleFileChange}
              ref={fileInputRef}
              style={{
                display: "block",
              }}
            />
          </div>

          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <button type="submit" style={{ backgroundColor: "#007BFF", color: "#fff", padding: "10px 20px", borderRadius: "5px", border: "none", cursor: "pointer" }}>
              Add Training
            </button>
            <button type="button" onClick={() => navigate("/trainings")} style={{ backgroundColor: "#e74c3c", color: "#fff", padding: "10px 20px", borderRadius: "5px", border: "none", cursor: "pointer" }}>
              Cancel
            </button>
          </div>
        </form>
      </div>

      {/* CMS Section for Adding Titles */}
      {user?.role === "superadmin" && (
        <div style={{ maxWidth: "600px", margin: "20px auto", padding: "20px", border: "1px solid #ccc", borderRadius: "10px", boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)", marginTop: "30px" }}>
          <h2>Add New Training Title</h2>
          <input
            type="text"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            placeholder="Enter new training title"
            style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
          />
          <button onClick={handleAddTitle} style={{ padding: "10px 20px", backgroundColor: "#007BFF", color: "#fff", border: "none", borderRadius: "5px", cursor: "pointer" }}>
            Add Title
          </button>
        </div>
      )}
    </div>
  );
};

export default AddTraining;
