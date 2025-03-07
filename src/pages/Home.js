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
        <Link
          to="/trainings"
          style={{
            padding: "10px 15px",
            margin: "10px",
            backgroundColor: "#10b981",
            color: "#fff",
            textDecoration: "none",
            borderRadius: "5px",
            fontWeight: "bold",
          }}
        >
          Trainings
        </Link>
        <Link
          to="/users"
          style={{
            padding: "10px 15px",
            margin: "10px",
            backgroundColor: "#3b82f6",
            color: "#fff",
            textDecoration: "none",
            borderRadius: "5px",
            fontWeight: "bold",
          }}
        >
          Users
        </Link>
        <Link
          to="/register"
          style={{
            padding: "10px 15px",
            margin: "10px",
            backgroundColor: "#8b5cf6",
            color: "#fff",
            textDecoration: "none",
            borderRadius: "5px",
            fontWeight: "bold",
          }}
        >
          Register
        </Link>
        <Link
          to="/logout"
          style={{
            color: "#fff",
            textDecoration: "none",
            backgroundColor: "#e74c3c",
            padding: "10px 15px",
            margin: "10px",
            borderRadius: "5px",
          }}
        >
          Logout
        </Link>
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
