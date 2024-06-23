import React, { useState } from "react";
import "./Contactusform.css"; // Ensure you have a CSS file for styling
import axios from "axios"; // Import Axios for HTTP requests

const Contactusform = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Send form data to server
    axios
      .post("http://localhost:3001/api/contactus", formData)
      .then((response) => {
        console.log("Form submission successful:", response.data);
        // Reset form after successful submission
        setFormData({
          name: "",
          email: "",
          message: "",
        });
        // Show success alert
        window.alert("Feedback has been sent!");
      })
      .catch((error) => {
        console.error("Error submitting form:", error);
      });
  };

  return (
    <div className="ContactUsform">
      <h2>Contact Us</h2>
      <form onSubmit={handleSubmit} className="contact-form">
        <div className="cform-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="cform-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="cform-group">
          <label htmlFor="message">Message</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <button className="contactusbutton" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Contactusform;
