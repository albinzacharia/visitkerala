import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isTourManager, setIsTourManager] = useState(false);
  const [latestBookingStatus, setLatestBookingStatus] = useState("");

  useEffect(() => {
    // Load user data from localStorage if it exists
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsLoggedIn(true);
      const isAdminUser = localStorage.getItem("isAdmin");
      setIsAdmin(isAdminUser === "true");
      const isTourManagerUser = localStorage.getItem("isTourManager");
      setIsTourManager(isTourManagerUser === "true");
    }
  }, []);

  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
    localStorage.setItem(
      "isAdmin",
      isAdmin.toString(),
      "isTourManager",
      isTourManager.toString()
    );
  }, [user, isAdmin,isTourManager]);

  const login = (formData) => {
    // Assuming formData has username and password fields
    if (formData.username === "admin" && formData.password === "admin") {
      setIsLoggedIn(true);
      setIsAdmin(true);
      setUser(formData); // Set user data for admin
    }
     else if (formData.username === "tourmanager" && formData.password === "tourmanager") {
       setIsLoggedIn(true);
       setIsTourManager(true);
       setUser(formData); // Set user data for admin
     } else {
       setIsLoggedIn(true);
      setIsAdmin(false);
      setIsTourManager(false);
       setUser(formData); // Set user data for non-admin
     }
  };

  const logout = () => {
    setIsLoggedIn(false);
    setIsAdmin(false);
    setIsTourManager(false);
    setUser(null);
    localStorage.removeItem("isAdmin");
    localStorage.removeItem("isTourManager");
    setLatestBookingStatus(null); // Reset booking status on logout
    localStorage.removeItem("latestBookingStatus");
  };

  const updateUser = (updatedUserData) => {
    setUser((prevUser) => ({
      ...prevUser,
      ...updatedUserData,
    }));
  };

  const updateLatestBookingStatus = (status) => {
    setLatestBookingStatus(status);
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        login,
        logout,
        user,
        updateUser,
        isAdmin,
        isTourManager,
        latestBookingStatus,
        updateLatestBookingStatus,
        setLatestBookingStatus,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
