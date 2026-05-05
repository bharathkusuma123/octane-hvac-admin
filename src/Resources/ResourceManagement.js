// import React, { useState } from "react";
// import ResourceForm from "./ResourceForm";
// import ResourceTable from "./ResourceTable";
// import EditResourceForm from "./EditResourceForm";

// const Resource = () => {
//   const [isFormVisible, setFormVisible] = useState(false);
//   const [editingResource, setEditingResource] = useState(null);

//   const handleEdit = (resource) => {
//     setEditingResource(resource);
//     setFormVisible(true);
//   };

//   const handleUpdate = () => {
//     setEditingResource(null);
//     setFormVisible(false);
//   };

//   const handleCancel = () => {
//     setEditingResource(null);
//     setFormVisible(false);
//   };

//   return isFormVisible ? (
//     editingResource ? (
//       <EditResourceForm 
//         resource={editingResource}
//         onCancel={handleCancel}
//         onUpdate={handleUpdate}
//       />
//     ) : (
//       <ResourceForm
//         onCancel={handleCancel}
//         onSave={() => setFormVisible(false)}
//       />
//     )
//   ) : (
//     <ResourceTable 
//       onAdd={() => setFormVisible(true)}
//       onEdit={handleEdit}
//     />
//   );
// };

// export default Resource;


import React, { useState, useEffect } from "react";
import ResourceForm from "./ResourceForm";
import ResourceTable from "./ResourceTable";
import EditResourceForm from "./EditResourceForm";

const Resource = () => {
  const [isFormVisible, setFormVisible] = useState(false);
  const [editingResource, setEditingResource] = useState(null);

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
          setEditingResource(null);
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