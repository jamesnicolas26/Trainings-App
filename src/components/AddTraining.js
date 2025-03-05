import React, { useState, useRef } from "react";

const AddTraining = ({ addTraining }) => {
  const [formData, setFormData] = useState({
    title: "",
    type: "",
    startDate: "",
    endDate: "",
    hours: "",
    sponsor: "",
    author: "",
    certificate: null,
  });

  const fileInputRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setFormData((prev) => ({
        ...prev,
        certificate: imageUrl,
      }));
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
      certificate: null,
    });
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div style={{ maxWidth: "600px", margin: "20px auto", padding: "20px", border: "1px solid #ccc", borderRadius: "10px", boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)" }}>
      <h1 style={{ textAlign: "center", marginBottom: "20px" }}>Add Training</h1>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
        <div>
          <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>Title:</label>
          <select required
            name="title"
            value={formData.title}
            onChange={handleChange}
            style={{ width: "100%", padding: "10px", border: "1px solid #ccc", borderRadius: "5px" }}
          >
          <option disabled>BASIC COURSES:</option>
          <option value="DRRM Course">DRRM Course</option>
          <option value="Community-Based DRRM Training">Community-Based DRRM Training</option>
          <option value="Community First Responder Training / Community Action for Disaster Response">
            Community First Responder Training / Community Action for Disaster Response
          </option>
          <option disabled></option>
          <option disabled>ADVANCED COURSES:</option>
          <option value="LDRRMP Training">LDRRMP Training</option>
          <option value="Contingency Planning Training">Contingency Planning Training</option>
          <option value="Public Service Continuity Planning Training">Public Service Continuity Planning Training</option>
          <option value="Risk Communication Training">Risk Communication Training</option>
          <option value="Basic Incident Command System Training">Basic Incident Command System Training</option>
          <option value="Integrated Planning Course on ICS">Integrated Planning Course on ICS</option>
          <option value="Incident Command System Position Course">Incident Command System Position Course</option>
          <option value="All Hazard Incident Management Training">All Hazard Incident Management Training</option>
          <option value="Training for Instructors">Training for Instructors</option>
          <option value="Rapid Damage Assessment and Needs Analysis Training Course">
            Rapid Damage Assessment and Needs Analysis Training Course
          </option>
          <option value="Post-Disaster Needs Assessment Training">Post-Disaster Needs Assessment Training</option>
          <option value="Exercise Design Course">Exercise Design Course</option>
          <option value="Emergency Operation Center Course">Emergency Operation Center Course</option>
          <option disabled></option>
          <option disabled>EXECUTIVE COURSES:</option>
          <option value="Incident Command System Executive Training">Incident Command System Executive Training</option>
          <option value="Emergency Operation Center Executive Course">Emergency Operation Center Executive Course</option>
          <option disabled></option>
          <option disabled>TRAININGS OFFERED BY OTHER AGENCIES:</option>
          <option value="Camp Coordination and Camp Management">Camp Coordination and Camp Management</option>
          <option value="Search and Rescue Training">Search and Rescue Training</option>
          <option value="Fire Suppression Training">Fire Suppression Training</option>
          <option value="Basic Life Support Training">Basic Life Support Training</option>
          <option value="Family and Community-Based Disaster Preparedness Orientation">
            Family and Community-Based Disaster Preparedness Orientation
          </option>
          <option value="Training on Psychosocial Intervention">Training on Psychosocial Intervention</option>
          <option value="Participation/representation of vulnerable sector in the DRRM Training">
            Participation/representation of vulnerable sector in the DRRM Training
          </option>
          <option value="SRR training for the top 2 hazards of the LGU">
            SRR training for the top 2 hazards of the LGU
          </option>
          <option value="Mainstreaming DRR into the Local Development Planning and Emergency Preparedness through the Use of the REDAS Software">
            Mainstreaming DRR into the Local Development Planning and Emergency Preparedness through the Use of the REDAS Software
          </option>
          <option value="Training on the use of GeoRiskPH platforms (HazardHunterPH, GeoAnalyticsPH, PlanSmart, etc.)">
            Training on the use of GeoRiskPH platforms (HazardHunterPH, GeoAnalyticsPH, PlanSmart, etc.)
          </option>
          <option value="Training on Health Emergency">Training on Health Emergency</option>
          <option value="Management of Dead and Missing">Management of Dead and Missing</option>
          </select>
        </div>
        <div>
          <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>Type:</label>
          <select required
            name="type"
            value={formData.type}
            onChange={handleChange}
            style={{ width: "100%", padding: "10px", border: "1px solid #ccc", borderRadius: "5px" }}
          >
            <option value="" disabled>Select type</option>
            <option value="Managerial">Managerial</option>
            <option value="Supervisory">Supervisory</option>
            <option value="Technical">Technical</option>
          </select>
        </div>
        <div>
          <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>Start Date:</label>
          <input required
            type="date"
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
            style={{ width: "100%", padding: "10px", border: "1px solid #ccc", borderRadius: "5px" }}
          />
        </div>
        <div>
          <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>End Date:</label>
          <input required
            type="date"
            name="endDate"
            value={formData.endDate}
            onChange={handleChange}
            style={{ width: "100%", padding: "10px", border: "1px solid #ccc", borderRadius: "5px" }}
          />
        </div>
        <div>
          <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>Hours:</label>
          <input required
            type="text"
            name="hours"
            value={formData.hours}
            onChange={handleChange}
            style={{ width: "100%", padding: "10px", border: "1px solid #ccc", borderRadius: "5px" }}
          />
        </div>
        <div>
          <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>Sponsor:</label>
          <input required
            type="text"
            name="sponsor"
            value={formData.sponsor}
            onChange={handleChange}
            style={{ width: "100%", padding: "10px", border: "1px solid #ccc", borderRadius: "5px" }}
          />
        </div>
        <div>
          <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>Author:</label>
          <input required
            type="text"
            name="author"
            value={formData.author}
            onChange={handleChange}
            style={{ width: "100%", padding: "10px", border: "1px solid #ccc", borderRadius: "5px" }}
          />
        </div>
        <div>
          <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>Certificate:</label>
          <input required
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleFileChange}
            style={{ padding: "5px", border: "1px solid #ccc", borderRadius: "5px" }}
          />
          {formData.certificate && (
            <div style={{ marginTop: "10px" }}>
              <img required
                src={formData.certificate}
                alt="Certificate"
                style={{ width: "100px", borderRadius: "5px", boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)" }}
              />
            </div>
          )}
        </div>
        <button type="submit" style={{ padding: "10px 15px", backgroundColor: "#4CAF50", color: "#fff", border: "none", borderRadius: "5px", cursor: "pointer" }}>
          Add Training
        </button>
      </form>
    </div>
  );
};

export default AddTraining;
