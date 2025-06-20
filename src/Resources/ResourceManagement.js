import React, { useState } from "react";
import ResourceForm from "./ResourceForm";
import ResourceTable from "./ResourceTable";
import EditResourceForm from "./EditResourceForm";

const Resource = () => {
  const [isFormVisible, setFormVisible] = useState(false);
  const [editingResource, setEditingResource] = useState(null);

  const handleEdit = (resource) => {
    setEditingResource(resource);
    setFormVisible(true);
  };

  const handleUpdate = () => {
    setEditingResource(null);
    setFormVisible(false);
  };

  const handleCancel = () => {
    setEditingResource(null);
    setFormVisible(false);
  };

  return isFormVisible ? (
    editingResource ? (
      <EditResourceForm 
        resource={editingResource}
        onCancel={handleCancel}
        onUpdate={handleUpdate}
      />
    ) : (
      <ResourceForm
        onCancel={handleCancel}
        onSave={() => setFormVisible(false)}
      />
    )
  ) : (
    <ResourceTable 
      onAdd={() => setFormVisible(true)}
      onEdit={handleEdit}
    />
  );
};

export default Resource;