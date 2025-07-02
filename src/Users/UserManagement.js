import React, { useState } from "react";
import UserForm from "./UserForm";
import UserTable from "./UserTable";

const User = () => {
  const [isFormVisible, setFormVisible] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  const handleAdd = () => {
    setEditingUser(null);
    setFormVisible(true);
  };

  const handleEdit = (user) => {
    setEditingUser(user);
    setFormVisible(true);
  };

  const handleSave = () => {
    setFormVisible(false);
    setEditingUser(null);
  };

  return isFormVisible ? (
    <UserForm
      onCancel={() => setFormVisible(false)}
      onSave={handleSave}
      initialData={editingUser}
    />
  ) : (
    <UserTable onAdd={handleAdd} onEdit={handleEdit} />
  );
};

export default User;
