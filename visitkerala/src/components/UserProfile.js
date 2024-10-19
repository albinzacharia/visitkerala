import React, { useState, useEffect, useCallback } from "react";
import "./UserProfile.css";
import Navbar from "./Navbar";
import Footer from "./Footer";
import axios from "axios";
import { useAuth } from "../AuthContext";

const UserProfile = () => {
  const { user, updateUser, updateLatestBookingStatus } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [firstname, setFirstname] = useState("");
  const [username, setUsername] = useState(user?.username || "");
  const [bookings, setBookings] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  const fetchUserData = useCallback((username) => {
    axios
      .get(`http://localhost:3001/api/user/${username}`)
      .then((response) => {
        const userData = response.data;
        setEmail(userData.email || "");
        setPhone(userData.phone || "");
        setFirstname(userData.firstname || "");
        setUsername(userData.username || "");

        localStorage.setItem(
          "userProfileData",
          JSON.stringify({
            email: userData.email || "",
            phone: userData.phone || "",
            firstname: userData.firstname || "",
            username: userData.username || "",
          })
        );
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }, []);

  const fetchBookingHistory = useCallback(
    (username) => {
      axios
        .get(`http://localhost:3001/api/bookings/${username}`)
        .then((response) => {
          const bookingsData = response.data || [];
          setBookings(bookingsData);
          if (bookingsData.length > 0) {
            const latestBooking = bookingsData[bookingsData.length - 1];
            updateLatestBookingStatus(latestBooking.status);
          }
        })
        .catch((error) => {
          console.error("Error fetching booking history:", error);
        });
    },
    [updateLatestBookingStatus]
  );

  useEffect(() => {
    if (user && user.username) {
      setUsername(user.username);
      fetchUserData(user.username);
    }
  }, [user, fetchUserData]);

  useEffect(() => {
    if (username) {
      fetchBookingHistory(username);
    }
  }, [username, fetchBookingHistory]);

  const handleEditProfile = () => {
    setIsEditing(true);
  };

  const handleSaveProfile = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:3001/api/updateProfile", {
        email: email,
        phone: phone,
        firstname: firstname,
        username: username,
      })
      .then((response) => {
        console.log(response.data);
        updateUser({ email, phone, firstname, username });

        localStorage.setItem(
          "userProfileData",
          JSON.stringify({
            email: email,
            phone: phone,
            firstname: firstname,
            username: username,
          })
        );

        setIsEditing(false);
      })
      .catch((error) => {
        console.error("Error updating profile:", error);
      });
  };

  const handleCancelBooking = (bookingId, tripDate) => {
    const currentDate = new Date();
    const dateOfTrip = new Date(tripDate);
    const timeDifference = dateOfTrip - currentDate;
    const dayDifference = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));

    if (dayDifference < 3) {
      setErrorMessage(
        "You can only cancel bookings more than 3 days before the trip date."
      );
      return;
    }

    axios
      .post("http://localhost:3001/api/cancelBooking", {
        bookingId: bookingId,
        username: username,
      })
      .then((response) => {
        console.log("Booking cancelled:", response.data);
        fetchBookingHistory(username); // Refresh booking history
      })
      .catch((error) => {
        console.error("Error cancelling booking:", error);
      });
  };
  
  return (
    <div className="user-profile-page">
      <Navbar />
      <div className="user-profile">
        <div className="profile-header">
          <h2>Welcome {username}</h2>
        </div>
        <div className="profile-details">
          <h3>Personal Information</h3>
          {isEditing ? (
            <form onSubmit={handleSaveProfile}>
              <label>Email:</label>
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <label>Phone:</label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
              <label>Name:</label>
              <input
                type="text"
                value={firstname}
                onChange={(e) => setFirstname(e.target.value)}
              />
              <button className="savebutton" type="submit">
                Save Profile
              </button>
            </form>
          ) : (
            <>
              <p>
                <strong>Email:</strong> {email}
              </p>
              <p>
                <strong>Phone:</strong> {phone}
              </p>
              <p>
                <strong>Name:</strong> {firstname}
              </p>
              <button className="editbutton" onClick={handleEditProfile}>
                Edit Profile
              </button>
            </>
          )}

          <div className="booking-history">
            <h3>Booking History</h3>
            <ul>
              {bookings.map((booking) => (
                <li key={booking.id}>
                  <p>
                    <strong>Package:</strong> {booking.package}
                  </p>
                  <p>
                    <strong>Price:</strong> {booking.price}
                  </p>
                  <p>
                    <strong>Date:</strong> {booking.date}
                  </p>
                  <p>
                    <strong>Status:</strong> {booking.status}
                  </p>

                  {booking.status !== "Cancelled" &&
                    new Date(booking.date) > new Date() &&
                    new Date(booking.date) >
                      new Date(new Date().setDate(new Date().getDate() + 3))&&(
                        <button
                          className="cancelbutton"
                          onClick={() =>
                            handleCancelBooking(booking.id, booking.date)
                          }
                        >
                          Cancel Booking
                        </button>
                      )}
                </li>
              ))}
            </ul>
          </div>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default UserProfile;
