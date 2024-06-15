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

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

const AppContent = () => {
  const location = useLocation();
  const [showModal, setShowModal] = useState(false);

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

  return (
    <div className="App">
      <main>
        <Routes location={location}>
          <Route path="/" element={<HomePage />} />
          <Route path="/ThingsToDo" element={<ThingsToDo />} />
          <Route path="/Destinations" element={<Destinations />} />
          <Route path="/Contactus" element={<Contactus />} />
          <Route path="*" element={<HomePage />} />
          <Route path="/UserProfile" element={<UserProfile />} />
          <Route path="/TourPackage" element={<TourPackage />} />;
        </Routes>
      </main>
      {showModal && (
        <Modal show={showModal} onClose={closeModal}>
          <LoginSignup onClose={closeModal} />
        </Modal>
      )}
    </div>
  );
};

export default App;
