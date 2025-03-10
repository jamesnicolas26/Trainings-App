import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    // Fetch users from the backend
    const fetchUsers = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/users");
        if (!response.ok) {
          throw new Error(`Error ${response.status}: Unable to fetch users.`);
        }
        const data = await response.json();

        // Ensure the data contains the necessary fields
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

      setUsers(users.filter((user) => user._id !== id)); // Update state to remove deleted user
      alert("User deleted successfully.");
    } catch (err) {
      console.error(err);
      alert("Failed to delete user. Please try again later.");
    }
  };

  return (
    <div style={{ padding: "40px" }}>
      <h1>Registered Users</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {users.length > 0 ? (
        <table border="1" style={{ width: "100%", textAlign: "left" }}>
          <thead>
            <tr>
              <th>Title</th>
              <th>Lastname</th>
              <th>Firstname</th>
              <th>Middlename</th>
              <th>Office</th>
              <th>Username</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user.title}</td>
                <td>{user.lastname}</td>
                <td>{user.firstname}</td>
                <td>{user.middlename}</td>
                <td>{user.office}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>
                  <button
                    onClick={() => deleteUser(user._id)}
                    style={{ marginRight: "10px" }}
                  >
                    Delete
                  </button>
                  <Link to={`/edituser/${user._id}`}>
                    <button>Edit</button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No registered users yet.</p>
      )}
    </div>
  );
};

export default Users;
