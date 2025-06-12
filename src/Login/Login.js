import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LoginCard from "./LoginCard";
import axios from "axios";
import baseURL from "../ApiUrl/Apiurl";
import { AuthContext } from "../AuthContext/AuthContext";

const AdminLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const { login, userRole } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    console.log("Effect triggered with:", { submitted, userRole });

    // ✅ Use correct case for userRole
    if (submitted && userRole === "Admin") {
      console.log("Effect: Navigating to /admin/component");
      navigate("/admin/component");
    } else {
      console.log("Condition not met. Skipping navigation.");
    }
  }, [userRole, submitted, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form submitted");
    console.log("Username:", username);
    console.log("Password:", password);

    try {
      const response = await axios.post(`${baseURL}/user-login/`, {
        username,
        password,
      });

      const user = response.data.data;
      console.log("Login response:", response);
      console.log("User data:", user);

      if (user.role === "Admin") {
        console.log("Admin verified. Logging in...");
        login(user.role, user.user_id);
        setSubmitted(true); // triggers the useEffect
      } else {
        setError("User is not an Admin");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("Invalid Username or Password");
    }
  };

  return (
    <LoginCard
      title="Admin Login"
      username={username}
      password={password}
      showPassword={showPassword}
      setUsername={setUsername}
      setPassword={setPassword}
      setShowPassword={setShowPassword}
      handleSubmit={handleSubmit}
      error={error}
    />
  );
};

export default AdminLogin;
