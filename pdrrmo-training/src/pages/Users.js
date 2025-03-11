import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/users");
        if (!response.ok) {
          throw new Error(`Error ${response.status}: Unable to fetch users.`);
        }
        const data = await response.json();

        const formattedUsers = data.map((user) => ({
          _id: user._id,
          title: user.title || "",
          lastname: user.lastname || "",
          firstname: user.firstname || "",
          middlename: user.middlename || "",
          office: user.office || "",
          username: user.username || "",
          email: user.email || "",
        }));

        setUsers(formattedUsers);
      } catch (err) {
        console.error(err);
        setError("Failed to load users. Please try again later.");
      }
    };

    fetchUsers();
  }, []);

  const deleteUser = async (id) => {
    try {
      const confirmDelete = window.confirm("Are you sure you want to delete this user?");
      if (!confirmDelete) return;

      const response = await fetch(`http://localhost:5000/api/users/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error(`Error ${response.status}: Unable to delete user.`);
      }

      setUsers(users.filter((user) => user._id !== id));
      alert("User deleted successfully.");
    } catch (err) {
      console.error(err);
      alert("Failed to delete user. Please try again later.");
    }
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif", color: "#333" }}>
    <br />
    <br />
      <h1 style={{ textAlign: "center", color: "#444" }}>Registered Users</h1>
      {error && <p style={{ color: "#d9534f", textAlign: "center" }}>{error}</p>}
      {users.length > 0 ? (
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            marginTop: "20px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          }}
        >
          <thead>
            <tr style={{ backgroundColor: "#f4f4f4", textAlign: "left" }}>
              <th style={{ padding: "10px", borderBottom: "2px solid #ddd" }}>Title</th>
              <th style={{ padding: "10px", borderBottom: "2px solid #ddd" }}>Lastname</th>
              <th style={{ padding: "10px", borderBottom: "2px solid #ddd" }}>Firstname</th>
              <th style={{ padding: "10px", borderBottom: "2px solid #ddd" }}>Middlename</th>
              <th style={{ padding: "10px", borderBottom: "2px solid #ddd" }}>Office</th>
              <th style={{ padding: "10px", borderBottom: "2px solid #ddd" }}>Username</th>
              <th style={{ padding: "10px", borderBottom: "2px solid #ddd" }}>Email</th>
              <th style={{ padding: "10px", borderBottom: "2px solid #ddd" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id} style={{ borderBottom: "1px solid #ddd" }}>
                <td style={{ padding: "10px" }}>{user.title}</td>
                <td style={{ padding: "10px" }}>{user.lastname}</td>
                <td style={{ padding: "10px" }}>{user.firstname}</td>
                <td style={{ padding: "10px" }}>{user.middlename}</td>
                <td style={{ padding: "10px" }}>{user.office}</td>
                <td style={{ padding: "10px" }}>{user.username}</td>
                <td style={{ padding: "10px" }}>{user.email}</td>
                <td style={{ padding: "10px" }}>
                  <button
                    onClick={() => deleteUser(user._id)}
                    style={{
                      padding: "5px 10px",
                      marginRight: "5px",
                      backgroundColor: "#d9534f",
                      color: "#fff",
                      border: "none",
                      borderRadius: "3px",
                      cursor: "pointer",
                    }}
                  >
                    Delete
                  </button>
                  <Link to={`/edituser/${user._id}`}>
                    <button
                      style={{
                        padding: "5px 10px",
                        backgroundColor: "#5bc0de",
                        color: "#fff",
                        border: "none",
                        borderRadius: "3px",
                        cursor: "pointer",
                      }}
                    >
                      Edit
                    </button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p style={{ textAlign: "center", marginTop: "20px" }}>No registered users yet.</p>
      )}
    </div>
  );
};

export default Users;