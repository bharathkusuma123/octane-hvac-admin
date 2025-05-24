import React, { useState } from "react";
import ResourceForm from "./ResourceForm";
import ResourceTable from "./ResourceTable";

const Resource = () => {
  const [isFormVisible, setFormVisible] = useState(false);

  return isFormVisible ? (
    <ResourceForm
      onCancel={() => setFormVisible(false)}
      onSave={() => setFormVisible(false)}
    />
  ) : (
    <ResourceTable onAdd={() => setFormVisible(true)} />
  );
};

export default Resource;
