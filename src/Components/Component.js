// import React, { useState } from "react";
// import ComponentTable from "./ComponentTable";
// import ComponentForm from "./ComponentForm";
// import baseURL from "../ApiUrl/Apiurl";

// const Component = () => {
//   const [isFormVisible, setIsFormVisible] = useState(false);
//   const [editData, setEditData] = useState(null);

//   const fetchComponentById = async (id) => {
//     try {
//       const res = await fetch(`${baseURL}/components/${id}/`);
//       const json = await res.json();
//       return json.data;
//     } catch (err) {
//       console.error("Failed to fetch component:", err);
//     }
//   };

//   const handleAdd = () => {
//     setEditData(null);
//     setIsFormVisible(true);
//   };

//   const handleEdit = async (id) => {
//     const data = await fetchComponentById(id);
//     setEditData(data);
//     setIsFormVisible(true);
//   };

//   const handleDelete = async (id) => {
//     if (window.confirm("Are you sure you want to delete this component?")) {
//       try {
//         const res = await fetch(`${baseURL}/components/${id}/`, {
//           method: "DELETE",
//         });
//         if (res.ok) {
//           alert("Component deleted.");
//           setEditData(null);
//           setIsFormVisible(false);
//         } else {
//           alert("Failed to delete.");
//         }
//       } catch (err) {
//         console.error("Delete error:", err);
//       }
//     }
//   };

//   const handleSave = () => {
//     setIsFormVisible(false);
//     setEditData(null);
//   };

//   return isFormVisible ? (
//     <ComponentForm
//       onCancel={() => setIsFormVisible(false)}
//       onSave={handleSave}
//       initialData={editData}
//     />
//   ) : (
//     <ComponentTable onAdd={handleAdd} onEdit={handleEdit} onDelete={handleDelete} />
//   );
// };

// export default Component;



import React, { useState, useEffect } from "react";
import ComponentTable from "./ComponentTable";
import ComponentForm from "./ComponentForm";
import baseURL from "../ApiUrl/Apiurl";

const Component = () => {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [editData, setEditData] = useState(null);

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
          setIsFormVisible(false);
          setEditData(null);
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

  const fetchComponentById = async (id) => {
    try {
      const res = await fetch(`${baseURL}/components/${id}/`);
      const json = await res.json();
      return json.data;
    } catch (err) {
      console.error("Failed to fetch component:", err);
    }
  };

  const handleAdd = () => {
    setEditData(null);
    setIsFormVisible(true);
  };

  const handleEdit = async (id) => {
    const data = await fetchComponentById(id);
    setEditData(data);
    setIsFormVisible(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this component?")) {
      try {
        const res = await fetch(`${baseURL}/components/${id}/`, {
          method: "DELETE",
        });
        if (res.ok) {
          alert("Component deleted.");
          setEditData(null);
          setIsFormVisible(false);
        } else {
          alert("Failed to delete.");
        }
      } catch (err) {
        console.error("Delete error:", err);
      }
    }
  };

  const handleSave = () => {
    setIsFormVisible(false);
    setEditData(null);
  };

  return isFormVisible ? (
    <ComponentForm
      onCancel={() => setIsFormVisible(false)}
      onSave={handleSave}
      initialData={editData}
    />
  ) : (
    <ComponentTable onAdd={handleAdd} onEdit={handleEdit} onDelete={handleDelete} />
  );
};

export default Component;