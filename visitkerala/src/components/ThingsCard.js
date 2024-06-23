import React from "react";
import TourCard from "./TourCard";
import "./ThingsCard.css"; // Add your CSS file for styling
const tours = [
  {
    title: "Historical Wonders of Trivandrum",
    image: "./pics/tvm.jpg", // Replace with actual image paths
    description:
      "Discover the rich historical landmarks and cultural treasures of Trivandrum.",
    link: "/Trivandrum",
  },
  {
    title: "Jatayu Earth's Center Adventure in Kollam",
    image: "./pics/kollam.jpg",
    description:
      "Embark on an exhilarating adventure at Jatayu Earth's Center, featuring breathtaking views and thrilling activities.",
    link: "/Kollam",
  },
  {
    title: "Backwaters Exploration in Alappuzha",
    image: "./pics/alappuzha.jpg",
    description:
      "Cruise through the picturesque backwaters and enjoy the tranquil beauty of Alappuzha.",
    link: "/Alappuzha",
  },
  {
    title: "Scenic Splendor of Idukki",
    image: "./pics/idukki.jpg",
    description:
      "Explore the scenic beauty and serene landscapes of Idukki amidst the Western Ghats.",
    link: "/Idukki",
  },
  {
    title: "Cultural Delights of Ernakulam",
    image: "./pics/ernakulam.jpg",
    description:
      "Immerse yourself in the vibrant culture, culinary delights, and bustling markets of Ernakulam.",
    link: "/Ernakulam",
  },
  // Add more tour objects as needed
];

const ThingsCard = ({ setPaymentDetails, paymentDetails }) => {
  return (
    <div className="ThingsCard">
      <h2>Our Packages</h2>
      <div className="things-card-container">
        {tours.map((tour, index) => (
          <TourCard setPaymentDetails={setPaymentDetails}
        paymentDetails={paymentDetails}
            key={index}
            title={tour.title}
            image={tour.image}
            description={tour.description}
            link={tour.link}
          />
        ))}
      </div>
    </div>
  );
};

export default ThingsCard;
