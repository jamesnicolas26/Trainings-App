import React, { useState } from "react";
import { Link } from "react-router-dom";
import * as XLSX from "xlsx";
import { ChevronUp, ChevronDown, Filter } from "lucide-react";

const Trainings = ({ trainings, deleteTraining }) => {
  const [filterType, setFilterType] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [selectedCertificate, setSelectedCertificate] = useState(null);

  const imgStyle = {
    width: "120px",
    height: "120px",
    objectFit: "fill",
    borderRadius: "5px",
    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
    cursor: "pointer",
  };

  const containerStyle = {
    maxWidth: "1400px",
    margin: "0 auto",
    padding: "20px",
    fontFamily: "Arial, sans-serif",
  };

  const headerStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: "20px",
    marginTop: "40px",
  };

  const buttonStyle = {
    padding: "10px 15px",
    marginRight: "10px",
    backgroundColor: "#4CAF50",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "background-color 0.3s",
  };

  const tableStyle = {
    width: "100%",
    borderCollapse: "collapse",
    textAlign: "left",
    marginBottom: "20px",
    fontSize: "16px",
  };

  const thTdStyle = {
    border: "1px solid #ddd",
    padding: "15px",
    fontSize: "15px",
    textAlign: "center",
  };

  const rowHoverStyle = {
    transition: "background-color 0.3s",
    cursor: "pointer",
  };

  const handleImageError = (e) => {
    e.target.src = "path/to/default-image.jpg"; // Replace with a default image path
  };

  const exportToExcel = () => {
    const data = filteredTrainings.map((training) => ({
      Title: training.title,
      Type: training.type,
      "Start Date": training.startDate,
      "End Date": training.endDate,
      Hours: training.hours,
      Sponsor: training.sponsor,
      Author: `${training.author}${training.office ? ` (${training.office})` : ""}`,
      Certificate: training.certificate ? "Yes" : "No",
    }));

    const worksheet = XLSX.utils.json_to_sheet(data);

    const columnWidths = Object.keys(data[0] || {}).map((key) => {
      const maxLength = Math.max(
        key.length,
        ...data.map((row) => (row[key] ? row[key].toString().length : 0))
      );
      return { wch: maxLength + 2 };
    });

    worksheet["!cols"] = columnWidths;

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Trainings");

    const timestamp = new Date().toISOString().replace(/[-:T]/g, "_").split(".")[0];
    XLSX.writeFile(workbook, `trainings_${timestamp}.xlsx`);
  };

  const handleFilterChange = (e) => {
    setFilterType(e.target.value);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const sortedTrainings = [...trainings].sort((a, b) => {
    if (!sortConfig.key) return 0;
    const valueA = a[sortConfig.key];
    const valueB = b[sortConfig.key];
    if (valueA < valueB) return sortConfig.direction === "asc" ? -1 : 1;
    if (valueA > valueB) return sortConfig.direction === "asc" ? 1 : -1;
    return 0;
  });

  const filteredTrainings = sortedTrainings.filter((training) => {
    const matchesFilter =
      filterType === "" || training.type.toLowerCase() === filterType.toLowerCase();
    const matchesSearch =
      searchQuery === "" ||
      training.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const getSortIcon = (key) => {
    if (sortConfig.key !== key) return null;
    return sortConfig.direction === "asc" ? <ChevronUp size={16} /> : <ChevronDown size={16} />;
  };

  return (
    <div style={containerStyle}>
      <div style={headerStyle}>
        <h1>Trainings</h1>
        <div>
          <button onClick={exportToExcel} style={buttonStyle}>
            Export to Excel
          </button>
          <Link to="/addtraining">
            <button style={{ ...buttonStyle, backgroundColor: "#008CBA" }}>
              Add Training
            </button>
          </Link>
        </div>
      </div>
      <div style={{ marginBottom: "20px", display: "flex", gap: "10px" }}>
        <input
          type="text"
          placeholder="Search by title..."
          value={searchQuery}
          onChange={handleSearchChange}
          style={{
            padding: "10px",
            flexGrow: 1,
            borderRadius: "5px",
            border: "1px solid #ddd",
          }}
        />
        <select
          value={filterType}
          onChange={handleFilterChange}
          style={{
            padding: "10px",
            borderRadius: "5px",
            border: "1px solid #ddd",
          }}
        >
          <option value="">All Types</option>
          <option value="Supervisory">Supervisory</option>
          <option value="Managerial">Managerial</option>
          <option value="Technical">Technical</option>
        </select>
      </div>
      {filteredTrainings.length > 0 ? (
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={thTdStyle} onClick={() => handleSort("title")}>
                Title {getSortIcon("title")}
              </th>
              <th style={thTdStyle} onClick={() => handleSort("type")}
                >Type {getSortIcon("type")}
              </th>
              <th style={thTdStyle} onClick={() => handleSort("startDate")}>
                Start Date {getSortIcon("startDate")}
              </th>
              <th style={thTdStyle} onClick={() => handleSort("endDate")}>
                End Date {getSortIcon("endDate")}
              </th>
              <th style={thTdStyle} onClick={() => handleSort("hours")}>
                Hours {getSortIcon("hours")}
              </th>
              <th style={thTdStyle} onClick={() => handleSort("sponsor")}>
                Sponsor {getSortIcon("sponsor")}
              </th>
              <th style={thTdStyle} onClick={() => handleSort("author")}>
                Author {getSortIcon("author")}
              </th>
              <th style={thTdStyle}>Certificate</th>
              <th style={thTdStyle}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredTrainings.map((training, index) => (
              <tr
                key={index}
                style={rowHoverStyle}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.backgroundColor = "#f9f9f9")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor = "transparent")
                }
              >
                <td style={thTdStyle}>{training.title}</td>
                <td style={thTdStyle}>{training.type}</td>
                <td style={thTdStyle}>{training.startDate}</td>
                <td style={thTdStyle}>{training.endDate}</td>
                <td style={thTdStyle}>{training.hours}</td>
                <td style={thTdStyle}>{training.sponsor}</td>
                <td style={thTdStyle}>
                  {training.author}
                  {training.office ? ` (${training.office})` : ""}
                </td>
                <td style={thTdStyle}>
                  {training.certificate ? (
                    <img
                      src={training.certificate}
                      alt="Certificate"
                      style={imgStyle}
                      onError={handleImageError}
                      onClick={() => setSelectedCertificate(training.certificate)}
                    />
                  ) : (
                    "No image"
                  )}
                </td>
                <td style={thTdStyle}>
                  <button
                    onClick={() =>
                      window.confirm(
                        "Are you sure you want to delete this training?"
                      ) && deleteTraining(index)
                    }
                    style={{
                      padding: "5px 10px",
                      backgroundColor: "#FF4D4D",
                      color: "#fff",
                      border: "none",
                      borderRadius: "5px",
                      cursor: "pointer",
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No trainings available.</p>
      )}
      {selectedCertificate && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.8)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
          }}
          onClick={() => setSelectedCertificate(null)}
        >
          <img
            src={selectedCertificate}
            alt="Certificate"
            style={{
              maxWidth: "90%",
              maxHeight: "90%",
              borderRadius: "10px",
              boxShadow: "0 4px 10px rgba(0, 0, 0, 0.5)",
            }}
          />
        </div>
      )}
    </div>
  );
};

export default Trainings;
