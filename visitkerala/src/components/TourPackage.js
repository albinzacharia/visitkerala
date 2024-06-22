// src/components/TourPackage.js
import React, { useEffect, useState } from "react";
import "./TourPackage.css";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext"; // Import the authentication context

const TourPackage = ({ setPaymentDetails, paymentDetails }) => {
  const { isLoggedIn } = useAuth(); // Get the login state from the context
  const navigate = useNavigate();
  const [tourTitle, setTourTitle] = useState("Kerala Adventure Tour");

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

  const handleBookNow = () => {
    setPaymentDetails({
      ...paymentDetails,
    });

    if (isLoggedIn) {
      navigate("/PaymentPage");
    } else {
      navigate("/LoginSignup");
    }
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
        <div className="reviews-section">
          <h2>Reviews</h2>
          <div className="review-item">
            <h4>
              JohnDoe123{" "}
              <span className="review-date">- Posted on June 1, 2024</span>
            </h4>
            <p>
              My family and I had the most amazing time on this tour. Everything
              was perfectly organized, from the pick-up at our hotel to the
              drop-off. Our guide, Maria, was knowledgeable, friendly, and made
              the whole experience unforgettable. We visited beautiful
              landmarks, enjoyed delicious local cuisine, and learned so much
              about the history and culture of the area. I highly recommend this
              tour to anyone looking to explore and enjoy a new place without
              the stress of planning every detail.
            </p>
          </div>
          <div className="review-item">
            <h4>
              TravelLover89{" "}
              <span className="review-date">- Posted on May 15, 2024</span>
            </h4>
            <p>
              This tour package was worth every penny. The itinerary was
              well-planned, and we got to see so much in a short amount of time.
              Our guide, James, was excellent, providing insightful commentary
              and ensuring everyone was having a good time. The accommodations
              were comfortable, and the transportation was clean and punctual.
              My only minor complaint is that some of the stops felt a bit
              rushed. However, overall, it was a fantastic experience, and I
              would definitely book another tour with this company.
            </p>
          </div>
          <div className="review-item">
            <h4>
              WanderlustKate{" "}
              <span className="review-date">- Posted on April 20, 2024</span>
            </h4>
            <p>
              The Kerala Adventure Tour exceeded all my expectations. From the
              beautiful landscapes to the cultural experiences, everything was
              top-notch. Our guide, Ravi, went above and beyond to make sure we
              had a great time. The highlight of the trip was definitely the
              houseboat stay in Alleppey. I can't wait to go on another tour
              with this company!
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default TourPackage;
