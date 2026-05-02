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
import Signup from "./Login/Signup";
import ForgotPassword from "./Login/ForgotPassword";
import AdminResetPasswordScreen from "./Login/ResetPassword";
import UsersResetPassword from "./Users/UsersResetPassword";


function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<AdminLogin />} />
           <Route path="/signup" element={<Signup />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<AdminResetPasswordScreen />} />
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
            path="/admin/users/:id/reset-password"
            element={
              <ProtectedRoute>
                <UsersResetPassword />
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