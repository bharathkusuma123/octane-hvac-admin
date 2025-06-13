// import React, { useEffect,useState } from "react";
// import axios from "axios";
// import "./ResourceManagement.css";

// const ResourceForm = ({ onCancel, onSave }) => {
//   const [formData, setFormData] = useState({
//     resourceId: '',
//     fullName: '',
//     phone: '',
//     email: '',
//     status: 'Active',
//     hourlyRate: ''
//   });
// const [engineers, setEngineers] = useState([]);

//   useEffect(() => {
//     axios.get(`${baseURL}/users/')
//       .then((response) => {
//         const filtered = response.data.filter(user => user.role === 'Service Engineer');
//         setEngineers(filtered);
//       })
//       .catch((error) => {
//         console.error("Error fetching users:", error);
//       });
//   }, []);

// const handleChange = (e) => {
//   const { name, value } = e.target;

//   // If resourceId is changed, fetch phone and email of selected engineer
//   if (name === 'resourceId') {
//     const selectedEngineer = engineers.find((eng) => eng.user_id == value);
//     setFormData(prev => ({
//       ...prev,
//       resourceId: value,
//       phone: selectedEngineer?.phone || '',
//       email: selectedEngineer?.email || '',
//       fullName: selectedEngineer?.username || ''
//     }));
//   } else {
//     setFormData(prev => ({ ...prev, [name]: value }));
//   }
// };


// const handleSubmit = async (e) => {
//   e.preventDefault();

//   // Build payload as per API spec
//   const payload = {
//     resource_id: formData.resourceId,
//     full_name: formData.fullName,
//     mobile_no: formData.phone,
//     email: formData.email,
//     hourly_rate: formData.hourlyRate,
//     status: formData.status,
//     created_by: "Admin", 
//     updated_by: "Admin",  
//     user: formData.resourceId  
//   };

//   try {
//     const response = await axios.post(`${baseURL}/resources/`, payload);
//     console.log("Resource saved successfully:", response.data);

//     onSave(); 
//   } catch (error) {
//     console.error("Failed to save resource:", error);
//   }
// };


//   return (
//     <div className="resource-management-container">
//         <h2 className="resource-mgmt-title2">Resource Management</h2>
//         <p className="resource-mgmt-subtitle">Add, view and manage your engineering resources</p>

//         <form className="resource-mgmt-form" onSubmit={handleSubmit}>
//           <div className="resource-mgmt-section">
//             <h3 className="resource-mgmt-heading">Resource Details</h3>
//             <div className="resource-mgmt-row">
//               <div className="resource-mgmt-group">
//                 <label>Resource ID</label>
//                 <input type="text" name="resourceId"  placeholder="e.g., 00123" />
//               </div>
//               <div className="resource-mgmt-group">
//                <label>Resource Name (Service Engineer)</label>
//               <select
//               className="resource-mgmt-input"
//                 name="resourceId"
//                 value={formData.resourceId}
//                 onChange={handleChange}
//               >
//                 <option value="">Select Engineer</option>
//                 {engineers.map((eng) => (
//                   <option key={eng.user_id} value={eng.user_id}>
//                     {eng.username}({eng.user_id})

//                   </option>
//                 ))}
//               </select>
//               </div>
//             </div>
//           </div>

//           <div className="resource-mgmt-section">
//             <h3 className="resource-mgmt-heading">Contact Information</h3>
//             <div className="resource-mgmt-row">
//               <div className="resource-mgmt-group">
//                 <label>Phone</label>
//                 <input type="text" name="phone" value={formData.phone} onChange={handleChange} placeholder="e.g., +91 9876543210" />
//               </div>
//               <div className="resource-mgmt-group">
//                 <label>Email</label>
//                 <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="e.g., engineer@example.com" />
//               </div>
//             </div>
//           </div>

//           <div className="resource-mgmt-section">
//   <h3 className="resource-mgmt-heading">Status & Hourly Rate</h3>
//   <div className="resource-mgmt-row">
//     <div className="resource-mgmt-group">
//       <label>Status</label>
//       <div className="resource-mgmt-status-row">
//         {["Active", "Inactive", "Blocked"].map((s) => (
//           <label key={s}>
//             <input
//               type="radio"
//               name="status"
//               value={s}
//               checked={formData.status === s}
//               onChange={handleChange}
//             />{" "}
//             {s}
//           </label>
//         ))}
//       </div>
//     </div>

