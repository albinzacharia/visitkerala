import React, { useEffect, useState } from "react";
import "./TourPackage.css";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";
import axios from "axios";

const TourPackage = ({ setPaymentDetails, paymentDetails }) => {
  const { isLoggedIn, user } = useAuth();
  const navigate = useNavigate();
  const [reviews, setReviews] = useState([]);
  const [reviewText, setReviewText] = useState("");

  useEffect(() => {
    fetchReviews();
    fetchUserDetails();
  }, [user]);

  const fetchUserDetails = () => {
    if (isLoggedIn) {
      axios
        .get(`http://localhost:3001/api/user/${user.username}`)
        .then((response) => {
          setPaymentDetails((prevDetails) => ({
            ...prevDetails,
            username: response.data.username,
            email: response.data.email,
            phone: response.data.phone,
            firstname: response.data.firstname,
          }));
        })
        .catch((error) => {
          console.error("Error fetching user details:", error);
        });
    }
  };

  const fetchReviews = () => {
    axios
      .get("http://localhost:3001/api/reviews")
      .then((response) => {
        setReviews(response.data);
      })
      .catch((error) => {
        console.error("Error fetching reviews:", error);
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPaymentDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleBookNow = () => {
    setPaymentDetails({
      ...paymentDetails,
    });

    if (isLoggedIn) {
      console.log("User is logged in:", user.username);
      navigate("/PaymentPage");
    } else {
      console.log("User is not logged in. Redirecting to login/signup page.");
      navigate("/LoginSignup");
    }
  };

  const handleReviewSubmit = () => {
    axios
      .post("http://localhost:3001/api/addReview", {
        username: user.username,
        reviewText: reviewText,
      })
      .then((response) => {
        console.log("Review submitted successfully:", response.data);
        setReviewText("");
        fetchReviews();
      })
      .catch((error) => {
        console.error("Error submitting review:", error);
      });
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
          {isLoggedIn && (
            <div className="review-form">
              <textarea
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                placeholder="Write your review here..."
              />
              <button
                className="submit-review-button"
                onClick={handleReviewSubmit}
              >
                Submit Review
              </button>
            </div>
          )}
          {reviews.map((review) => (
            <div className="review-item" key={review.id}>
              <h4>
                {review.username}{" "}
                <span className="review-date">
                  - Posted on {new Date(review.reviewDate).toLocaleDateString()}
                </span>
              </h4>
              <p>{review.reviewText}</p>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default TourPackage;
