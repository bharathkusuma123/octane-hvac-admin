// App.js
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
  useNavigate,
  Link,
} from "react-router-dom";
import "./App.css";

import AdminLogin from "./Login/Login";
import Component from "./Components/Component";
import Products from "./Products/Product(HVACdevices)";
import ResourceManagement from "./Resources/ResourceManagement";
import UserManagement from "./Users/UserManagement";
import AuthProvider from "./AuthContext/AuthContext";
import logo from "./Logos/hvac-logo-new.jpg"

// 🔹 TopNavbar
const TopNavbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const userRole = localStorage.getItem("userRole");

  const handleLogout = () => {
    localStorage.removeItem("userRole");
    navigate("/");
  };

  if (userRole !== "Admin") return null;

  const navItems = [
    { path: "/admin/component", label: "Components" },
    { path: "/admin/products", label: "Products" },
    { path: "/admin/resource-management", label: "Resources" },
    { path: "/admin/user-management", label: "Users" },
  ];

  return (
    <nav className="top-navbar">
      <div className="nav-container">
        <div className="nav-brand">
          <img
                src={logo}
                alt="Company Logo"
                style={{ width: "100px", height: "50px" }}
            />
        </div>
        <div className="nav-links">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={location.pathname === item.path ? "active" : ""}
            >
              {item.label}
            </Link>
          ))}
        </div>
        <div className="nav-user">
          <button onClick={handleLogout} className="logout-btn">
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

// 🔒 Protected Layout
const PanelLayout = ({ children }) => (
  <>
    <TopNavbar />
    <div className="panel-content">{children}</div>
  </>
);

// 🔒 Route Protection
const ProtectedRoute = ({ children }) => {
  const userRole = localStorage.getItem("userRole");
  if (userRole !== "Admin") {
    return <Navigate to="/" replace />;
  }
  return <PanelLayout>{children}</PanelLayout>;
};

// 🔁 Main App
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
