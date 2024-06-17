import React from "react";
import { useNavigate } from "react-router-dom";
import "./TourCard.css";

const TourCard = ({
  title,
  image,
  description,
  link,
  setPaymentDetails,
  paymentDetails,
  customHandleBookNow, // Add a prop for custom booking handler
}) => {
  const navigate = useNavigate();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleBookNow = () => {
    scrollToTop();
    setPaymentDetails({
      ...paymentDetails,
      package: title, // Assuming you want to update the package title on booking
    });
    navigate("/TourPackage");
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
