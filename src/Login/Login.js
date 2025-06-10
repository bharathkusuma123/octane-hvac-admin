import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginCard from "./LoginCard";
import axios from "axios";
import baseURL from "../ApiUrl/Apiurl";

const AdminLogin = () => {
  const [username, setUsername] = useState("");   // Changed from email to mobileNo
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      
      const response = await axios.post(`${baseURL}/user-login/`, {
         username,   
        password,
      });

      const user = response.data.data;

      if (user.role === "Admin") {
        localStorage.setItem("userRole", "admin");
        
        navigate("/admin/component");
      } else {
        setError("User is not an Admin");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("Invalid Username or password");
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
