// src/components/TourPackage.js
import React, { useEffect } from "react";
import "./TourPackage.css";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useNavigate } from "react-router-dom";

const TourPackage = ({setPaymentDetails,paymentDetails}) => {

  // Inside your component
  const handleChange = (e) => {
    const { name, value } = e.target;
    setPaymentDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  useEffect(() => {
    console.log(paymentDetails);
  }, [paymentDetails]);

  const navigate = useNavigate();

  const handleBookNow = () => {
    navigate("/PaymentPage");
  };

  return (
    <div className="tour-package-page">
      <Navbar />
      <div className="tour-package">
        <div className="package-header">
          <img
            src="./pics/pexels.jpg"
            alt="Kerala Tour"
            className="package-image"
          />
          <h2>Kerala Adventure Tour</h2>
        </div>
        <div className="package-details">
          <div className="details">
            <h1>Package Overview</h1>
            <p>
              Experience the beauty of Kerala with our 7-day adventure tour.
              From the serene backwaters of Alleppey to the lush greenery of
              Munnar, this tour offers a perfect blend of relaxation and
              adventure.
            </p>
            <h2>Itinerary</h2>
            <div className="itinerary-item">Day 1: Arrival in Kochi</div>
            <div className="itinerary-item">Day 2: Kochi to Munnar</div>
            <div className="itinerary-item">Day 3: Explore Munnar</div>
            <div className="itinerary-item">Day 4: Munnar to Thekkady</div>
            <div className="itinerary-item">Day 5: Thekkady to Alleppey</div>
            <div className="itinerary-item">
              Day 6: Houseboat stay in Alleppey
            </div>
            <div className="itinerary-item">Day 7: Departure</div>
            <h2>Inclusions</h2>
            <div className="inclusion-item">Accommodation</div>
            <div className="inclusion-item">All meals</div>
            <div className="inclusion-item">Transportation</div>
            <div className="inclusion-item">Sightseeing</div>
            <div className="inclusion-item">Guided tours</div>
          </div>
          <div className="package-price">
            <h3>Price</h3>
            <h3>₹25,000</h3>
            <input name="datedet" type="date" onChange={handleChange}></input>
            <button className="tripbook-button" onClick={handleBookNow}>
              Book Now
            </button>
          </div>
        </div>
        <div className="related-images">
          <h2>Related Images</h2>
          <div className="images">
            <img src="./pics/beach.jpg" alt="Related" />
            <img src="./pics/Gavi.jpg" alt="Related" />
            <img src="./pics/munnar.jpg" alt="Related" />
            <img src="./pics/beach.jpg" alt="Related" />
            <img src="./pics/Gavi.jpg" alt="Related" />
            <img src="./pics/munnar.jpg" alt="Related" />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default TourPackage;
