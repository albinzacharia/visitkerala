import React, { useState } from "react";
import axios from "axios";
import "./PaymentPage.css";
import Navbar from "./Navbar";
import Footer from "./Footer";

const PaymentPage = ({ paymentDetails }) => {
  const [formErrors, setFormErrors] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form
    if (!validateForm()) {
      return;
    }

    console.log("Payment Details:", paymentDetails); // Check if paymentDetails contains the expected data

    try {
      const response = await axios.post(
        "http://localhost:3001/api/booking",
        paymentDetails
      );
      console.log("Response:", response.data); // Check response data
      alert(response.data);
    } catch (error) {
      console.error("Frontend Error:", error);
    }
  };

  const validateForm = () => {
    const cardNumber = document.getElementById("cardNumber").value;
    const expiryDate = document.getElementById("expiryDate").value;
    const cvv = document.getElementById("cvv").value;
    let valid = true;
    let errors = { cardNumber: "", expiryDate: "", cvv: "" };

    // Validate card number
    if (!/^\d{16}$/.test(cardNumber)) {
      errors.cardNumber = "Card number must be 16 digits";
      valid = false;
    }

    // Validate expiry date
    if (!/^\d{2}\/\d{2}$/.test(expiryDate)) {
      errors.expiryDate = "Expiry date must be in MM/YY format";
      valid = false;
    } else {
      const [month, year] = expiryDate.split("/").map(Number);
      const currentDate = new Date();
      const currentMonth = currentDate.getMonth() + 1;
      const currentYear = currentDate.getFullYear() % 100;

      if (
        month < 1 ||
        month > 12 ||
        year < currentYear ||
        (year === currentYear && month < currentMonth)
      ) {
        errors.expiryDate = "Expiry date must be a valid future date";
        valid = false;
      }
    }

    // Validate CVV
    if (!/^\d{3}$/.test(cvv)) {
      errors.cvv = "CVV must be 3 digits";
      valid = false;
    }

    setFormErrors(errors);
    return valid;
  };

  return (
    <div>
      <Navbar />
      <div className="payment-page">
        <h2>Payment Details</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name on Card</label>
            <input type="text" id="name" name="name" required />
          </div>
          <div className="form-group">
            <label htmlFor="cardNumber">Card Number</label>
            <input type="text" id="cardNumber" name="cardNumber" required />
            {formErrors.cardNumber && (
              <p className="error-message">{formErrors.cardNumber}</p>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="expiryDate">Expiry Date</label>
            <input type="text" id="expiryDate" name="expiryDate" required />
            {formErrors.expiryDate && (
              <p className="error-message">{formErrors.expiryDate}</p>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="cvv">CVV</label>
            <input type="text" id="cvv" name="cvv" required />
            {formErrors.cvv && (
              <p className="error-message">{formErrors.cvv}</p>
            )}
          </div>
          <button type="submit" className="payment-button">
            Pay Now
          </button>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default PaymentPage;
