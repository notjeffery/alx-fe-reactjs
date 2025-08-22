import React from "react";
import { Navigate } from "react-router-dom";

const useAuth = () => {
  const user = { loggedIn: true }; 
  return user && user.loggedIn;
};

const ProtectedRoute = ({ children }) => {
  const isAuth = useAuth();

  if (!isAuth) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
