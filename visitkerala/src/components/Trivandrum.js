// Trivandrum.js
import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import "./DestinationPage.css";
import TrivandrumTourCard from "./TrivandrumTourCard"; // Import custom TourCard

const Trivandrum = ({ setPaymentDetails, paymentDetails }) => {
  return (
    <div className="Navbar">
      <Navbar />
      <div className="destination-page">
        <img
          src="./pics/ttdh1.jpg"
          alt="Header background"
          className="header-background"
        />
        <div className="destination-content">
          <h1>Explore Trivandrum</h1>
          <p>
            Goa is known for its stunning beaches, vibrant nightlife, and
            Portuguese heritage. Whether you're looking to relax on the beaches
            or party till dawn, Goa has something for everyone. Goa is known for
            its stunning beaches, vibrant nightlife, and Portuguese heritage.
            Whether you're looking to relax on the beaches or party till dawn,
            Goa has something for everyone.Goa is known for its stunning
            beaches, vibrant nightlife, and Portuguese heritage. Whether you're
            looking to relax on the beaches or party till dawn, Goa has
            something for everyone.Goa is known for its stunning beaches,
            vibrant nightlife, and Portuguese heritage. Whether you're looking
            to relax on the beaches or party till dawn, Goa has something for
            everyone.Goa is known for its stunning beaches, vibrant nightlife,
            and Portuguese heritage. Whether you're looking to relax on the
            beaches or party till dawn, Goa has something for everyone.
          </p>
          <h1>
            <br />
            Packages
          </h1>
          {/* Add more details and images */}
          <TrivandrumTourCard
            title="Package 1"
            image="./pics/tvm.jpg"
            description="Description for Package 1"
            setPaymentDetails={setPaymentDetails}
            paymentDetails={paymentDetails}
          />
          <TrivandrumTourCard
            title="Package 2"
            image="./pics/tvm.jpg"
            description="Description for Package 2"
            setPaymentDetails={setPaymentDetails}
            paymentDetails={paymentDetails}
          />
          <TrivandrumTourCard
            title="Package 3"
            image="./pics/tvm.jpg"
            description="Description for Package 3"
            setPaymentDetails={setPaymentDetails}
            paymentDetails={paymentDetails}
          />
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
      <div className="Footer">
        <Footer />
      </div>
    </div>
  );
};

export default Trivandrum;
