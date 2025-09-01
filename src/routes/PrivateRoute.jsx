import React from "react";
import useAuth from "../hooks/useAuth";
import { Navigate, useLocation } from "react-router";

// Loading component for better UX
const LoadingSpinner = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="loading loading-spinner loading-lg text-primary"></div>
  </div>
);

// This component is used to protect routes that require authentication
const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  // Save the current location for redirect after login
  const from = location.pathname || "/dashboard";

  // Show loading spinner while checking authentication state
  if (loading) {
    return <LoadingSpinner />;
  }

  // If no user is authenticated, redirect to login with current location
  if (!user) {
    return <Navigate to="/login" state={{ from }} replace />;
  }

  // User is authenticated, render the protected component
  return children;
};

export default PrivateRoute;
