// Component.js
import React, { useState } from "react";
import ComponentForm from "./ComponentForm";
import ComponentTable from "./ComponentTable";

const Component = () => {
  const [isFormVisible, setFormVisible] = useState(false);

  return isFormVisible ? (
    <ComponentForm
      onCancel={() => setFormVisible(false)}
      onSave={() => setFormVisible(false)}
    />
  ) : (
    <ComponentTable onAdd={() => setFormVisible(true)} />
  );
};

export default Component;
