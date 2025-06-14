// components/PanelLayout.js
import React from "react";
import TopNavbar from "./Navbar";
import { CompanyProvider } from "../AuthContext/CompanyContext";

const PanelLayout = ({ children }) => (
  <CompanyProvider>
    <TopNavbar />
    <div className="panel-content">{children}</div>
  </CompanyProvider>
);

export default PanelLayout;