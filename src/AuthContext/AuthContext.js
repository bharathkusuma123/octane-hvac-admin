import React, { createContext, useState } from "react";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [userRole, setUserRole] = useState(localStorage.getItem("userRole"));
  const [userId, setUserId] = useState(localStorage.getItem("userId"));

  const login = (role, id) => {
    localStorage.setItem("userRole", role);  // 👈 Case-sensitive!
    localStorage.setItem("userId", id);
    setUserRole(role);
    setUserId(id);
  };

  const logout = () => {
    localStorage.removeItem("userRole");
    localStorage.removeItem("userId");
    setUserRole(null);
    setUserId(null);
  };

  return (
    <AuthContext.Provider value={{ login, logout, userRole, userId }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
