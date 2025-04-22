import React, { useEffect, useState } from "react";

const SuperAdminDashboard = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("/api/superadmin/users", {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    })
      .then((res) => res.json())
      .then((data) => setUsers(data.users));
  }, []);

  const promoteUser = async (userId, role) => {
    await fetch(`/api/superadmin/promote/${userId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ role }),
    });
    alert(`User promoted to ${role}`);
    setUsers(users.map((user) => (user._id === userId ? { ...user, role } : user)));
  };

  return (
    <div>
      <h1>Super Admin Dashboard</h1>
      <ul>
        {users.map((user) => (
          <li key={user._id}>
            {user.firstname} {user.lastname} - {user.role}
            {user.role !== "superadmin" && (
              <>
                <button onClick={() => promoteUser(user._id, "admin")}>Promote to Admin</button>
                <button onClick={() => promoteUser(user._id, "superadmin")}>Promote to Super Admin</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SuperAdminDashboard;
