import React from "react";
import "./UserProfile.css";
import Navbar from "./Navbar";
import Footer from "./Footer";

const UserProfile = () => {
  return (
    <div className="user-profile-page">
      <Navbar />
      <div className="user-profile">
        <div className="profile-header">
          <h2>Username </h2>
        </div>
        <div className="profile-details">
          <h3>Personal Information</h3>
          <p>
            <strong>Email:</strong> email@google.com
          </p>
          <p>
            <strong>Phone:</strong> +91 xxxxxxxxxxx
          </p>
          <p>
            <strong>Address:</strong> ABC Street, TVM
          </p>
          <h3>Booking History</h3>
          <ul>
            <li>Trip to Munnar - 12/12/2023</li>
            <li>Houseboat in Alappuzha - 05/01/2024</li>
            <li>Beach Resort in Kovalam - 18/02/2024</li>
          </ul>
          <button className="editbutton" type="submit">
            Edit Profile
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default UserProfile;
