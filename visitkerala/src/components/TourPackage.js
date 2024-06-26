import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./TourPackage.css";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useAuth } from "../AuthContext";
import axios from "axios";

const TourPackage = ({ setPaymentDetails, paymentDetails }) => {
  const { id } = useParams();
  const { isLoggedIn, user } = useAuth();
  const navigate = useNavigate();
  const [tour, setTour] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [reviewText, setReviewText] = useState("");
  const today = new Date().toISOString().split("T")[0];

  useEffect(() => {
    fetchTour();
    fetchReviews();
    if (isLoggedIn) fetchUserDetails();
  }, [id, user?.username]);

  const fetchTour = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/api/tour/${id}`);
      setTour(response.data);
      setPaymentDetails((prevDetails) => ({
        ...prevDetails,
        package: response.data.title,
        price: response.data.price,
      }));
    } catch (error) {
      console.error("Error fetching tour:", error);
    }
  };

  const fetchUserDetails = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3001/api/user/${user.username}`
      );
      setPaymentDetails((prevDetails) => ({
        ...prevDetails,
        username: response.data.username,
        email: response.data.email,
        phone: response.data.phone,
        firstname: response.data.firstname,
      }));
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };

  const fetchReviews = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3001/api/reviews/${id}`
      );
      setReviews(response.data);
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPaymentDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleBookNow = () => {
    if (isLoggedIn) {
      navigate("/PaymentPage");
    } else {
      navigate("/LoginSignup");
    }
  };

  const handleReviewSubmit = async () => {
    try {
      await axios.post("http://localhost:3001/api/addReview", {
        username: user.username,
        reviewText,
        tour_id: id,
      });
      setReviewText("");
      fetchReviews();
    } catch (error) {
      console.error("Error submitting review:", error);
    }
  };

  const renderList = (text) => {
    return text.split("\n").map((item, index) => <li key={index}>{item}</li>);
  };

  if (!tour) {
    return <div>Loading...</div>;
  }

  return (
    <div className="tour-package-page">
      <Navbar />
      <div className="tour-package">
        <div className="package-header">
          <img
            src={`http://localhost:3001/${tour.imageUrl}`}
            alt={tour.title}
            className="package-image"
          />
          <h2>{tour.title}</h2>
        </div>
        <div className="package-details">
          <div className="details">
            <h1>Package Overview</h1>
            <p>{tour.description}</p>
            <h2>Itinerary</h2>
            <ul>{renderList(tour.itinerary)}</ul>
            <h2>Inclusions</h2>
            <ul>{renderList(tour.inclusions)}</ul>
          </div>
          <div className="package-price">
            <h3>Price</h3>
            <h3>₹{tour.price}</h3>
            <input
              name="datedet"
              type="date"
              onChange={handleChange}
              min={today}
            ></input>
            <button className="tripbook-button" onClick={handleBookNow}>
              Book Now
            </button>
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
          {reviews.length > 0 ? (
            reviews.map((review) => (
              <div className="review-item" key={review.id}>
                <h4>
                  {review.username}{" "}
                  <span className="review-date">
                    - Posted on{" "}
                    {new Date(review.reviewDate).toLocaleDateString()}
                  </span>
                </h4>
                <p>{review.reviewText}</p>
              </div>
            ))
          ) : (
            <div>No reviews available</div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default TourPackage;
