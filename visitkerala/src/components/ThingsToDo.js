import React, { useEffect, useState } from "react";
import Headerttd from "./Headerttd";
import Navbar from "./Navbar";
import Footer from "./Footer";
import "./ThingsToDo.css";
import ThingsCard from "./ThingsCard";
import axios from "axios";

const ThingsToDo = ({ setPaymentDetails, paymentDetails }) => {
  const [tours, setTours] = useState([]);

  useEffect(() => {
    fetchTours();
  }, []);

  const fetchTours = () => {
    axios
      .get("http://localhost:3001/api/tours") // Adjust URL as per your backend setup
      .then((response) => {
        setTours(response.data);
      })
      .catch((error) => {
        console.error("Error fetching tours:", error);
      });
  };

  return (
    <div className="things-to-do">
      <Navbar />
      <Headerttd />
      <h2>Our Packages</h2>
      <div className="things-card-container">
        {tours.map((tour, index) => (
          <ThingsCard
            key={index}
            title={tour.title}
            description={tour.description}
            imageUrl={`http://localhost:3001/${tour.imageUrl}`} // Adjust URL if needed
            link={`/tour/${tour.id}`} // Adjust link as per your routing
            setPaymentDetails={setPaymentDetails}
            paymentDetails={paymentDetails}
          />
        ))}
      </div>
      <Footer />
    </div>
  );
};

export default ThingsToDo;
