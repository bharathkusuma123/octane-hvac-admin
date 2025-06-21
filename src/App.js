// App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import AuthProvider from "./AuthContext/AuthContext";

import AdminLogin from "./Login/Login";
import Component from "./Components/Component";
import Products from "./Products/Product(HVACdevices)";
import ResourceManagement from "./Resources/ResourceManagement";
import UserManagement from "./Users/UserManagement";
import ProtectedRoute from "./Navbar/ProtectedRoute";
import ComponentView from "./Components/ComponentView"; // adjust path accordingly
import ProductView from "./Products/ProductView";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<AdminLogin />} />
          <Route
            path="/admin/component"
            element={
              <ProtectedRoute>
                <Component />
              </ProtectedRoute>
            }
          />

            <Route path="/components/view/:component_id" element={              <ProtectedRoute>

              <ComponentView /> </ProtectedRoute>
              } />
          <Route
            path="/admin/products"
            element={
              <ProtectedRoute>
                <Products />
              </ProtectedRoute>
            }
          />
          
          <Route
            path="/admin/resource-management"
            element={
              <ProtectedRoute>
                <ResourceManagement />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/user-management"
            element={
              <ProtectedRoute>
                <UserManagement />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;