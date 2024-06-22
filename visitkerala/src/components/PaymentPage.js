import React from "react";
import axios from "axios";
import "./PaymentPage.css";
import Navbar from "./Navbar";
import Footer from "./Footer";

const PaymentPage = ({ paymentDetails }) => {
  const handleSubmit = async (e) => {
    e.preventDefault();
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
          </div>
          <div className="form-group">
            <label htmlFor="expiryDate">Expiry Date</label>
            <input type="text" id="expiryDate" name="expiryDate" required />
          </div>
          <div className="form-group">
            <label htmlFor="cvv">CVV</label>
            <input type="text" id="cvv" name="cvv" required />
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
