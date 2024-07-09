import React, { useEffect, useCallback } from "react";
import "./Navbar.css";
import i4 from "./pics/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";
import axios from "axios";

const Navbar = () => {
  const {
    isLoggedIn,
    isAdmin,
    isTourManager,
    logout,
    latestBookingStatus,
    setLatestBookingStatus,
    setHasBookings,
    user,
  } = useAuth();
  const navigate = useNavigate();

  const fetchBookingStatus = useCallback(
    async (username) => {
      try {
        const response = await axios.get(
          `http://localhost:3001/api/user/${username}/latestBooking`
        );
        const bookingStatus = response.data.status;
        const hasBookings = response.data.hasBookings;
        setLatestBookingStatus(bookingStatus);
        setHasBookings(hasBookings);

        // Save booking status and hasBookings to localStorage
        localStorage.setItem("latestBookingStatus", bookingStatus);
        localStorage.setItem("hasBookings", hasBookings);
      } catch (error) {
        console.error("Error fetching booking status:", error);
      }
    },
    [setLatestBookingStatus, setHasBookings]
  );

  useEffect(() => {
    if (isLoggedIn) {
      fetchBookingStatus(user.username);
    }
  }, [isLoggedIn, user?.username, fetchBookingStatus]);

  const handleLogout = () => {
    logout();
    localStorage.removeItem("latestBookingStatus");
    localStorage.removeItem("hasBookings");
    navigate("/LoginSignup");
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
            {latestBookingStatus && (
              <li>
                <span
                  className={`booking-status ${
                    latestBookingStatus === "Rejected" ? "rejected" : ""
                  }`}
                  title={getStatusMessage()}
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
