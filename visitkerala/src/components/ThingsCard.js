import React, { useState } from "react";
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
  const [showFullDescription, setShowFullDescription] = useState(false);

  const handleBookNow = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setPaymentDetails({
      ...paymentDetails,
      package: title,
      specialNote: "Trivandrum Package",
    });
    navigate("/TourPackage"); // Navigate to the TourPackage page
  };

  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  const truncatedDescription =
    description.length > 100
      ? `${description.substring(0, 100)}...`
      : description;

  return (
    <div className="things-card">
      <img src={imageUrl} alt={title} className="things-card-image" />
      <div className="things-card-content">
        <h3>{title}</h3>
        <p>
          {showFullDescription ? description : truncatedDescription}
          {description.length > 100 && (
            <span className="read-more" onClick={toggleDescription}>
            </span>
          )}
        </p>
        <a href={link} className="things-card-link" onClick={handleBookNow}>
          Book Now
        </a>
      </div>
    </div>
  );
};

export default ThingsCard;
