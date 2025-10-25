// AuthContext/AuthContext.js
import React, { createContext, useState, useContext, useEffect } from "react";

export const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

const AuthProvider = ({ children }) => {
  const [userRole, setUserRole] = useState(localStorage.getItem("userRole"));
  const [userId, setUserId] = useState(localStorage.getItem("userId"));
  const [username, setUsername] = useState(localStorage.getItem("username") || "");

  // Fetch user data when component mounts or userId changes
  useEffect(() => {
    const fetchUserData = async () => {
      if (userId && !username) {
        try {
          const response = await fetch("http://175.29.21.7:8006/users/");
          if (response.ok) {
            const users = await response.json();
            const currentUser = users.find(user => user.user_id === userId);
            if (currentUser) {
              setUsername(currentUser.username);
              localStorage.setItem("username", currentUser.username);
            }
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
    };

    fetchUserData();
  }, [userId, username]);

  const login = (role, id, name = "") => {
    localStorage.setItem("userRole", role); 
    localStorage.setItem("userId", id);
    if (name) {
      localStorage.setItem("username", name);
      setUsername(name);
    }
    setUserRole(role);
    setUserId(id);
  };

  const logout = () => {
    localStorage.removeItem("userRole");
    localStorage.removeItem("userId");
    localStorage.removeItem("username");
    setUserRole(null);
    setUserId(null);
    setUsername("");
  };

  return (
    <AuthContext.Provider value={{ 
      login, 
      logout, 
      userRole, 
      userId, 
      username 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;