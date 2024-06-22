import React, { useState, useEffect } from "react";
import "./UserProfile.css";
import Navbar from "./Navbar";
import Footer from "./Footer";
import axios from "axios"; // Import Axios for HTTP requests

const UserProfile = ({paymentDetails}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [email, setEmail] = useState("email@google.com");
  const [phone, setPhone] = useState("+91 xxxxxxxxxxx");
  const [firstname, setName] = useState("John");
  const [username, setUsername] = useState(paymentDetails.username); // State to hold username

  useEffect(() => {
    // Fetch username from backend API
    console.log(username);
  }, []);

  const handleEditProfile = () => {
    setIsEditing(true);
  };

  const handleSaveProfile = () => {
    console.log(email);
      axios
        .post("http://localhost:3001/api/updateProfile", {
          email: email,
          phone: phone,
          firstname: firstname,
          username: username,
        })
        .then((response) => {
          console.log(response.data); // Handle successful response (optional)
          setIsEditing(false); // Exit edit mode
        })
        .catch((error) => {
          console.error("Error updating profile:", error);
          // Handle error (show alert, etc.)
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
              <label>Name:</label>
              <input
                type="text"
                value={firstname}
                onChange={(e) => setName(e.target.value)}
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
                <strong>Name:</strong> {firstname}
              </p>
              <button className="editbutton" onClick={handleEditProfile}>
                Edit Profile
              </button>
            </>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default UserProfile;
