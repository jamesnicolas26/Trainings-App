import { Link } from "react-router-dom";

function Home() {
  return (
    <div
      style={{
        textAlign: "center",
        fontFamily: "Arial, sans-serif",
        backgroundColor: "#f3f4f6",
        padding: "20px",
      }}
    >
    <br />
    <br />
      <h1
        style={{
          fontSize: "2.5rem",
          color: "#1e3a8a",
          marginBottom: "20px",
        }}
      >
        Welcome to PDRRMO Trainings Portal
      </h1>
      <p style={{ fontSize: "1.2rem", color: "#374151", marginBottom: "30px" }}>
        Navigate through our portal to manage training, users, and other disaster preparedness resources.
      </p>
      <nav style={{ marginBottom: "30px" }}>
      </nav>
      <div style={{ fontSize: "0.9rem", color: "#6b7280" }}>
        <p>
          Disaster risk management is about understanding, preparing for, and mitigating potential risks.
        </p>
        <p>
          Learn, adapt, and collaborate to make our communities more resilient.
        </p>
      </div>
    </div>
  );
}

export default Home;
