import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginSignup.css";
import { useAuth } from "../AuthContext";
import axios from "axios";

const LoginSignup = ({ onClose, setPaymentDetails }) => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone: "",
    firstname: "",
    password: "",
  });

  const { login } = useAuth(); // Destructure login function from useAuth
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value, // Ensure value is treated as a string
    }));
  };

  const handleSignup = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:3001/api/register", formData)
      .then((response) => {
        console.log("Signup successful:", response.data);
        const { username, email, phone, firstname } = formData;
        const userData = { username, email, phone, firstname };
        login(userData); // Login with the new user data

        // Ensure username is passed as a string to setPaymentDetails
        setPaymentDetails((prevDetails) => ({
          ...prevDetails,
          username: formData.username,
        }));

        onClose(); // Close modal or navigate after successful signup
        navigate("/user-profile"); // Redirect to user profile page
      })
      .catch((error) => {
        console.error("Error signing up:", error);
      });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    // Simulate login success and set user data
    const userData = {
      username: formData.username,
      email: formData.email,
      // Add more fields as needed
    };
    login(userData);

    // Ensure username is passed as a string to setPaymentDetails
    setPaymentDetails((prevDetails) => ({
      ...prevDetails,
      username: formData.username,
    }));

    onClose();
    navigate("/user-profile"); // Redirect to user profile page
  };

  const [isLogin, setIsLogin] = useState(true);
  const [fade, setFade] = useState(true);

  const toggleForm = () => {
    setFade(false);
    setTimeout(() => {
      setIsLogin(!isLogin);
      setFade(true);
    }, 600);
  };

  return (
    <div className={`form-container ${fade ? "fade-in" : "fade-out"}`}>
      <div className="background-image"></div>
      <button className="modal-close" onClick={onClose}>
        &times;
      </button>
      <img src="./pics/logo.png" alt="logo" className="loginlogo" />
      {isLogin ? (
        <div className="login-form">
          <h2>Sign in to Visit Kerala</h2>
          <p>Enjoy easy booking and our customer care</p>
          <form onSubmit={handleLogin}>
            <input
              type="text"
              name="username"
              placeholder="Enter username"
              onChange={handleChange}
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Enter password"
              onChange={handleChange}
              required
            />
            <button className="continuebutton" type="submit">
              Continue
            </button>
          </form>
          <p>
            Don't Have An Account?{" "}
            <span className="toggle-link" onClick={toggleForm}>
              Sign Up
            </span>
          </p>
        </div>
      ) : (
        <div className="signup-form">
          <h2>Sign up to Visit Kerala</h2>
          <p>Enjoy easy booking and our customer care</p>
          <form onSubmit={handleSignup}>
            <input
              type="text"
              name="username"
              placeholder="Enter username"
              onChange={handleChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Enter email address"
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="phone"
              placeholder="Enter Phone number"
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="firstname"
              placeholder="Enter your name"
              onChange={handleChange}
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Enter password"
              onChange={handleChange}
              required
            />
            <button className="signup" type="submit">
              Sign Up
            </button>
          </form>
          <p>
            Already Have An Account?{" "}
            <span className="toggle-link" onClick={toggleForm}>
              Sign In
            </span>
          </p>
        </div>
      )}
    </div>
  );
};

export default LoginSignup;
