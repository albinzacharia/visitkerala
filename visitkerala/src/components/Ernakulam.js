import React from "react";
import Navbar from "./Navbar"; // Assuming you have a Navbar component
import Footer from "./Footer"; // Assuming you have a Footer component
import "./DestinationPage.css"; // CSS file for styling
import ErnakulamTourCard from "./ErnakulamTourCard";

const Ernakulam = ({setPaymentDetails, paymentDetails}) => {
  return (
    <div className="Navbar">
      <Navbar />
      <div className="destination-page">
        <img
          src="./pics/ernakulamheader.jpg"
          alt="Header background"
          className="header-background"
        />
        <div className="destination-content">
          <h1>Explore Ernakulam</h1>
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
          <h1>Packages</h1>
          <ErnakulamTourCard
            title="Package 1"
            image="./pics/ernakulam.jpg"
            description="Description for Package 1"
            setPaymentDetails={setPaymentDetails}
            paymentDetails={paymentDetails}
          />
          <ErnakulamTourCard
            title="Package 2"
            image="./pics/ernakulam.jpg"
            description="Description for Package 2"
            setPaymentDetails={setPaymentDetails}
            paymentDetails={paymentDetails}
          />
          <ErnakulamTourCard
            title="Package 3"
            image="./pics/ernakulam.jpg"
            description="Description for Package 3"
            setPaymentDetails={setPaymentDetails}
            paymentDetails={paymentDetails}
          />
          {/* Add more details and images */}
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

export default Ernakulam;
