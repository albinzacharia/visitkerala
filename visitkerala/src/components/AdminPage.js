import React, { useEffect, useState } from "react";
import axios from "axios";
import "./AdminPage.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";

const AdminPage = () => {
  const [users, setUsers] = useState([]);
  const [tourPackages, setTourPackages] = useState([]);
  const [selectedPackageId, setSelectedPackageId] = useState(null);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [editPackage, setEditPackage] = useState({
    package_id: null,
    name: "",
    description: "",
    price: "",
  });
  const [newPackage, setNewPackage] = useState({
    name: "",
    description: "",
    price: "",
  });
  const [showAddPackageForm, setShowAddPackageForm] = useState(false);
  const [contactMessages, setContactMessages] = useState([]);

  useEffect(() => {
    fetchUsers();
    fetchTourPackages();
    fetchContactMessages();
  }, []);

  const fetchUsers = () => {
    axios
      .get("http://localhost:3001/api/users")
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  };

  const fetchTourPackages = () => {
    axios
      .get("http://localhost:3001/api/tourpackages")
      .then((response) => {
        setTourPackages(response.data);
      })
      .catch((error) => {
        console.error("Error fetching tour packages:", error);
      });
  };

  const fetchContactMessages = () => {
    axios
      .get("http://localhost:3001/api/contactus")
      .then((response) => {
        setContactMessages(response.data);
      })
      .catch((error) => {
        console.error("Error fetching contact messages:", error);
      });
  };

  const handlePackageClick = (packageId) => {
    setSelectedPackageId(packageId);
    axios
      .get(`http://localhost:3001/api/tourpackage/${packageId}`)
      .then((response) => {
        setSelectedPackage(response.data.name); // Set the package name
        setEditPackage({
          package_id: packageId,
          description: response.data.description,
          price: response.data.price,
        });
      })
      .catch((error) => {
        console.error("Error fetching package by ID:", error);
        setSelectedPackage(null);
        setEditPackage({
          package_id: null,
          description: "",
          price: "",
        });
      });
  };

  const handleEditPackageChange = (e) => {
    const { name, value } = e.target;
    setEditPackage((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditPackageSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3001/api/updatePackage", editPackage)
      .then((response) => {
        console.log("Package updated successfully:", response.data);
        fetchTourPackages(); // Refresh package list after update
        setEditPackage({
          package_id: null,
          description: "",
          price: "",
        }); // Clear editPackage state
      })
      .catch((error) => console.error("Error updating package:", error));
  };

  const handleNewPackageChange = (e) => {
    const { name, value } = e.target;
    setNewPackage((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddPackageSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3001/api/addPackage", newPackage)
      .then((response) => {
        console.log("Package added successfully:", response.data);
        fetchTourPackages(); // Refresh package list after adding
        setNewPackage({ name: "", description: "", price: "" }); // Clear form fields
        setShowAddPackageForm(false); // Hide the form after submission
      })
      .catch((error) => console.error("Error adding package:", error));
  };

  const toggleAddPackageForm = () => {
    setShowAddPackageForm((prev) => !prev);
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="admin-page">
      <button onClick={handleLogout} className="logout-button">
        Logout
      </button>
      <h1>Welcome Admin!</h1>
      <section>
        <h2>User Details</h2>
        <table>
          <thead>
            <tr>
              <th>Username</th>
              <th>Email</th>
              <th>Phone</th>
              <th>First Name</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.username}>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.phone}</td>
                <td>{user.firstname}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
      <section>
        <h2>Tour Packages</h2>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {tourPackages.map((pck) => (
              <tr key={pck.package_id}>
                <td>{pck.name}</td>
                <td>{pck.description}</td>
                <td>{pck.price}</td>
                <td>
                  <button onClick={() => handlePackageClick(pck.package_id)}>
                    Edit Package
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {selectedPackageId && (
          <div className="package-details">
            <h3>Editing Package: {selectedPackage}</h3>
            <form onSubmit={handleEditPackageSubmit}>
              <label>
                Name:
                <input
                  type="text"
                  name="name"
                  value={editPackage.name}
                  onChange={handleEditPackageChange}
                />
              </label>
              <label>
                Description:
                <input
                  type="text"
                  name="description"
                  value={editPackage.description}
                  onChange={handleEditPackageChange}
                />
              </label>
              <label>
                Price:
                <input
                  type="text"
                  name="price"
                  value={editPackage.price}
                  onChange={handleEditPackageChange}
                />
              </label>
              <button type="submit">Save Changes</button>
            </form>
          </div>
        )}

        {showAddPackageForm && (
          <div className="add-package">
            <h3>Add New Package</h3>
            <form onSubmit={handleAddPackageSubmit}>
              <label>
                Name:
                <input
                  type="text"
                  name="name"
                  value={newPackage.name}
                  onChange={handleNewPackageChange}
                />
              </label>
              <label>
                Description:
                <input
                  type="text"
                  name="description"
                  value={newPackage.description}
                  onChange={handleNewPackageChange}
                />
              </label>
              <label>
                Price:
                <input
                  type="text"
                  name="price"
                  value={newPackage.price}
                  onChange={handleNewPackageChange}
                />
              </label>
              <button type="submit">Add Package</button>
            </form>
          </div>
        )}

        <button onClick={toggleAddPackageForm}>
          {showAddPackageForm ? "Cancel Adding Package" : "Add New Package"}
        </button>
      </section>

      <section>
        <h2>Contact Messages</h2>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Message</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {contactMessages.map((message) => (
              <tr key={message.id}>
                <td>{message.name}</td>
                <td>{message.email}</td>
                <td>{message.message}</td>
                <td>{new Date(message.date).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
};

export default AdminPage;
