import React from "react";
import { useNavigate } from "react-router-dom";
import "./TourCard.css"; // Add your CSS file for styling

const TourCard = ({ title, image, description, link }) => {
  const navigate = useNavigate();

  const handleBookNow = () => {
    navigate(link);
  };
  return (
    <div className="tour-card">
      <img src={image} alt="Kollam" className="tour-card-image" />
      <div className="tour-card-content">
        <h3 className="tour-card-title">{title}</h3>
        <p className="tour-card-description">{description}</p>
        <button onClick={handleBookNow} className="experience-card-link">
          Book Now
        </button>
      </div>
    </div>
  );
};

export default TourCard;
