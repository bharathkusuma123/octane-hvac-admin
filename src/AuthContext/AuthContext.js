import React, { createContext, useState } from "react";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [userRole, setUserRole] = useState(localStorage.getItem("userRole"));
  const [userId, setUserId] = useState(localStorage.getItem("userId"));
  const [sessionId, setSessionId] = useState(localStorage.getItem("session_id")); // ✅

  const login = (role, id, sessionId) => {
    localStorage.setItem("userRole", role);
    localStorage.setItem("userId", id);

    // ✅ Store session_id
    if (sessionId) {
      localStorage.setItem("session_id", sessionId);
      setSessionId(sessionId);
    }

    setUserRole(role);
    setUserId(id);
  };

  const logout = () => {
    localStorage.removeItem("userRole");
    localStorage.removeItem("userId");
    localStorage.removeItem("session_id"); // ✅ IMPORTANT

    setUserRole(null);
    setUserId(null);
    setSessionId(null);
  };

  return (
    <AuthContext.Provider
      value={{ login, logout, userRole, userId, sessionId }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;