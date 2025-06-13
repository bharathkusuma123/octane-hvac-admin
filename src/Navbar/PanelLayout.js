// components/PanelLayout.js
import React from "react";
import TopNavbar from "./Navbar";

const PanelLayout = ({ children }) => (
  <>
    <TopNavbar />
    <div className="panel-content">{children}</div>
  </>
);

export default PanelLayout;