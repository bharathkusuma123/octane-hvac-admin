// // ComponentForm.js
// import React, { useEffect, useState } from "react";
// import "./Component.css";

// const ComponentForm = ({ onCancel, onSave, initialData = {} }) => {
//   const isEditMode = !!initialData?.component_id;

//   const [formState, setFormState] = useState({
//     component_id: "",
//     component_name: "",
//     component_description: "",
//   });

//   useEffect(() => {
//     // Only set state if valid data is provided
//     if (isEditMode && initialData) {
//       setFormState({
//         component_id: initialData.component_id || "",
//         component_name: initialData.component_name || "",
//         component_description: initialData.component_description || "",
//       });
//     } else {
//       // Clear for Add mode
//       setFormState({
//         component_id: "",
//         component_name: "",
//         component_description: "",
//       });
//     }
//   }, [initialData, isEditMode]);

//   const handleChange = (e) => {
//     const { id, value } = e.target;
//     setFormState((prev) => ({ ...prev, [id]: value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const timestamp = new Date().toISOString();
//     const payload = {
//       ...formState,
//       created_at: isEditMode ? initialData.created_at : timestamp,
//       updated_at: timestamp,
//       created_by: "admin",
//       updated_by: "admin",
//     };

//     const url = isEditMode
//       ? `${baseURL}/${formState.component_id}/`
//       : `${baseURL}/components/`;

//     const method = isEditMode ? "PUT" : "POST";

//     try {
//       const response = await fetch(url, {
//         method,
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(payload),
//       });

//       if (response.ok) {
//         alert(`Component ${isEditMode ? "updated" : "saved"} successfully!`);
//         onSave();
//       } else {
//         alert(`Failed to ${isEditMode ? "update" : "save"} component.`);
//       }
//     } catch (error) {
//       console.error("Error submitting form:", error);
//       alert("An error occurred while submitting the form.");
//     }
//   };

//   return (
//     <div className="container my-4">
//       <div className="comp-wrapper p-4">
//         <div className="comp-header mb-4">
//           <h2 className="comp-title">
//             {isEditMode ? "Edit Component" : "Add Component"}
//           </h2>
//           <p className="comp-subtitle">
//             {isEditMode
//               ? "Update the component details below"
//               : "Fill in the component details below"}
//           </p>
//         </div>

//         <form className="comp-form" onSubmit={handleSubmit}>
//           <div className="row g-3 mb-3">
//             <div className="col-md-6">
//               <label htmlFor="component_id" className="form-label comp-label">
//                 Component ID
//               </label>
//               <input
//                 type="text"
//                 id="component_id"
//                 className="form-control comp-input"
//                 placeholder="Enter component ID"
//                 value={formState.component_id}
//                 onChange={handleChange}
//                 readOnly={isEditMode}
//                 required
//               />
//             </div>
//             <div className="col-md-6">
//               <label htmlFor="component_name" className="form-label comp-label">
//                 Component Name
//               </label>
//               <input
//                 type="text"
//                 id="component_name"
//                 className="form-control comp-input"
//                 placeholder="Enter component name"
//                 value={formState.component_name}
//                 onChange={handleChange}
//                 required
//               />
//             </div>
//           </div>

//           <div className="mb-3">
//             <label htmlFor="component_description" className="form-label comp-label">
//               Component Description
//             </label>
//             <textarea
//               id="component_description"
//               className="form-control comp-textarea"
//               placeholder="Add any notes or description..."
//               rows="4"
//               value={formState.component_description}
//               onChange={handleChange}
//             />
//           </div>

//           <div className="d-flex justify-content-end gap-2 flex-wrap">
//             <button
//               type="button"
//               className="btn btn-outline-secondary comp-btn-cancel"
//               onClick={onCancel}
//             >
//               Cancel
//             </button>
//             <button type="submit" className="btn btn-primary comp-btn-save">
//               {isEditMode ? "Update Component" : "Save Component"}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default ComponentForm;










import React, { useEffect, useState } from "react";
import "./Component.css";
import baseURL from "../ApiUrl/Apiurl";

const ComponentForm = ({ onCancel, onSave, initialData = {} }) => {
  const isEditMode = !!initialData?.component_id;

  const [formState, setFormState] = useState({
    component_id: "",
    component_name: "",
    component_description: "",
  });

  useEffect(() => {
    if (isEditMode && initialData) {
      setFormState({
        component_id: initialData.component_id || "",
        component_name: initialData.component_name || "",
        component_description: initialData.component_description || "",
      });
    } else {
      setFormState({
        component_id: "",
        component_name: "",
        component_description: "",
      });
    }
  }, [initialData, isEditMode]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormState((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const timestamp = new Date().toISOString();
    const payload = {
      ...formState,
      created_at: isEditMode ? initialData.created_at : timestamp,
      updated_at: timestamp,
      created_by: "admin",
      updated_by: "admin",
    };

    const url = isEditMode
      ? `${baseURL}/components/${formState.component_id}/`
      : `${baseURL}/components/`;

    const method = isEditMode ? "PUT" : "POST";

    try {
      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        alert(`Component ${isEditMode ? "updated" : "saved"} successfully!`);
        onSave();
      } else {
        alert(`Failed to ${isEditMode ? "update" : "save"} component.`);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("An error occurred while submitting the form.");
    }
  };

  return (
    <div className="container mt-4 service-request-form">
      <div className="card">
        <div className="card-header">
          <h5 className="mb-1">{isEditMode ? "Edit Component" : "Add Component"}</h5>
          <h6 className="text" style={{ color: "white" }}>
            Fill in component details below
          </h6>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="row g-3">
              <div className="col-md-4">
                <label className="form-label">Component ID</label>
                <input
                  type="text"
                  id="component_id"
                  className="form-control"
                  placeholder="Enter Component ID"
                  value={formState.component_id}
                  onChange={handleChange}
                  readOnly={isEditMode}
                  required
                />
              </div>

              <div className="col-md-4">
                <label className="form-label">Component Name</label>
                <input
                  type="text"
                  id="component_name"
                  className="form-control"
                  placeholder="Enter Component Name"
                  value={formState.component_name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-md-4">
                <label className="form-label">Component Description</label>
                <input
                  type="text"
                  id="component_description"
                  className="form-control"
                  placeholder="Enter Description"
                  value={formState.component_description}
                  onChange={handleChange}
                />
              </div>

              <div className="d-flex justify-content-center mt-3 gap-3">
                <button type="submit" className="submit-btn">
                  Submit
                </button>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={onCancel}
                >
                  Cancel
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ComponentForm;

