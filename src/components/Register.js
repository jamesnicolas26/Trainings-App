import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Register = ({ addUser }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    lastname: "",
    firstname: "",
    middlename: "",
    office: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [offices, setOffices] = useState([]);

  useEffect(() => {
    const fetchOffices = async () => {
      const officeList = [
        "Office of the Governor",
        "Office of the Governor - Personal Staff",
        "Office of the Vice Governor",
        "Office of the Vice Governor - Personal Staff",
        "Office of the Secretary to the Sangguniang Panlalawigan",
        "Bulacan Environment and Natural Resources Office",
        "Bulacan Polytechnic College",
        "Provincial Accounting Office",
        "Provincial Administrator's Office",
        "Provincial Agriculture Office",
        "Provincial Budget Office",
        "Provincial Civil Security and Jail Management Office",
        "Provincial Cooperative and Enterprise Development Office",
        "Provincial Engineer's Office",
        "Provincial General Services Office",
        "Provincial History, Arts, Culture and Tourism Office",
        "Provincial Human Resource Management Office",
        "Provincial Information Technology Office",
        "Provincial Legal Office",
        "Provincial Planning and Development Office",
        "Provincial Public Affairs Office",
        "Provincial Public Employment Service Office",
        "Provincial Public Health Office",
        "Provincial Social Welfare and Development Office",
        "Provincial Treasurer's Office",
        "Provincial Veterinary Office",
        "Provincial Youth, Sports and Development Office",
        "Department of Interior and Local Government",
        "Philippine National Police - Bulacan",
        "Office of the Provincial Fire Marshal",
        "Philippine Red Cross Bulacan Chapter",
        "Department of Public Works and Highways - District 1",
        "Department of Public Works and Highways - District 2",
        "Department of Trade and Industry",
        "National Food Authority",
        "Department of Education",
        "Bulacan State University",
        "Save the Children Philippines Luzon Program",
      ];
      setOffices(officeList);
    };

    fetchOffices();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    addUser(formData);
    alert("User registered successfully!");
    setFormData({
      title: "",
      lastname: "",
      firstname: "",
      middlename: "",
      office: "",
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
    navigate("/users");
  };

  const containerStyle = {
    maxWidth: "800px",
    margin: "0 auto",
    padding: "20px",
    backgroundColor: "#f9f9f9",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  };

  const labelStyle = {
    display: "block",
    fontWeight: "bold",
    marginBottom: "5px",
  };

  const inputStyle = {
    width: "100%",
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "4px",
    marginBottom: "10px",
  };

  const buttonStyle = {
    padding: "10px 20px",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  };

  const gridStyle = {
    display: "grid",
    gap: "20px",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    marginBottom: "20px",
  };

  return (
    <div style={containerStyle}>
      <h1 style={{ textAlign: "center", marginBottom: "20px" }}>Register User</h1>
      <form onSubmit={handleSubmit}>
        <div style={gridStyle}>
          {/* Title */}
          <div>
            <label style={labelStyle}>Title</label>
            <select required
              name="title"
              value={formData.title}
              onChange={handleChange}
              style={inputStyle}
            >
              <option value="">Select Title</option>
              <option value="Mr.">Mr.</option>
              <option value="Ms.">Ms.</option>
              <option value="Mrs.">Mrs.</option>
              <option value="Dr.">Dr.</option>
              <option value="Dra.">Dra.</option>
              <option value="Prof.">Prof.</option>
              <option value="Engr.">Engr.</option>
              <option value="FSupt.">FSupt.</option>
              <option value="Atty.">Atty.</option>
            </select>
          </div>

          {/* Last Name */}
          <div>
            <label style={labelStyle}>Last Name</label>
            <input required
              type="text"
              name="lastname"
              value={formData.lastname}
              onChange={handleChange}
              style={inputStyle}
              placeholder="Enter your last name"
            />
          </div>

          {/* First Name */}
          <div>
            <label style={labelStyle}>First Name</label>
            <input required
              type="text"
              name="firstname"
              value={formData.firstname}
              onChange={handleChange}
              style={inputStyle}
              placeholder="Enter your first name"
            />
          </div>

          {/* Middle Name */}
          <div>
            <label style={labelStyle}>Middle Name</label>
            <input
              type="text"
              name="middlename"
              value={formData.middlename}
              onChange={handleChange}
              style={inputStyle}
              placeholder="Enter your middle name"
            />
          </div>

          {/* Office */}
          <div style={{ gridColumn: "span 2" }}>
            <label style={labelStyle}>Office</label>
            <select required
              name="office"
              value={formData.office}
              onChange={handleChange}
              style={inputStyle}
            >
              <option value="">Select Office</option>
              {offices.map((office, index) => (
                <option key={index} value={office}>
                  {office}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Username, Email, Password */}
        <div style={gridStyle}>
          <div>
            <label style={labelStyle}>Username</label>
            <input required
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              style={inputStyle}
              placeholder="Enter your username"
            />
          </div>

          <div>
            <label style={labelStyle}>Email</label>
            <input required
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              style={inputStyle}
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label style={labelStyle}>Password</label>
            <input required
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              style={inputStyle}
              placeholder="Enter your password"
            />
          </div>

          <div>
            <label style={labelStyle}>Confirm Password</label>
            <input required
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              style={inputStyle}
              placeholder="Re-enter your password"
            />
          </div>
        </div>

        <div style={{ textAlign: "right" }}>
          <button type="submit" style={buttonStyle}>
            Register
          </button>
        </div>
      </form>
    </div>
  );
};

export default Register;
