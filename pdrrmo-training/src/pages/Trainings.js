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
    width: "100px",
    height: "100px",
    objectFit: "fill",
    borderRadius: "5px",
    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
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
    <div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "20px",
          marginTop: "40px",
        }}
      >
        <h1 style={{ alignContent: "center" }}>Trainings</h1>
        <div>
          <button
            onClick={exportToExcel}
            style={{
              padding: "10px 15px",
              marginRight: "10px",
              backgroundColor: "#008CBA",
              color: "#fff",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Export to Excel
          </button>
          <Link to="/addtraining">
            <button
              style={{
                padding: "10px 15px",
                backgroundColor: "#4CAF50",
                color: "#fff",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              Add Training
            </button>
          </Link>
        </div>
      </div>
      <div style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Search by title..."
          value={searchQuery}
          onChange={handleSearchChange}
          style={{ padding: "10px", marginRight: "10px" }}
        />
        <select value={filterType} onChange={handleFilterChange} style={{ padding: "10px" }}>
          <option value="">All Types</option>
          <option value="Supervisory">Supervisory</option>
          <option value="Managerial">Managerial</option>
          <option value="Technical">Technical</option>
        </select>
      </div>
      {filteredTrainings.length > 0 ? (
        <table border="1" style={{ width: "100%", textAlign: "left" }}>
          <thead>
            <tr>
              <th onClick={() => handleSort("title")}>
                Title {getSortIcon("title")}
              </th>
              <th onClick={() => handleSort("type")}>
                Type {getSortIcon("type")}
              </th>
              <th onClick={() => handleSort("startDate")}>
                Start Date {getSortIcon("startDate")}
              </th>
              <th onClick={() => handleSort("endDate")}>
                End Date {getSortIcon("endDate")}
              </th>
              <th onClick={() => handleSort("hours")}>
                Hours {getSortIcon("hours")}
              </th>
              <th onClick={() => handleSort("sponsor")}>
                Sponsor {getSortIcon("sponsor")}
              </th>
              <th onClick={() => handleSort("author")}>
                Author {getSortIcon("author")}
              </th>
              <th>
                Certificate
              </th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredTrainings.map((training, index) => (
              <tr key={index}>
                <td>{training.title}</td>
                <td>{training.type}</td>
                <td>{training.startDate}</td>
                <td>{training.endDate}</td>
                <td>{training.hours}</td>
                <td>{training.sponsor}</td>
                <td>
                  {training.author}
                  {training.office ? ` (${training.office})` : ""}
                </td>
                <td>
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
                <td>
                  <button
                    onClick={() =>
                      window.confirm("Are you sure you want to delete this training?") &&
                      deleteTraining(index)
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
