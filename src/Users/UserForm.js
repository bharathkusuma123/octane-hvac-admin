// import React, { useState } from "react";
// import "./UserManagement.css";

// const SECURITY_QUESTION_CHOICES = [
//   "What is your mother's maiden name?",
//   "What was the name of your first pet?",
//   "What was your first car?",
//   "What is the name of the town where you were born?",
//   "What was your childhood nickname?",
// ];

// const UserForm = ({ onCancel, onSave }) => {
//   const [formData, setFormData] = useState({
//     username: "",
//     full_name: "",
//     email: "",
//     role: "",
//     mobile: "",
//     telephone: "",
//     city: "",
//     country_code: "",
//     address: "",
//     current_password: "",
//     last_password: "",
//     status: "Active",
//     // hourly_rate: "",
//     // security_question1: "",
//     // answer1: "",
//     // security_question2: "",
//     // answer2: "",
//     remarks: "",
//     created_by: "admin",
//     updated_by: "admin",
//   });

//   const handleChange = (e) => {
//     const { name, value, type } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: type === "number" ? value.trim() : value,
//     }));
//   };

//   const handleStatusChange = (e) => {
//     setFormData((prev) => ({ ...prev, status: e.target.value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const generateUserId = async () => {
//       const response = await fetch(`${baseURL}/users/`);
//       const users = await response.json();

//       const userIds = users.map(u => u.user_id).filter(id => /^USRID\d+$/.test(id));
//       const numbers = userIds.map(id => parseInt(id.replace('USRID', ''), 10));
//       const max = Math.max(...numbers, 0);
//       const newId = `USRID${(max + 1).toString().padStart(4, '0')}`;

//       return newId;
//     };

//     const user_id = await generateUserId();

//     const safeTrim = (val) => (val && typeof val === "string" ? val.trim() : "");

//     const payload = {
//       user_id,
//       username: safeTrim(formData.username) || null,
//       full_name: safeTrim(formData.full_name) || null,
//       email: safeTrim(formData.email) || null,
//       role: formData.role || null,
//       mobile: safeTrim(formData.mobile) || null,
//       telephone: safeTrim(formData.telephone) || null,
//       city: safeTrim(formData.city) || null,
//       country_code: safeTrim(formData.country_code) || null,
//       address: safeTrim(formData.address) || null,
//       last_password: formData.last_password || null,
//       password: formData.current_password || null,
//       status: formData.status || "Active",
//       // hourly_rate: formData.hourly_rate ? parseFloat(formData.hourly_rate) : 0,
//       // security_question1: formData.security_question1 || null,
//       // answer1: safeTrim(formData.answer1) || null,
//       // security_question2: formData.security_question2 || null,
//       // answer2: safeTrim(formData.answer2) || null,
//       remarks: safeTrim(formData.remarks) || null,
//       created_by: formData.created_by || "admin",
//       updated_by: formData.updated_by || "admin",
//     };

//     console.log("Sending payload", payload);

//     try {
//       const response = await fetch(`${baseURL}/users/`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(payload),
//       });

//       if (!response.ok) {
//         const errorData = await response.json();
//         alert(`Failed: ${response.status} - ${JSON.stringify(errorData)}`);
//         return;
//       }

//       alert("User saved successfully!");
//       onSave();
//     } catch (error) {
//       alert("Error while saving user: " + error.message);
//     }
//   };

//   return (
//     <div className="user-management-container">
//       <h2 className="user-management-title">User Management</h2>
//       <p className="user-management-subtitle">
//         Add, view and manage user accounts
//       </p>

//       <form className="user-management-form" onSubmit={handleSubmit}>
//         {/* Basic Information */}
//         <section className="user-management-section">
//           <h3>Basic Information</h3>
//           <div className="user-management-row">
//             <div className="form-group">
//               <label >Username</label>
//               <input
//                 type="text"
//                 id="username"
//                 name="username"
//                 placeholder="Enter username"
//                 className="user-management-input"
//                 value={formData.username}
//                 onChange={handleChange}
//                 required
//               />
//             </div>
//             <div className="form-group">
//               <label >Full Name</label>
//               <input
//                 type="text"
//                 id="full_name"
//                 name="full_name"
//                 placeholder="Enter full name"
//                 className="user-management-input"
//                 value={formData.full_name}
//                 onChange={handleChange}
//                 required
//               />
//             </div>
//             <div className="form-group">
//               <label >Email</label>
//               <input
//                 type="email"
//                 id="email"
//                 name="email"
//                 placeholder="user@example.com"
//                 className="user-management-input"
//                 value={formData.email}
//                 onChange={handleChange}
//                 required
//               />
//             </div>
//             <div className="form-group">
//               <label >Role</label>
//               <select
//                 id="role"
//                 name="role"
//                 className="user-management-input"
//                 value={formData.role}
//                 onChange={handleChange}
//                 required
//               >
//                 <option value="">Select role</option>
//                 <option>Service Manager</option>
//                 <option>Service Engineer</option>
//               </select>
//             </div>
//           </div>
//         </section>

