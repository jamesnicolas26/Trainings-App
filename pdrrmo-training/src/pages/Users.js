import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Users = ({ currentUser = null }) => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 10;

  // Ensure `currentUser` is handled safely
  useEffect(() => {
    if (!currentUser || currentUser.role !== "Admin") {
      alert("Access denied. Only admins can access this page.");
      window.location.href = "/home";
    }
  }, [currentUser]);

  // Fetch users from API
  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          alert("Authentication error. Please log in again.");
          window.location.href = "/";
          return;
        }

        const response = await fetch("http://localhost:5000/api/users", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          if (response.status === 401 || response.status === 403) {
            alert("Unauthorized access. Please log in again.");
            localStorage.removeItem("token");
            window.location.href = "/";
            return;
          }
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
          isApproved: user.isApproved || false,
          role: user.role || "User",
        }));

        setUsers(formattedUsers);
        setFilteredUsers(formattedUsers);
      } catch (err) {
        console.error(err);
        setError("Failed to load users. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Approve user
  const approveUser = async (id) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`http://localhost:5000/api/users/approve/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Error ${response.status}: Unable to approve user.`);
      }

      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user._id === id ? { ...user, isApproved: true } : user
        )
      );
      alert("User approved successfully.");
    } catch (err) {
      console.error(err);
      alert("Failed to approve user. Please try again later.");
    }
  };

  // Delete user
  const deleteUser = async (id) => {
    try {
      const token = localStorage.getItem("token");
      const confirmDelete = window.confirm("Are you sure you want to delete this user?");
      if (!confirmDelete) return;

      const response = await fetch(`http://localhost:5000/api/users/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Error ${response.status}: Unable to delete user.`);
      }

      setUsers((prevUsers) => prevUsers.filter((user) => user._id !== id));
      setFilteredUsers((prevFiltered) =>
        prevFiltered.filter((user) => user._id !== id)
      );
      alert("User deleted successfully.");
    } catch (err) {
      console.error(err);
      alert("Failed to delete user. Please try again later.");
    }
  };

  // Handle search
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    const query = e.target.value.toLowerCase();
    setFilteredUsers(
      users.filter(
        (user) =>
          user.firstname.toLowerCase().includes(query) ||
          user.lastname.toLowerCase().includes(query)
      )
    );
  };

  // Pagination logic
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (!currentUser || currentUser.role !== "Admin") {
    return <p>Redirecting...</p>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>Users</h1>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      <input
        type="text"
        placeholder="Search by name"
        value={searchQuery}
        onChange={handleSearch}
      />
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Lastname</th>
            <th>Firstname</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentUsers.map((user) => (
            <tr key={user._id}>
              <td>{user.title}</td>
              <td>{user.lastname}</td>
              <td>{user.firstname}</td>
              <td>{user.role}</td>
              <td>
                {!user.isApproved && (
                  <button onClick={() => approveUser(user._id)}>Approve</button>
                )}
                <button onClick={() => deleteUser(user._id)}>Delete</button>
                <Link to={`/edituser/${user._id}`}>
                  <button>Edit</button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        {Array.from(
          { length: Math.ceil(filteredUsers.length / usersPerPage) },
          (_, index) => (
            <button key={index + 1} onClick={() => paginate(index + 1)}>
              {index + 1}
            </button>
          )
        )}
      </div>
    </div>
  );
};

export default Users;
