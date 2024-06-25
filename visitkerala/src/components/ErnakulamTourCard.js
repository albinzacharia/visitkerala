import React from "react";
import { useNavigate } from "react-router-dom";
import TourCard from "./TourCard";

const ErnakulamTourCard = ({
  title,
  image,
  description,
  setPaymentDetails,
  paymentDetails,
}) => {
  const navigate = useNavigate();

  const handleBookNow = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setPaymentDetails({
      ...paymentDetails,
      package: title,
      specialNote: "Ernakulam Package",
    });
    navigate("/tour/32"); // Navigate to the TourPackage page
  };

  return (
    <TourCard
      title={title}
      image={image}
      description={description}
      setPaymentDetails={setPaymentDetails}
      paymentDetails={paymentDetails}
      customHandleBookNow={handleBookNow} // Pass custom handler
    />
  );
};

export default ErnakulamTourCard;
