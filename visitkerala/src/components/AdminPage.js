// src/components/AdminPage.js
import React, { useEffect, useState } from "react";
import "./AdminPage.css";
import Navbar from "./Navbar";
import Footer from "./Footer";

const AdminPage = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Fetch user information (replace with actual API call)
    const fetchedUsers = [
      {
        id: 1,
        username: "JohnDoe123",
        email: "johndoe@example.com",
        role: "user",
      },
      {
        id: 2,
        username: "TravelLover89",
        email: "travellover@example.com",
        role: "user",
      },
      {
        id: 3,
        username: "WanderlustKate",
        email: "kate@example.com",
        role: "user",
      },
      {
        id: 4,
        username: "AdminUser",
        email: "admin@example.com",
        role: "admin",
      },
    ];
    setUsers(fetchedUsers);
  }, []);

  return (
    <div className="admin-page">
      <Navbar />
      <div className="admin-content">
        <h1>Admin Page</h1>
        <h2>User Information</h2>
        <table className="user-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Username</th>
              <th>Email</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Footer />
    </div>
  );
};

export default AdminPage;
