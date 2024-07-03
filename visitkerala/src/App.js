import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import HomePage from "./components/HomePage";
import ThingsToDo from "./components/ThingsToDo";
import Destinations from "./components/Destinations";
import LoginSignup from "./components/LoginSignup";
import Contactus from "./components/Contactus";
import Modal from "./components/Modal";
import UserProfile from "./components/UserProfile";
import TourPackage from "./components/TourPackage";
import { AuthProvider } from "./AuthContext";
import PaymentPage from "./components/PaymentPage";
import Trivandrum from "./components/Trivandrum";
import Kollam from "./components/Kollam"; // Ensure to create this component
import Ernakulam from "./components/Ernakulam"; // Ensure to create this component
import Alappuzha from "./components/Alappuzha"; // Ensure to create this component
import Idukki from "./components/Idukki"; // Ensure to create this component
import AdminPage from "./components/AdminPage";
import axios from "axios";
import TourCoordinatorPage from "./components/TourCoordinatorPage";
function App() {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
}

const AppContent = () => {
  const location = useLocation();
  const [showModal, setShowModal] = useState(false);
  const [paymentDetails, setPaymentDetails] = useState({
    username: "dummy",
    package: "",
    price: "25000",
    datedet: "",
  });

  const [tours, setTours] = useState([]); // Initialize tours state

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  useEffect(() => {
    if (location.pathname === "/LoginSignup") {
      openModal();
    } else {
      closeModal();
    }
  }, [location]);

  useEffect(() => {
    // Fetch tours data when component mounts
    fetchTours();
  }, []);

  const fetchTours = () => {
    // Example fetch logic; replace with actual fetch from API
    axios
      .get("http://localhost:3001/api/tours")
      .then((response) => {
        setTours(response.data);
      })
      .catch((error) => {
        console.error("Error fetching tours:", error);
      });
  };

  return (
    <div className="App">
      <main>
        <Routes location={location}>
          <Route
            path="/"
            element={
              <HomePage
                setPaymentDetails={setPaymentDetails}
                paymentDetails={paymentDetails}
              />
            }
          />
          <Route
            path="/ThingsToDo"
            element={
              <ThingsToDo
                setPaymentDetails={setPaymentDetails}
                paymentDetails={paymentDetails}
                tours={tours} // Pass tours state here
              />
            }
          />
          <Route path="/Destinations" element={<Destinations />} />
          <Route path="/Contactus" element={<Contactus />} />
          <Route
            path="/Trivandrum"
            element={
              <Trivandrum
                paymentDetails={paymentDetails}
                setPaymentDetails={setPaymentDetails}
              />
            }
          />
          <Route
            path="/Kollam"
            element={
              <Kollam
                paymentDetails={paymentDetails}
                setPaymentDetails={setPaymentDetails}
              />
            }
          />
          <Route
            path="/Ernakulam"
            element={
              <Ernakulam
                paymentDetails={paymentDetails}
                setPaymentDetails={setPaymentDetails}
              />
            }
          />
          <Route
            path="/Alappuzha"
            element={
              <Alappuzha
                paymentDetails={paymentDetails}
                setPaymentDetails={setPaymentDetails}
              />
            }
          />
          <Route
            path="/Idukki"
            element={
              <Idukki
                paymentDetails={paymentDetails}
                setPaymentDetails={setPaymentDetails}
              />
            }
          />
          <Route
            path="*"
            element={
              <HomePage
                setPaymentDetails={setPaymentDetails}
                paymentDetails={paymentDetails}
              />
            }
          />
          <Route
            path="/UserProfile"
            element={
              <UserProfile
                setPaymentDetails={setPaymentDetails}
                paymentDetails={paymentDetails}
              />
            }
          />
          <Route
            path="/TourPackage"
            element={
              <TourPackage
                setPaymentDetails={setPaymentDetails}
                paymentDetails={paymentDetails}
              />
            }
          />
          <Route
            path="/tour/:id"
            element={
              <TourPackage
                setPaymentDetails={setPaymentDetails}
                paymentDetails={paymentDetails}
              />
            }
          />
          <Route
            path="/TourCoordinatorPage"
            element={
              <TourCoordinatorPage
                setPaymentDetails={setPaymentDetails}
                paymentDetails={paymentDetails}
              />
            }
          />
          <Route path="/AdminPage" element={<AdminPage />} />
          <Route
            path="/PaymentPage"
            element={
              <PaymentPage
                paymentDetails={paymentDetails}
                setPaymentDetails={setPaymentDetails}
              />
            }
          />
        </Routes>
      </main>
      {showModal && (
        <Modal show={showModal} onClose={closeModal}>
          <LoginSignup
            onClose={closeModal}
            setPaymentDetails={setPaymentDetails}
          />
        </Modal>
      )}
    </div>
  );
};

export default App;
