import React from "react";
import { useNavigate } from "react-router-dom";
import "./TourCard.css";

const TourCard = ({
  title,
  image,
  description,
  setPaymentDetails,
  paymentDetails,
  customHandleBookNow, // Add a prop for custom booking handler
}) => {
  const navigate = useNavigate();

  const handleBookNow = () => {
    setPaymentDetails({
      ...paymentDetails,
      package: title,
    });
    navigate("/TourPackage");

    // Scroll to the top of the page
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="tour-card">
      <img src={image} alt={title} className="tour-card-image" />
      <div className="tour-card-content">
        <h3 className="tour-card-title">{title}</h3>
        <p className="tour-card-description">{description}</p>
        <button
          onClick={customHandleBookNow || handleBookNow}
          className="experience-card-link"
        >
          Book Now
        </button>
      </div>
    </div>
  );
};

export default TourCard;
