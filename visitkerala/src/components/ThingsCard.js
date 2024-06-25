import React from "react";
import "./ThingsCard.css";
import { useNavigate } from "react-router-dom";
const ThingsCard = ({
  title,
  description,
  imageUrl,
  link,
  setPaymentDetails,
  paymentDetails,
}) => {
 const navigate = useNavigate();
  const handleBookNow = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setPaymentDetails({
      ...paymentDetails,
      package: title,
      specialNote: "Trivandrum Package",
    });
    navigate("/TourPackage"); // Navigate to the TourPackage page
  };
  return (
    <div className="things-card">
      <img src={imageUrl} alt={title} className="things-card-image" />
      <div className="things-card-content">
        <h3>{title}</h3>
        <p>{description}</p>
        <a href={link} className="things-card-link" onClick={handleBookNow}>
          Book
        </a>
      </div>
    </div>
  );
};

export default ThingsCard;
