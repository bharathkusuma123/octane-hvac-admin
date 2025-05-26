import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginCard from "./LoginCard";
import axios from "axios";

const AdminLogin = () => {
  const [mobileNo, setMobileNo] = useState("");   // Changed from email to mobileNo
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      
      const response = await axios.post("http://175.29.21.7:8006/login/", {
        mobile_no: mobileNo,   
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
      setError("Invalid mobile number or password");
    }
  };

  return (
  <LoginCard
  title="Admin Login"
  mobileNo={mobileNo}
  password={password}
  showPassword={showPassword}
  setMobileNo={setMobileNo}     // <-- make sure this is here
  setPassword={setPassword}
  setShowPassword={setShowPassword}
  handleSubmit={handleSubmit}
  error={error}
/>

  );
};

export default AdminLogin;
