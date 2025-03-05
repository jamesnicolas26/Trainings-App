import React from "react";
import { Link } from "react-router-dom";

const Users = ({ users, deleteUser }) => {
  return (
    <div>
      <h1>Registered Users</h1>
      {users.length > 0 ? (
        <table border="1" style={{ width: "100%", textAlign: "left" }}>
          <thead>
            <tr>
              <th>Title</th>
              <th>Last Name</th>
              <th>First Name</th>
              <th>Middle Name</th>
              <th>Office</th>
              <th>Username</th>
              <th>Email</th>
              <th>Actions</th> {/* Column for delete and edit buttons */}
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={index}>
                <td>{user.title}</td>
                <td>{user.lastname}</td>
                <td>{user.firstname}</td>
                <td>{user.middlename}</td>
                <td>{user.office}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>
                  <button
                    onClick={() =>
                      window.confirm("Are you sure you want to delete this user?") &&
                      deleteUser(index)
                    }
                    style={{ marginRight: "10px" }}
                  >
                    Delete
                  </button>
                  {/* Added Edit button */}
                  <Link to={`/edituser/${index}`}>
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
