import React, { useState, useEffect } from "react";
import "./UserProfile.css";
import Navbar from "./Navbar";
import Footer from "./Footer";
import axios from "axios"; // Import Axios for HTTP requests

const UserProfile = ({paymentDetails}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [email, setEmail] = useState("email@google.com");
  const [phone, setPhone] = useState("+91 xxxxxxxxxxx");
  const [address, setAddress] = useState("ABC Street, TVM");
  const [username, setUsername] = useState(paymentDetails.username); // State to hold username

  useEffect(() => {
    // Fetch username from backend API
    console.log(username);
  }, []);

  const handleEditProfile = () => {
    setIsEditing(true);
  };

  const handleSaveProfile = () => {
    // Save edited profile details (You can implement save logic here)
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
            <form>
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
              <label>Address:</label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
              <button className="savebutton" onClick={handleSaveProfile}>
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
                <strong>Address:</strong> {address}
              </p>
              <button className="editbutton" onClick={handleEditProfile}>
                Edit Profile
              </button>
            </>
          )}
          <h3>Booking History</h3>
          <ul>
            <li>Trip to Munnar - 12/12/2023</li>
            <li>Houseboat in Alappuzha - 05/01/2024</li>
            <li>Beach Resort in Kovalam - 18/02/2024</li>
          </ul>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default UserProfile;
