import React, { useEffect, useState } from "react";
import axios from "axios";
import "./AdminPage.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";
import Navbar from "./Navbar";
import TourCard from "./TourCard";
import ThingsCard from "./ThingsCard"; // Import ThingsCard component

const AdminPage = () => {
  const [users, setUsers] = useState([]);
  const [tours, setTours] = useState([]);
  const [selectedTourId, setSelectedTourId] = useState(null);
  const [selectedTour, setSelectedTour] = useState(null);
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [editTour, setEditTour] = useState({
    id: null,
    title: "",
    description: "",
    price: "",
    imageUrl: "",
    imageFile: null,
    itinerary: "",
    inclusions: "",
  });

  const [newTour, setNewTour] = useState({
    title: "",
    description: "",
    price: "",
    imageUrl: "",
    imageFile: null,
    itinerary: "",
    inclusions: "",
  });

  const [showAddTourForm, setShowAddTourForm] = useState(false);
  const [contactMessages, setContactMessages] = useState([]);
  const [bookings, setBookings] = useState([]);
  useEffect(() => {
    fetchUsers();
    fetchTours();
    fetchContactMessages();
    fetchBookings();
  }, []);
  const fetchBookings = () => {
    axios
      .get("http://localhost:3001/api/bookings")
      .then((response) => {
        setBookings(response.data);
      })
      .catch((error) => {
        console.error("Error fetching bookings:", error);
      });
  };
  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    setNewTour((prev) => ({
      ...prev,
      imageFile: file,
    }));
    setEditTour((prev) => ({
      ...prev,
      imageFile: file,
    }));
  };

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

  const fetchTours = () => {
    axios
      .get("http://localhost:3001/api/tours")
      .then((response) => {
        setTours(response.data);
      })
      .catch((error) => {
        console.error("Error fetching tours:", error);
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

  const handleTourClick = (id) => {
    setSelectedTourId(id);
    axios
      .get(`http://localhost:3001/api/tour/${id}`)
      .then((response) => {
        setSelectedTour(response.data.title);
        setEditTour({
          id: id,
          title: response.data.title,
          description: response.data.description,
          price: response.data.price,
          imageUrl: response.data.imageUrl,
          itinerary: response.data.itinerary,
          inclusions: response.data.inclusions,
        });
      })
      .catch((error) => {
        console.error("Error fetching tour by ID:", error);
        setSelectedTour(null);
        setEditTour({
          id: null,
          title: "",
          description: "",
          price: "",
          imageUrl: "",
          itinerary: "",
          inclusions: "",
        });
      });
  };

  const handleEditTourChange = (e) => {
    const { name, value } = e.target;
    setEditTour((prev) => ({
      ...prev,
      [name]: value,
      imageUrl: prev.imageUrl,
    }));
  };

  const handleEditTourSubmit = (e) => {
    e.preventDefault();

    // Basic form validation
    if (!editTour.title || !editTour.description || !editTour.price) {
      console.error("Error: Title, Description, and Price are required");
      return;
    }

    // Create FormData to handle file upload if a new image file is selected
    const formData = new FormData();
    if (editTour.imageFile) {
      formData.append("image", editTour.imageFile);
    }
    formData.append("id", editTour.id);
    formData.append("title", editTour.title);
    formData.append("description", editTour.description);
    formData.append("price", editTour.price);
    formData.append("itinerary", editTour.itinerary);
    formData.append("inclusions", editTour.inclusions);

    // Send POST request to update tour
    axios
      .post("http://localhost:3001/api/updateTour", formData)
      .then((response) => {
        console.log("Tour updated successfully:", response.data);

        // If an image was uploaded, update editTour.imageUrl with the new URL
        if (response.data.imageUrl) {
          setEditTour((prevEditTour) => ({
            ...prevEditTour,
            imageUrl: response.data.imageUrl,
          }));
        }

        fetchTours(); // Refresh tour list after update
        setSelectedTour(null); // Clear selected tour
      })
      .catch((error) => {
        console.error("Error updating tour:", error);
        // Handle specific errors related to file upload or server response
        // Display appropriate error messages to the user if needed
      });
  };

  const handleNewTourChange = (e) => {
    const { name, value } = e.target;
    setNewTour((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);

    axios
      .post("http://localhost:3001/api/uploadImage", formData, {
        headers: {
          "Content-Type": "multipart/form-data", // Important for file upload
        },
      })
      .then((response) => {
        const imageUrl = response.data.imageUrl;
        console.log("File upload successful. Image URL:", imageUrl);
        // Update newTour state with the received imageUrl
        setNewTour((prevNewTour) => ({
          ...prevNewTour,
          imageUrl: imageUrl,
        }));
      })
      .catch((error) => {
        console.error("Error uploading image:", error);
        // Handle specific error cases, display user-friendly message if necessary
      });
  };

  const handleAddTourSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("image", newTour.imageFile);
    formData.append("title", newTour.title);
    formData.append("description", newTour.description);
    formData.append("price", newTour.price);
    formData.append("itinerary", newTour.itinerary);
    formData.append("inclusions", newTour.inclusions);

    axios
      .post("http://localhost:3001/api/addTour", formData)
      .then((response) => {
        console.log("Tour added successfully:", response.data);
        fetchTours();
        setNewTour({
          title: "",
          description: "",
          price: "",
          imageUrl: "",
          imageFile: null,
          itinerary: "",
          inclusions: "",
        });
        setShowAddTourForm(false);
      })
      .catch((error) => console.error("Error adding tour:", error));
  };

  const handleDeleteTour = (id) => {
    if (window.confirm("Are you sure you want to delete this tour?")) {
      axios
        .delete(`http://localhost:3001/api/deleteTour/${id}`)
        .then((response) => {
          console.log("Tour deleted successfully:", response.data);
          fetchTours();
          if (selectedTourId === id) {
            setSelectedTourId(null);
          }
        })
        .catch((error) => console.error("Error deleting tour:", error));
    }
  };

  const toggleAddTourForm = () => {
    setShowAddTourForm((prev) => !prev);
  };

  return (
    <div>
      <Navbar />
      <h1>Welcome Admin!</h1>
      <div className="admin-page">
        <div className="admin-content">
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
                  <th>Image</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {tours.map((tour) => (
                  <tr key={tour.id}>
                    <td>{tour.title}</td>
                    <td>{tour.description}</td>
                    <td>{tour.price}</td>
                    <td>
                      {tour.imageUrl && (
                        <img
                          src={tour.imageUrl}
                          alt={tour.title}
                          style={{ width: "100px", height: "auto" }}
                        />
                      )}
                    </td>
                    <td>
                      <button onClick={() => handleTourClick(tour.id)}>
                        Edit Package
                      </button>
                      <button onClick={() => handleDeleteTour(tour.id)}>
                        Delete Package
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {selectedTourId && (
              <div className="package-details">
                <h3>Editing Package: {selectedTour}</h3>
                <form onSubmit={handleEditTourSubmit}>
                  <label>
                    Name:
                    <input
                      type="text"
                      name="title"
                      value={editTour.title}
                      onChange={handleEditTourChange}
                    />
                  </label>
                  <label>
                    Description:
                    <input
                      type="text"
                      name="description"
                      value={editTour.description}
                      onChange={handleEditTourChange}
                    />
                  </label>
                  <label>
                    Price:
                    <input
                      type="text"
                      name="price"
                      value={editTour.price}
                      onChange={handleEditTourChange}
                    />
                  </label>
                  <label>
                    Image (Upload new):
                    <input type="file" onChange={handleFileSelect} />
                  </label>
                  <label>
                    Itinerary:
                    <input
                      type="text"
                      name="itinerary"
                      value={editTour.itinerary}
                      onChange={handleEditTourChange}
                    />
                  </label>
                  <label>
                    Inclusions:
                    <input
                      type="text"
                      name="inclusions"
                      value={editTour.inclusions}
                      onChange={handleEditTourChange}
                    />
                  </label>
                  <button type="submit">Save Changes</button>
                </form>
              </div>
            )}

            {showAddTourForm && (
              <div className="add-package">
                <h3>Add New Package</h3>
                <form onSubmit={handleAddTourSubmit}>
                  <label>
                    Name:
                    <input
                      type="text"
                      name="title"
                      value={newTour.title}
                      onChange={handleNewTourChange}
                    />
                  </label>
                  <label>
                    Description:
                    <input
                      type="text"
                      name="description"
                      value={newTour.description}
                      onChange={handleNewTourChange}
                    />
                  </label>
                  <label>
                    Price:
                    <input
                      type="text"
                      name="price"
                      value={newTour.price}
                      onChange={handleNewTourChange}
                    />
                  </label>
                  <label>
                    Image (Upload):
                    <input type="file" onChange={handleFileSelect} />
                  </label>
                  <label>
                    Itinerary:
                    <input
                      type="text"
                      name="itinerary"
                      value={newTour.itinerary}
                      onChange={handleNewTourChange}
                    />
                  </label>
                  <label>
                    Inclusions:
                    <input
                      type="text"
                      name="inclusions"
                      value={newTour.inclusions}
                      onChange={handleNewTourChange}
                    />
                  </label>
                  <button type="submit">Add Package</button>
                </form>
              </div>
            )}

            <button onClick={toggleAddTourForm}>
              {showAddTourForm ? "Cancel Adding Package" : "Add New Package"}
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
          <section>
            <h2>Bookings</h2>
            <table>
              <thead>
                <tr>
                  <th>Booking ID</th>
                  <th>Tour Name</th>
                  <th>Price</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((booking) => (
                  <tr key={booking.id}>
                    <td>{booking.username}</td>
                    <td>{booking.package}</td>
                    <td>{booking.price}</td>
                    <td>{booking.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
