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






// import React, { useState } from "react";
// import UserForm from "./UserForm";
// import UserTable from "./UserTable";

// const User = () => {
//   const [isFormVisible, setFormVisible] = useState(false);
//   const [editingUser, setEditingUser] = useState(null);

//   const handleAdd = () => {
//     setEditingUser(null); // Clear any previous edit data
//     setFormVisible(true);
//   };

//   const handleEdit = (user) => {
//     setEditingUser(user); // Set the user data to edit
//     setFormVisible(true);
//   };

//   const handleSave = () => {
//     setFormVisible(false);
//     setEditingUser(null); // Clear edit data after save
//   };

//   return isFormVisible ? (
//     <UserForm
//       onCancel={() => setFormVisible(false)}
//       onSave={handleSave}
//       initialData={editingUser} // Pass the user data to edit
//     />
//   ) : (
//     <UserTable onAdd={handleAdd} onEdit={handleEdit} />
//   );
// };

// export default User;


import React, { useState, useEffect } from "react";
import UserForm from "./UserForm";
import UserTable from "./UserTable";

const User = () => {
  const [isFormVisible, setFormVisible] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  // Handle browser back button and swipe gesture when form is open
  useEffect(() => {
    if (isFormVisible) {
      // Push a new history state to trap the back button
      window.history.pushState({ formOpen: true }, '', window.location.pathname);
      
      const handlePopState = (event) => {
        if (isFormVisible) {
          // Prevent default back navigation
          event.preventDefault();
          // Close the form instead of navigating away
          setFormVisible(false);
          setEditingUser(null);
          // Push a new state to handle any further back attempts
          window.history.pushState({ formOpen: true }, '', window.location.pathname);
        }
      };
      
      window.addEventListener('popstate', handlePopState);
      
      // Cleanup event listener when form closes
      return () => {
        window.removeEventListener('popstate', handlePopState);
      };
    }
  }, [isFormVisible]);

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