//         {/* Contact Information */}
//         <section className="user-management-section">
//           <h3>Contact Information</h3>
//           <div className="user-management-row">
//             <div className="form-group">
//               <label>Mobile</label>
//               <input
//                 type="text"
//                 id="mobile"
//                 name="mobile"
//                 placeholder="+1 123-456-7890"
//                 className="user-management-input"
//                 value={formData.mobile}
//                 onChange={handleChange}
//               />
//             </div>
//             <div className="form-group">
//               <label >Telephone</label>
//               <input
//                 type="text"
//                 id="telephone"
//                 name="telephone"
//                 placeholder="Telephone"
//                 className="user-management-input"
//                 value={formData.telephone}
//                 onChange={handleChange}
//               />
//             </div>
//             <div className="form-group">
//               <label >City</label>
//               <input
//                 type="text"
//                 id="city"
//                 name="city"
//                 placeholder="City"
//                 className="user-management-input"
//                 value={formData.city}
//                 onChange={handleChange}
//               />
//             </div>
//             <div className="form-group">
//               <label >Country Code</label>
//               <input
//                 type="text"
//                 id="country_code"
//                 name="country_code"
//                 placeholder="+966"
//                 className="user-management-input"
//                 value={formData.country_code}
//                 onChange={handleChange}
//               />
//             </div>
//           </div>
//         </section>

//         {/* Address */}
//         <section className="user-management-section">
//           <h3>Address</h3>
//           <div className="form-group">
//             <label >Complete Postal Address</label>
//             <textarea
//               id="address"
//               name="address"
//               className="user-management-textarea"
//               placeholder="Enter complete postal address"
//               value={formData.address}
//               onChange={handleChange}
//             />
//           </div>
//         </section>

//         {/* Account Settings */}
//         <section className="user-management-section">
//           <h3>Account Settings</h3>
//           <div className="user-management-row">
//             <div className="form-group">
//               <label>Password</label>
//               <input
//                 type="password"
//                 id="current_password"
//                 name="current_password"
//                 placeholder="Enter password"
//                 className="user-management-input"
//                 value={formData.current_password}
//                 onChange={handleChange}
//                 required
//               />
//             </div>
//             <div className="form-group">
//               <label >Confirm Password</label>
//               <input
//                 type="password"
//                 id="last_password"
//                 name="last_password"
//                 placeholder="Confirm password"
//                 className="user-management-input"
//                 value={formData.last_password}
//                 onChange={handleChange}
//                 required
//               />
//             </div>
//             <div className="form-group">
//               <label>Status</label>
//               <div className="user-management-status">
//                 <label>
//                   <input
//                     type="radio"
//                     name="status"
//                     value="Active"
//                     checked={formData.status === "Active"}
//                     onChange={handleStatusChange}
//                   />{" "}
//                   Active
//                 </label>
//                 <label>
//                   <input
//                     type="radio"
//                     name="status"
//                     value="Inactive"
//                     checked={formData.status === "Inactive"}
//                     onChange={handleStatusChange}
//                   />{" "}
//                   Inactive
//                 </label>
//                 <label>
//                   <input
//                     type="radio"
//                     name="status"
//                     value="Blocked"
//                     checked={formData.status === "Blocked"}
//                     onChange={handleStatusChange}
//                   />{" "}
//                   Blocked
//                 </label>
//               </div>
//             </div>
//             {/* <div className="form-group">
//               <label >Hourly Rate</label>
//               <input
//                 type="number"
//                 step="0.01"
//                 id="hourly_rate"
//                 name="hourly_rate"
//                 placeholder="0.00"
//                 className="user-management-input"
//                 value={formData.hourly_rate}
//                 onChange={handleChange}
//               />
//             </div> */}
//           </div>
//         </section>

