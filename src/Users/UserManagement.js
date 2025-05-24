import React, { useState } from "react";
import UserForm from "./UserForm";
import UserTable from "./UserTable";

const User = () => {
  const [isFormVisible, setFormVisible] = useState(false);

  return isFormVisible ? (
    <UserForm
      onCancel={() => setFormVisible(false)}
      onSave={() => setFormVisible(false)}
    />
  ) : (
    <UserTable onAdd={() => setFormVisible(true)} />
  );
};

export default User;
