// Featured.js
import React from "react";
import ThingsCard from "./ThingsCard"; // Import ThingsCard component
import "./Featured.css";
import { useNavigate } from "react-router-dom";

const Featured = ({ setPaymentDetails, paymentDetails }) => {
  const things = [
    {
      title: "Jatayu Earth's Center Adventure",
      imageUrl: "./pics/kollam.jpg", // Replace with actual image path for Jatayu Rock
      description:
        "Embark on an exhilarating adventure at Jatayu Earth's Center, featuring breathtaking views and thrilling activities.",
      link: "/tour/28",
    },
    {
      title: "Explore Alappuzha's Waterways",
      imageUrl: "./pics/alappuzha.jpg",
      description:
        "Cruise through the picturesque backwaters and enjoy the tranquil beauty of Alappuzha.",
      link: "/tour/29",
    },
    {
      title: "Trivandrum Heritage and Nature",
      imageUrl: "./pics/tvm.jpg",
      description:
        "Immerse yourself in the historical landmarks and natural beauty of Trivandrum.",
      link: "/tour/30",
    },
    // Add more things as needed
  ];

  return (
    <div className="featured">
      <h2>Featured Tours</h2>
      <div className="things-card-container">
        {things.map((thing, index) => (
          <ThingsCard
            key={index}
            title={thing.title}
            imageUrl={thing.imageUrl}
            description={thing.description}
            link={thing.link}
            setPaymentDetails={setPaymentDetails}
            paymentDetails={paymentDetails}
          />
        ))}
      </div>
    </div>
  );
};

export default Featured;