//         {/* Security Questions */}
//         {/* <section className="user-management-section">
//           <h3>Security Questions</h3>
//           <div className="user-management-row">
//             <div className="form-group">
//               <label>Security Question 1</label>
//               <select
//                 id="security_question1"
//                 name="security_question1"
//                 className="user-management-input"
//                 value={formData.security_question1}
//                 onChange={handleChange}
//               >
//                 <option value="">Select a security question</option>
//                 {SECURITY_QUESTION_CHOICES.map((q, i) => (
//                   <option key={i} value={q}>
//                     {q}
//                   </option>
//                 ))}
//               </select>
//             </div>
//             <div className="form-group">
//               <label >Answer 1</label>
//               <input
//                 type="text"
//                 id="answer1"
//                 name="answer1"
//                 placeholder="Answer"
//                 className="user-management-input"
//                 value={formData.answer1}
//                 onChange={handleChange}
              
//               />
//             </div>
//             <div className="form-group">
//               <label >Security Question 2</label>
//               <select
//                 id="security_question2"
//                 name="security_question2"
//                 className="user-management-input"
//                 value={formData.security_question2}
//                 onChange={handleChange}
//                 required
//               >
//                 <option value="">Select a security question</option>
//                 {SECURITY_QUESTION_CHOICES.map((q, i) => (
//                   <option key={i} value={q}>
//                     {q}
//                   </option>
//                 ))}
//               </select>
//             </div>
//             <div className="form-group">
//               <label >Answer 2</label>
//               <input
//                 type="text"
//                 id="answer2"
//                 name="answer2"
//                 placeholder="Answer"
//                 className="user-management-input"
//                 value={formData.answer2}
//                 onChange={handleChange}
//               />
//             </div>
//           </div>
//         </section> */}

//         {/* Additional Notes */}
//         <section className="user-management-section">
//           <h3>Additional Notes</h3>
//           <div className="form-group">
//             <label >Remarks</label>
//             <textarea
//               id="remarks"
//               name="remarks"
//               className="user-management-textarea"
//               placeholder="Optional remarks or notes"
//               value={formData.remarks}
//               onChange={handleChange}
//             />
//           </div>
//         </section>

//         {/* Buttons */}
//         <div className="user-management-buttons">
//           <button
//             type="button"
//             className="btn btn-outline-secondary user-management-cancel-btn"
//             onClick={onCancel}
//           >
//             Cancel
//           </button>
//           <button
//             type="submit"
//             className="btn btn-primary user-management-save-btn"
//           >
//             Save User
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default UserForm;


















import React, { useState } from "react";
import axios from "axios";
import baseURL from "../ApiUrl/Apiurl";

