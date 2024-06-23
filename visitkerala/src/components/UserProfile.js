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

  useEffect(() => {
    fetchUserData(username); // Fetch user data initially based on logged-in username
  }, [username]); // Fetch again if username changes

  const fetchUserData = (username) => {
    axios
      .get(`http://localhost:3001/api/user/${username}`) // Adjust URL as per your backend route
      .then((response) => {
        const userData = response.data; // Assuming response.data contains user details
        setEmail(userData.email || "");
        setPhone(userData.phone || "");
        setFirstname(userData.firstname || "");
        setUsername(userData.username || "");
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
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
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default UserProfile;
