import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Auth/AuthContext"; // Assuming the AuthContext is located here

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
  const fileInputRef = useRef(null);

  // Fetch authors from the backend
  useEffect(() => {
    const fetchAuthors = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("Authentication token not found");

        const response = await fetch("http://localhost:5000/api/users", {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch authors");
        }

        const data = await response.json();
        setAuthors(data);
      } catch (error) {
        console.error("Error fetching authors:", error.message);
      }
    };

    fetchAuthors();
  }, []);

  // Automatically set author and office for "Member" role
  useEffect(() => {
    console.log("User data:", user);
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
    <div style={{ maxWidth: "600px", margin: "20px auto", padding: "20px", border: "1px solid #ccc", borderRadius: "10px", boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)" }}>
      <h1 style={{ textAlign: "center", marginBottom: "20px" }}>Add Training</h1>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
        {/* Title */}
        <div>
          <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>Title:</label>
          <select required name="title" value={formData.title} onChange={handleChange} style={{ width: "100%", padding: "10px", border: "1px solid #ccc", borderRadius: "5px" }}>
            <option value="" disabled>Select Training Title</option>
            <option disabled>BASIC COURSES:</option>
            <option value="DRRM Course">DRRM Course</option>
            <option value="Community-Based DRRM Training">
              Community-Based DRRM Training
            </option>
            <option value="Community First Responder Training / Community Action for Disaster Response">
              Community First Responder Training / Community Action for Disaster
              Response
            </option>
            <option disabled></option>
            <option disabled>ADVANCED COURSES:</option>
            <option value="LDRRMP Training">LDRRMP Training</option>
            <option value="Contingency Planning Training">
              Contingency Planning Training
            </option>
            <option value="Public Service Continuity Planning Training">
              Public Service Continuity Planning Training
            </option>
            <option value="Risk Communication Training">
              Risk Communication Training
            </option>
            <option value="Basic Incident Command System Training">
              Basic Incident Command System Training
            </option>
            <option value="Integrated Planning Course on ICS">
              Integrated Planning Course on ICS
            </option>
            <option value="Incident Command System Position Course">
              Incident Command System Position Course
            </option>
            <option value="All Hazard Incident Management Training">
              All Hazard Incident Management Training
            </option>
            <option value="Training for Instructors">Training for Instructors</option>
            <option value="Rapid Damage Assessment and Needs Analysis Training Course">
              Rapid Damage Assessment and Needs Analysis Training Course
            </option>
            <option value="Post-Disaster Needs Assessment Training">
              Post-Disaster Needs Assessment Training
            </option>
            <option value="Exercise Design Course">Exercise Design Course</option>
            <option value="Emergency Operation Center Course">
              Emergency Operation Center Course
            </option>
            <option disabled></option>
            <option disabled>EXECUTIVE COURSES:</option>
            <option value="Incident Command System Executive Training">
              Incident Command System Executive Training
            </option>
            <option value="Emergency Operation Center Executive Course">
              Emergency Operation Center Executive Course
            </option>
            <option disabled></option>
            <option disabled>TRAININGS OFFERED BY OTHER AGENCIES:</option>
            <option value="Camp Coordination and Camp Management">
              Camp Coordination and Camp Management
            </option>
            <option value="Search and Rescue Training">Search and Rescue Training</option>
            <option value="Fire Suppression Training">Fire Suppression Training</option>
            <option value="Basic Life Support Training">Basic Life Support Training</option>
            <option value="Family and Community-Based Disaster Preparedness Orientation">
              Family and Community-Based Disaster Preparedness Orientation
            </option>
            <option value="Training on Psychosocial Intervention">
              Training on Psychosocial Intervention
            </option>
            <option value="Participation/representation of vulnerable sector in the DRRM Training">
              Participation/representation of vulnerable sector in the DRRM
              Training
            </option>
            <option value="SRR training for the top 2 hazards of the LGU">
              SRR training for the top 2 hazards of the LGU
            </option>
            <option value="Mainstreaming DRR into the Local Development Planning and Emergency Preparedness through the Use of the REDAS Software">
              Mainstreaming DRR into the Local Development Planning and Emergency
              Preparedness through the Use of the REDAS Software
            </option>
            <option value="Training on the use of GeoRiskPH platforms (HazardHunterPH, GeoAnalyticsPH, PlanSmart, etc.)">
              Training on the use of GeoRiskPH platforms (HazardHunterPH,
              GeoAnalyticsPH, PlanSmart, etc.)
            </option>
            <option value="Training on Health Emergency">
              Training on Health Emergency
            </option>
            <option value="Management of Dead and Missing">
              Management of Dead and Missing
            </option>
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

        {/* Submit and Cancel Buttons */}
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <button type="submit" style={{ backgroundColor: "#007BFF", color: "#fff", padding: "10px 20px", border: "none", borderRadius: "5px", fontWeight: "bold", cursor: "pointer" }}>
            Add Training
          </button>
          <button type="button" onClick={() => navigate("/trainings")} style={{ backgroundColor: "#e74c3c", color: "#fff", padding: "10px 20px", borderRadius: "5px", border: "none", cursor: "pointer" }}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddTraining;
