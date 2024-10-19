import React, { useEffect, useState } from "react";
import axios from "axios";
import "./TourCoordinatorPage.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";
import Navbar from "./Navbar";

const TourCoordinatorPage = () => {
  const [users, setUsers] = useState([]);
  const [tours, setTours] = useState([]);
  const [selectedTourId, setSelectedTourId] = useState(null);
  const [selectedTour, setSelectedTour] = useState(null);
  const { logout } = useAuth();
  const navigate = useNavigate();
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
      })
      .catch((error) => {
        console.error("Error fetching tour by ID:", error);
        setSelectedTour(null);
      });
  };

  const handleAcceptBooking = (id) => {
    console.log("Accepting booking with id:", id);
    axios
      .post(`http://localhost:3001/api/updateBookingStatus/${id}`, {
        status: "Accepted",
      })
      .then((response) => {
        console.log("Booking accepted successfully:", response.data);
        fetchBookings(); // Refresh booking list after status update
      })
      .catch((error) => {
        console.error("Error accepting booking:", error);
      });
  };

  const handleRejectBooking = (id) => {
    console.log("Rejecting booking with id:", id);
    axios
      .post(`http://localhost:3001/api/updateBookingStatus/${id}`, {
        status: "Rejected",
      })
      .then((response) => {
        console.log("Booking rejected successfully:", response.data);
        fetchBookings(); // Refresh booking list after status update
      })
      .catch((error) => {
        console.error("Error rejecting booking:", error);
      });
  };

  return (
    <div>
      <Navbar />
      <h1>Welcome Tour Coordinator!</h1>
      <div className="tour-coordinator-page">
        <div className="tour-coordinator-content">
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
                  </tr>
                ))}
              </tbody>
            </table>
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
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((booking) => (
                  <tr key={booking.id}>
                    <td>{booking.username}</td>
                    <td>{booking.package}</td>
                    <td>{booking.price}</td>
                    <td>{booking.date}</td>
                    <td>{booking.status}</td>
                    <td>
                      {booking.status !== "Cancelled" &&
                        new Date(booking.date) > new Date() &&
                        new Date(booking.date) >
                          new Date(
                            new Date().setDate(new Date().getDate() + 3)
                          ) && (
                          <>
                            <button
                              onClick={() => handleAcceptBooking(booking.id)}
                            >
                              Accept
                            </button>
                            <button
                              onClick={() => handleRejectBooking(booking.id)}
                            >
                              Reject
                            </button>
                          </>
                        )}
                    </td>
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

export default TourCoordinatorPage;
