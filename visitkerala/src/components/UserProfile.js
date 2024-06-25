import React, { useState, useEffect } from "react";
import "./UserProfile.css";
import Navbar from "./Navbar";
import Footer from "./Footer";
import axios from "axios";
import { useAuth } from "../AuthContext"; // Import the AuthContext

const UserProfile = () => {
  const { user, updateUser } = useAuth(); // Ensure user and updateUser are properly initialized
  const [isEditing, setIsEditing] = useState(false);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [firstname, setFirstname] = useState("");
  const [username, setUsername] = useState(user?.username || "");
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    fetchUserData(username); // Fetch user data initially based on logged-in username
    fetchBookingHistory(username); // Fetch booking history
  }, [username]); // Fetch again if username changes

  useEffect(() => {
    // Load user profile data from localStorage if available
    const storedUserData = JSON.parse(localStorage.getItem("userProfileData"));
    if (storedUserData) {
      setEmail(storedUserData.email || "");
      setPhone(storedUserData.phone || "");
      setFirstname(storedUserData.firstname || "");
      setUsername(storedUserData.username || "");
    }
  }, []);

  const fetchUserData = (username) => {
    axios
      .get(`http://localhost:3001/api/user/${username}`) // Adjust URL as per your backend route
      .then((response) => {
        const userData = response.data; // Assuming response.data contains user details
        setEmail(userData.email || "");
        setPhone(userData.phone || "");
        setFirstname(userData.firstname || "");
        setUsername(userData.username || "");

        // Save user profile data to localStorage
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
  };

  const fetchBookingHistory = (username) => {
    axios
      .get(`http://localhost:3001/api/bookings/${username}`) // Adjust URL as per your backend route
      .then((response) => {
        setBookings(response.data || []);
      })
      .catch((error) => {
        console.error("Error fetching booking history:", error);
      });
  };

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
        updateUser({ email, phone, firstname, username }); // Update user data in context

        // Update localStorage with new user profile data
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

    setIsEditing(false);
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
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default UserProfile;
