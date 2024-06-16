// Featured.js (or wherever TourCard is used)
import React from "react";
import TourCard from "./TourCard";
import "./Featured.css";
import { useNavigate } from "react-router-dom";

const Featured = ({ setPaymentDetails, paymentDetails }) => {
  const tours = [
    {
      title: "Beautiful Beaches of Goa",
      image: "./pics/kollam.jpg", // Replace with actual image paths
      description: "Explore the stunning beaches and vibrant nightlife of Goa.",
      link: "/tours/goa",
    },
    {
      title: "Majestic Mountains of Manali",
      image: "./pics/alappuzha.jpg",
      description:
        "Experience the serene beauty and adventurous activities in Manali.",
      link: "/tours/manali",
    },
    {
      title: "Majestic Mountains of Manali",
      image: "./pics/alappuzha.jpg",
      description:
        "Experience the serene beauty and adventurous activities in Manali.",
      link: "/tours/manali",
    },
    {
      title: "Majestic Mountains of Manali",
      image: "./pics/alappuzha.jpg",
      description:
        "Experience the serene beauty and adventurous activities in Manali.",
      link: "/tours/manali",
    },
    {
      title: "Majestic Mountains of Manali",
      image: "./pics/alappuzha.jpg",
      description:
        "Experience the serene beauty and adventurous activities in Manali.",
      link: "/tours/manali",
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
