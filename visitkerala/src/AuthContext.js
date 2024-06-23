import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null); // State to hold user data

  const login = (userData) => {
    setIsLoggedIn(true);
    setUser(userData); // Set user data upon login
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUser(null); // Clear user data upon logout
  };

  // Function to update user data
  const updateUser = (updatedUserData) => {
    setUser((prevUser) => ({
      ...prevUser,
      ...updatedUserData,
    }));
  };

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, login, logout, user, updateUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};
