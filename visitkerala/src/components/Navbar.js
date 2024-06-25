import React from "react";
import "./Navbar.css";
import i4 from "./pics/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";

const Navbar = () => {
  const { isLoggedIn, isAdmin, logout } = useAuth(); // Include isAdmin from context
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/LoginSignup");
  };

  const isAdminCheck = (formData) => {
    // Replace with actual admin check logic based on form data
    return formData.username === "admin" && formData.password === "admin";
  };

  const handleLogin = (formData) => {
    if (isAdminCheck(formData)) {
      navigate("/AdminPage"); // Redirect to admin page
    } else {
      navigate("/user-profile"); // Redirect to user profile page
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
        {!isAdmin && ( // Only show Contact Us for non-admin
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
            {!isAdmin && ( // Only show My Profile for non-admin
              <li>
                <Link to="/UserProfile" onClick={() => window.scrollTo(0, 0)}>
                  My Profile
                </Link>
              </li>
            )}
            {isAdmin && ( // Only show for admin
              <li>
                <Link to="/AdminPage" onClick={() => window.scrollTo(0, 0)}>
                  Admin Page
                </Link>
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