const UserForm = ({ onCancel, onSave }) => {
  const [formData, setFormData] = useState({
    username: "",
    full_name: "",
    email: "",
    role: "",
    mobile: "",
    telephone: "",
    city: "",
    country_code: "",
    address: "",
    current_password: "",
    last_password: "",
    status: "Active",
    remarks: "",
    created_by: "Admin",
    updated_by: "Admin",
  });

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "number" ? value.trim() : value,
    }));
  };

  const handleStatusChange = (e) => {
    setFormData((prev) => ({ ...prev, status: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const generateUserId = async () => {
      const response = await fetch(`${baseURL}/users/`);
      const users = await response.json();

      const userIds = users.map(u => u.user_id).filter(id => /^USRID\d+$/.test(id));
      const numbers = userIds.map(id => parseInt(id.replace('USRID', ''), 10));
      const max = Math.max(...numbers, 0);
      const newId = `USRID${(max + 1).toString().padStart(4, '0')}`;

      return newId;
    };

    const user_id = await generateUserId();

    const safeTrim = (val) => (val && typeof val === "string" ? val.trim() : "");

    const payload = {
      user_id,
      username: safeTrim(formData.username) || null,
      full_name: safeTrim(formData.full_name) || null,
      email: safeTrim(formData.email) || null,
      role: formData.role || null,
      mobile: safeTrim(formData.mobile) || null,
      telephone: safeTrim(formData.telephone) || null,
      city: safeTrim(formData.city) || null,
      country_code: safeTrim(formData.country_code) || null,
      address: safeTrim(formData.address) || null,
      last_password: formData.last_password || null,
      password: formData.current_password || null,
      status: formData.status || "Active",
      // hourly_rate: formData.hourly_rate ? parseFloat(formData.hourly_rate) : 0,
      // security_question1: formData.security_question1 || null,
      // answer1: safeTrim(formData.answer1) || null,
      // security_question2: formData.security_question2 || null,
      // answer2: safeTrim(formData.answer2) || null,
      remarks: safeTrim(formData.remarks) || null,
      created_by: formData.created_by || "Admin",
      updated_by: formData.updated_by || "Admin",
    };

    console.log("Sending payload", payload);

    try {
      const response = await fetch(`${baseURL}/users/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        alert(`Failed: ${response.status} - ${JSON.stringify(errorData)}`);
        return;
      }

      alert("User saved successfully!");
      onSave();
    } catch (error) {
      alert("Error while saving user: " + error.message);
    }
  };

  return (
    <div className="container mt-4 service-request-form">
      <div className="card">
        <div className="card-header">
          <h5 className="mb-1">User Management</h5>
          <h6 className="text" style={{ color: "white" }}>
            Add, view and manage user accounts
          </h6>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            {/* Basic Information */}
            <div className="row g-3 mb-4">
              <h5>Basic Information</h5>
              <div className="col-md-4">
                <label className="form-label">Username</label>
                <input
                  type="text"
                  name="username"
                  className="form-control"
                  placeholder="Enter username"
                  value={formData.username}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="col-md-4">
                <label className="form-label">Full Name</label>
                <input
                  type="text"
                  name="full_name"
                  className="form-control"
                  placeholder="Enter full name"
                  value={formData.full_name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="col-md-4">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  placeholder="user@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="col-md-6">
                <label className="form-label">Role</label>
                <select
                  name="role"
                  className="form-control"
                  value={formData.role}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select role</option>
                  <option>Service Manager</option>
                  <option>Service Engineer</option>
                </select>
              </div>
            </div>

            {/* Contact Information */}
            <div className="row g-3 mb-4">
              <h5>Contact Information</h5>
              <div className="col-md-4">
                <label className="form-label">Mobile</label>
                <input
                  type="text"
                  name="mobile"
                  className="form-control"
                  placeholder="+1 123-456-7890"
                  value={formData.mobile}
                  onChange={handleChange}
                />
              </div>
              <div className="col-md-4">
                <label className="form-label">Telephone</label>
                <input
                  type="text"
                  name="telephone"
                  className="form-control"
                  placeholder="Telephone"
                  value={formData.telephone}
                  onChange={handleChange}
                />
              </div>
              <div className="col-md-4">
                <label className="form-label">City</label>
                <input
                  type="text"
                  name="city"
                  className="form-control"
                  placeholder="City"
                  value={formData.city}
                  onChange={handleChange}
                />
              </div>
              <div className="col-md-6">
                <label className="form-label">Country Code</label>
                <input
                  type="text"
                  name="country_code"
                  className="form-control"
                  placeholder="+966"
                  value={formData.country_code}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Address */}
            <div className="row g-3 mb-4">
              <h5>Address</h5>
              <div className="col-12">
                <label className="form-label">Complete Postal Address</label>
                <textarea
                  name="address"
                  className="form-control"
                  placeholder="Enter complete postal address"
                  value={formData.address}
                  onChange={handleChange}
                  rows="3"
                />
              </div>
            </div>

            {/* Account Settings */}
            <div className="row g-3 mb-4">
              <h5>Account Settings</h5>
              <div className="col-md-4">
                <label className="form-label">Password</label>
                <input
                  type="password"
                  name="current_password"
                  className="form-control"
                  placeholder="Enter password"
                  value={formData.current_password}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="col-md-4">
                <label className="form-label">Confirm Password</label>
                <input
                  type="password"
                  name="last_password"
                  className="form-control"
                  placeholder="Confirm password"
                  value={formData.last_password}
                  onChange={handleChange}
                  required
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
                        onChange={handleStatusChange}
                      />
                      <label className="form-check-label">{s}</label>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Additional Notes */}
            <div className="row g-3 mb-4">
              <h5>Additional Notes</h5>
              <div className="col-12">
                <label className="form-label">Remarks</label>
                <textarea
                  name="remarks"
                  className="form-control"
                  placeholder="Optional remarks or notes"
                  value={formData.remarks}
                  onChange={handleChange}
                  rows="3"
                />
              </div>
            </div>

            {/* Buttons */}
            <div className="d-flex justify-content-center mt-3 gap-3">
              <button type="submit" className="submit-btn">
                Save User
              </button>
              <button type="button" className="btn btn-secondary" onClick={onCancel}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserForm;