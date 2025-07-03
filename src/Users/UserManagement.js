// import React, { useState } from "react";
// import UserForm from "./UserForm";
// import UserTable from "./UserTable";

// const User = () => {
//   const [isFormVisible, setFormVisible] = useState(false);
//   const [editingUser, setEditingUser] = useState(null);

//   const handleAdd = () => {
//     setEditingUser(null);
//     setFormVisible(true);
//   };

//   const handleEdit = (user) => {
//     setEditingUser(user);
//     setFormVisible(true);
//   };

//   const handleSave = () => {
//     setFormVisible(false);
//     setEditingUser(null);
//   };

//   return isFormVisible ? (
//     <UserForm
//       onCancel={() => setFormVisible(false)}
//       onSave={handleSave}
//       initialData={editingUser}
//     />
//   ) : (
//     <UserTable onAdd={handleAdd} onEdit={handleEdit} />
//   );
// };

// export default User;






import React, { useState } from "react";
import UserForm from "./UserForm";
import UserTable from "./UserTable";

const User = () => {
  const [isFormVisible, setFormVisible] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  const handleAdd = () => {
    setEditingUser(null); // Clear any previous edit data
    setFormVisible(true);
  };

  const handleEdit = (user) => {
    setEditingUser(user); // Set the user data to edit
    setFormVisible(true);
  };

  const handleSave = () => {
    setFormVisible(false);
    setEditingUser(null); // Clear edit data after save
  };

  return isFormVisible ? (
    <UserForm
      onCancel={() => setFormVisible(false)}
      onSave={handleSave}
      initialData={editingUser} // Pass the user data to edit
    />
  ) : (
    <UserTable onAdd={handleAdd} onEdit={handleEdit} />
  );
};

export default User;