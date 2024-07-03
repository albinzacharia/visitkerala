import React, { useEffect } from "react";
import "./Navbar.css";
import i4 from "./pics/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";

const Navbar = () => {
  const {
    isLoggedIn,
    isAdmin,
    isTourManager,
    logout,
    latestBookingStatus,
    setLatestBookingStatus,
  } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // When the component mounts, check if there's a saved booking status in localStorage
    const savedBookingStatus = localStorage.getItem("latestBookingStatus");
    if (savedBookingStatus) {
      setLatestBookingStatus(savedBookingStatus); // Set the state from localStorage
    }
  }, [setLatestBookingStatus]);

  const handleLogout = () => {
    logout();
    navigate("/LoginSignup");
  };

  const isAdminCheck = (formData) => {
    // Replace with actual admin check logic based on form data
    return formData.username === "admin" && formData.password === "admin";
  };

  const isTourManagerCheck = (formData) => {
    // Replace with actual tour manager check logic based on form data
    return (
      formData.username === "tourmanager" && formData.password === "tourmanager"
    );
  };

  const handleLogin = (formData) => {
    if (isAdminCheck(formData)) {
      navigate("/AdminPage");
    } else if (isTourManagerCheck(formData)) {
      navigate("/TourCoordinatorPage");
    } else {
      navigate("/user-profile");
    }
  };

  const getStatusMessage = () => {
    switch (latestBookingStatus) {
      case "Accepted":
        return "Your booking has been accepted!";
      case "Rejected":
        return "Sorry due to unfortunate circumstances, your booking has been rejected. The money will be credited back to your account in 1-3 business days.";
      default:
        return null;
    }
  };

  // Function to save latestBookingStatus to localStorage
  const saveStatusToLocalStorage = () => {
    localStorage.setItem("latestBookingStatus", latestBookingStatus);
  };

  // Save the status to localStorage whenever it changes
  useEffect(() => {
    saveStatusToLocalStorage();
  }, [latestBookingStatus]);

  return (
    <nav className="navbar">
      <img src={i4} alt="logo" className="logos" />
      <ul className="nav-links">
        <li>
          <Link to="/" onClick={() => window.scrollTo(0, 0)}>
            Home
          </Link>
        </li>
        <li>
          <Link to="/ThingsToDo" onClick={() => window.scrollTo(0, 0)}>
            Packages
          </Link>
        </li>
        <li>
          <Link to="/Destinations" onClick={() => window.scrollTo(0, 0)}>
            Destinations
          </Link>
        </li>
        {!isAdmin && !isTourManager && (
          <li>
            <Link to="/ContactUs" onClick={() => window.scrollTo(0, 0)}>
              Contact Us
            </Link>
          </li>
        )}
        {!isLoggedIn && (
          <li>
            <Link to="/LoginSignup" onClick={() => window.scrollTo(0, 0)}>
              Login / Signup
            </Link>
          </li>
        )}
        {isLoggedIn && (
          <>
            {!isAdmin && !isTourManager && (
              <li>
                <Link to="/UserProfile" onClick={() => window.scrollTo(0, 0)}>
                  My Profile
                </Link>
              </li>
            )}
            {isAdmin && (
              <li>
                <Link to="/AdminPage" onClick={() => window.scrollTo(0, 0)}>
                  Admin Page
                </Link>
              </li>
            )}
            {isTourManager && (
              <li>
                <Link
                  to="/TourCoordinatorPage"
                  onClick={() => window.scrollTo(0, 0)}
                >
                  Tour Coordinator Page
                </Link>
              </li>
            )}
            {(latestBookingStatus === "Accepted" ||
              latestBookingStatus === "Rejected") && (
              <li>
                <span
                  className={`booking-status ${
                    latestBookingStatus === "Rejected" ? "rejected" : ""
                  }`}
                  title={getStatusMessage()} // Tooltip message based on status
                >
                  Status: {latestBookingStatus}
                </span>
              </li>
            )}
            <li>
              <button onClick={handleLogout} className="nlogout-button">
                Logout
              </button>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
