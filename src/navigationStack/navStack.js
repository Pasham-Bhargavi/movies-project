import React, { useState, useEffect } from "react";
import { Route, Routes, Navigate, useLocation } from "react-router-dom";
import Homepage from "../pages/homePage";
import TicketBooking from "../pages/bookingpage";
import TicketConfirmationPage from "../pages/confirmationpage";
import InvalidPage from "../pages/invalidpage";
import MovieDetails from "../pages/movedetail";
import LoginForm from "../login/loginPage";

const NavStack = () => {
  // ✅ Load formSubmitted from localStorage initially
  const [formSubmitted, setFormSubmitted] = useState(() => {
    return localStorage.getItem("formSubmitted") === "false";
  });

  const location = useLocation();

  // ✅ Update localStorage when form is submitted
  const handleFormSubmit = () => {
    setFormSubmitted(true);
    localStorage.setItem("formSubmitted", "true");
  };

  // ✅ Change body class on route change
  useEffect(() => {
    const pageClass = location.pathname
      .replace("/", "")
      .replace(/\//g, "-") || "home";
    document.body.className = `page-${pageClass}`;
  }, [location]);

  // ✅ Protected route wrapper
  const PrivateRoute = ({ element }) => {
    return formSubmitted ? element : <Navigate to="/login" replace />;
  };

  return (
    <Routes>
      <Route
        path="/login"
        element={
          formSubmitted ? (
            <Navigate to="/" replace />
          ) : (
            <LoginForm onSubmit={handleFormSubmit} />
          )
        }
      />

      {/* Protected routes */}
      <Route path="/" element={<PrivateRoute element={<Homepage />} />} />
      <Route
        path="/bookingpage/:id"
        element={<PrivateRoute element={<TicketBooking />} />}
      />
      <Route
        path="/pages/confirmationpage/:id"
        element={<PrivateRoute element={<TicketConfirmationPage />} />}
      />
      <Route
        path="/movedetail/:title/:id"
        element={<PrivateRoute element={<MovieDetails />} />}
      />8
      
      {/* Catch-all */}
      <Route path="*" element={<InvalidPage />} />
    </Routes>
  );
};

export default NavStack;
