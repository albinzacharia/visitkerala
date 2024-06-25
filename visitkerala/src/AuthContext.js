import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    // Load user data from localStorage if it exists
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsLoggedIn(true);
      const isAdminUser = localStorage.getItem("isAdmin");
      setIsAdmin(isAdminUser === "true");
    }
  }, []);

  useEffect(() => {
    // Save user data and isAdmin to localStorage whenever they change
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
    localStorage.setItem("isAdmin", isAdmin.toString());
  }, [user, isAdmin]);

  const login = (formData) => {
    // Assuming formData has username and password fields
    if (formData.username === "admin" && formData.password === "admin") {
      setIsLoggedIn(true);
      setIsAdmin(true);
      setUser(formData); // Set user data for admin
    } else {
      setIsLoggedIn(true);
      setIsAdmin(false);
      setUser(formData); // Set user data for non-admin
    }
  };

  const logout = () => {
    setIsLoggedIn(false);
    setIsAdmin(false);
    setUser(null);
    localStorage.removeItem("isAdmin");
  };

  const updateUser = (updatedUserData) => {
    setUser((prevUser) => ({
      ...prevUser,
      ...updatedUserData,
    }));
  };

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, login, logout, user, updateUser, isAdmin }}
    >
      {children}
    </AuthContext.Provider>
  );
};
