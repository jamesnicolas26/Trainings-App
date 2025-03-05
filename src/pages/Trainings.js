import React from "react";
import { Link } from "react-router-dom";
import * as XLSX from "xlsx"; // Import the XLSX library for handling Excel files

const Trainings = ({ trainings, deleteTraining }) => {
  const imgContainerStyle = {
    maxWidth: "200px",
    maxHeight: "200px",
    overflow: "hidden",
    borderRadius: "5px",
  };

  const imgStyle = {
    width: "100%",
    height: "auto",
    objectFit: "contain", // Ensures the image fits properly without distortion.
  };

  // Function to export trainings data to an Excel file
  const exportToExcel = () => {
    const data = trainings.map((training) => ({
      Title: training.title,
      Type: training.type,
      "Start Date": training.startDate,
      "End Date": training.endDate,
      Hours: training.hours,
      Sponsor: training.sponsor,
      Certificate: training.certificate ? "Yes" : "No", // Indicate if a certificate is available
    }));

    const worksheet = XLSX.utils.json_to_sheet(data);

    const columnWidths = Object.keys(data[0] || {}).map((key) => {
      const maxLength = Math.max(
        key.length, // Header length
        ...data.map((row) => (row[key] ? row[key].toString().length : 0)) // Max length of column data
      );
      return { wch: maxLength + 2 }; // Add padding for better appearance
    });
  
    worksheet["!cols"] = columnWidths; // Set calculated widths

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Trainings");

    XLSX.writeFile(workbook, "trainings.xlsx");
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "20px",
        }}
      >
        <h1>Trainings</h1>
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
      {trainings.length > 0 ? (
        <table border="1" style={{ width: "100%", textAlign: "left" }}>
          <thead>
            <tr>
              <th>Title</th>
              <th>Type</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Hours</th>
              <th>Sponsor</th>
              <th>Author</th>
              <th>Certificate</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {trainings.map((training, index) => (
              <tr key={index}>
                <td>{training.title}</td>
                <td>{training.type}</td>
                <td>{training.startDate}</td>
                <td>{training.endDate}</td>
                <td>{training.hours}</td>
                <td>{training.sponsor}</td>
                <td>{training.author}</td>
                <td>
                  {training.certificate ? (
                    <div style={imgContainerStyle}>
                      <img
                        src={training.certificate}
                        alt="Certificate"
                        style={imgStyle}
                      />
                    </div>
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
    </div>
  );
};

export default Trainings;