//     <div className="resource-mgmt-group">
//       <label>Hourly Rate</label>
//       <input
//         type="number"
//         name="hourlyRate"
//         value={formData.hourlyRate}
//         onChange={handleChange}
//         placeholder="0.00"
//       />
//     </div>
//   </div>
// </div>


//           <div className="resource-mgmt-actions">
//             <button type="button" className="btn btn-outline-secondary" onClick={onCancel}>Cancel</button>
//             <button type="submit" className="btn btn-primary">Save Resource</button>
//           </div>
//         </form>
//     </div>
//   );
// };

// export default ResourceForm;







import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import baseURL from "../ApiUrl/Apiurl";
import { AuthContext } from "../AuthContext/AuthContext";

const ResourceForm = ({ onCancel, onSave }) => {
    const { userId, userRole } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    resourceId: "", // For manual RS1, RS2 etc.
    engineerId: "", // For selected engineer's user_id
    fullName: "",
    phone: "",
    email: "",
    status: "Active",
    hourlyRate: "",
  });

  const [engineers, setEngineers] = useState([]);

  useEffect(() => {
    axios
      .get(`${baseURL}/users/`)
      .then((response) => {
        const filtered = response.data.filter(
          (user) => user.role === "Service Engineer"
        );
        setEngineers(filtered);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "engineerId") {
      const selectedEngineer = engineers.find(
        (eng) => eng.user_id == value
      );
      setFormData((prev) => ({
        ...prev,
        engineerId: value,
        phone: selectedEngineer?.phone || "",
        email: selectedEngineer?.email || "",
        fullName: selectedEngineer?.username || "",
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
     const selectedCompany = localStorage.getItem("selectedCompany");

    // Validate required fields
    if (!formData.resourceId || !selectedCompany) {
      alert("Please select both an engineer and a company");
      return;
    }

    const payload = {
      resource_id: formData.resourceId, // From manual input
      full_name: formData.fullName,
      mobile_no: formData.phone,
      email: formData.email,
      hourly_rate: formData.hourlyRate,
      status: formData.status,
      created_by: "Admin",
      updated_by: "Admin",
      user: formData.engineerId, // From selected engineer's user_id
       user_id: userId,
      company: selectedCompany,
      company_id: selectedCompany
    };

    try {
      const response = await axios.post(
        `${baseURL}/resources/`,
        payload
      );
      console.log("Resource saved successfully:", response.data);
      onSave();
    } catch (error) {
      console.error("Failed to save resource:", error);
    }
  };

  return (
    <div className="container mt-4 service-request-form">
      <div className="card">
        <div className="card-header">
          <h5 className="mb-1">Resource Management</h5>
          <h6 className="text" style={{ color: "white" }}>
            Add, view and manage your engineering resources
          </h6>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="row g-3">
              <div className="col-md-4">
                <label className="form-label">Resource ID</label>
                <input
                  type="text"
                  name="resourceId"
                  value={formData.resourceId}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="e.g., RS1, RS2"
                  required
                />
              </div>

              <div className="col-md-4">
                <label className="form-label">Service Engineer</label>
                <select
                  name="engineerId"
                  className="form-control"
                  value={formData.engineerId}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Engineer</option>
                  {engineers.map((eng) => (
                    <option key={eng.user_id} value={eng.user_id}>
                      {eng.username} ({eng.user_id})
                    </option>
                  ))}
                </select>
              </div>

              {/* <div className="col-md-4">
                <label className="form-label">Full Name</label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="Engineer's full name"
                />
              </div> */}

              <div className="col-md-4">
                <label className="form-label">Phone</label>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="e.g., +91 9876543210"
                />
              </div>

              <div className="col-md-4">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="e.g., engineer@example.com"
                />
              </div>

              <div className="col-md-4">
                <label className="form-label">Status</label>
                <div className="d-flex gap-3">
                  {["Active", "Inactive", "Blocked"].map((s) => (
                    <div key={s} className="form-check form-check-inline">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="status"
                        value={s}
                        checked={formData.status === s}
                        onChange={handleChange}
                      />
                      <label className="form-check-label">{s}</label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="col-md-4">
                <label className="form-label">Hourly Rate</label>
                <input
                  type="number"
                  name="hourlyRate"
                  value={formData.hourlyRate}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="0.00"
                />
              </div>

              <div className="d-flex justify-content-center mt-3 gap-3">
                <button type="submit" className="submit-btn">
                  Save Resource
                </button>
                <button type="button" className="btn btn-secondary" onClick={onCancel}>
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

export default ResourceForm;
