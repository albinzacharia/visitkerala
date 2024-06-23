// Featured.js (or wherever TourCard is used)
import React from "react";
import TourCard from "./TourCard";
import "./Featured.css";
import { useNavigate } from "react-router-dom";

const Featured = ({ setPaymentDetails, paymentDetails }) => {
  const tours = [
    {
      title: "Jatayu Earth's Center Adventure",
      image: "./pics/kollam.jpg", // Replace with actual image path for Jatayu Rock
      description:
        "Embark on an exhilarating adventure at Jatayu Earth's Center, featuring breathtaking views and thrilling activities.",
      link: "/tours/jadayu",
    },
    {
      title: "Explore Alappuzha's Waterways",
      image: "./pics/alappuzha.jpg",
      description:
        "Cruise through the picturesque backwaters and enjoy the tranquil beauty of Alappuzha.",
      link: "/tours/alappuzha",
    },
    {
      title: "Trivandrum Heritage and Nature",
      image: "./pics/tvm.jpg",
      description:
        "Immerse yourself in the historical landmarks and natural beauty of Trivandrum.",
      link: "/tours/trivandrum",
    },
    // Add more tours as needed
  ];
 

  return (
    <div className="featured">
      <h2>Featured Tours</h2>
      <div className="tour-card-container">
        {tours.map((tour, index) => (
          <TourCard
            key={index}
            title={tour.title}
            image={tour.image}
            description={tour.description}
            link={tour.link}
            setPaymentDetails={setPaymentDetails}
            paymentDetails={paymentDetails}
          />
        ))}
      </div>
    </div>
  );
};

export default Featured;
