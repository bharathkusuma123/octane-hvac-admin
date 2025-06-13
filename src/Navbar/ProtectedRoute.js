// components/ProtectedRoute.js
import React from "react";
import { Navigate } from "react-router-dom";
import PanelLayout from "./PanelLayout";

const ProtectedRoute = ({ children }) => {
  const userRole = localStorage.getItem("userRole");
  if (userRole !== "Admin") {
    return <Navigate to="/" replace />;
  }
  return <PanelLayout>{children}</PanelLayout>;
};

export default ProtectedRoute;