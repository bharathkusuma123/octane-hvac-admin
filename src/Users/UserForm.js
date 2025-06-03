import React, { useState } from "react";
import "./UserManagement.css";

const SECURITY_QUESTION_CHOICES = [
  "What is your mother's maiden name?",
  "What was the name of your first pet?",
  "What was your first car?",
  "What is the name of the town where you were born?",
  "What was your childhood nickname?",
];

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
    // hourly_rate: "",
    // security_question1: "",
    // answer1: "",
    // security_question2: "",
    // answer2: "",
    remarks: "",
    created_by: "admin",
    updated_by: "admin",
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
      const response = await fetch('http://175.29.21.7:8006/users/');
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
      created_by: formData.created_by || "admin",
      updated_by: formData.updated_by || "admin",
    };

    console.log("Sending payload", payload);

    try {
      const response = await fetch("http://175.29.21.7:8006/users/", {
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
    <div className="user-management-container">
      <h2 className="user-management-title">User Management</h2>
      <p className="user-management-subtitle">
        Add, view and manage user accounts
      </p>

      <form className="user-management-form" onSubmit={handleSubmit}>
        {/* Basic Information */}
        <section className="user-management-section">
          <h3>Basic Information</h3>
          <div className="user-management-row">
            <div className="form-group">
              <label >Username</label>
              <input
                type="text"
                id="username"
                name="username"
                placeholder="Enter username"
                className="user-management-input"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label >Full Name</label>
              <input
                type="text"
                id="full_name"
                name="full_name"
                placeholder="Enter full name"
                className="user-management-input"
                value={formData.full_name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label >Email</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="user@example.com"
                className="user-management-input"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label >Role</label>
              <select
                id="role"
                name="role"
                className="user-management-input"
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
        </section>

        {/* Contact Information */}
        <section className="user-management-section">
          <h3>Contact Information</h3>
          <div className="user-management-row">
            <div className="form-group">
              <label>Mobile</label>
              <input
                type="text"
                id="mobile"
                name="mobile"
                placeholder="+1 123-456-7890"
                className="user-management-input"
                value={formData.mobile}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label >Telephone</label>
              <input
                type="text"
                id="telephone"
                name="telephone"
                placeholder="Telephone"
                className="user-management-input"
                value={formData.telephone}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label >City</label>
              <input
                type="text"
                id="city"
                name="city"
                placeholder="City"
                className="user-management-input"
                value={formData.city}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label >Country Code</label>
              <input
                type="text"
                id="country_code"
                name="country_code"
                placeholder="+966"
                className="user-management-input"
                value={formData.country_code}
                onChange={handleChange}
              />
            </div>
          </div>
        </section>

        {/* Address */}
        <section className="user-management-section">
          <h3>Address</h3>
          <div className="form-group">
            <label >Complete Postal Address</label>
            <textarea
              id="address"
              name="address"
              className="user-management-textarea"
              placeholder="Enter complete postal address"
              value={formData.address}
              onChange={handleChange}
            />
          </div>
        </section>

        {/* Account Settings */}
        <section className="user-management-section">
          <h3>Account Settings</h3>
          <div className="user-management-row">
            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                id="current_password"
                name="current_password"
                placeholder="Enter password"
                className="user-management-input"
                value={formData.current_password}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label >Confirm Password</label>
              <input
                type="password"
                id="last_password"
                name="last_password"
                placeholder="Confirm password"
                className="user-management-input"
                value={formData.last_password}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Status</label>
              <div className="user-management-status">
                <label>
                  <input
                    type="radio"
                    name="status"
                    value="Active"
                    checked={formData.status === "Active"}
                    onChange={handleStatusChange}
                  />{" "}
                  Active
                </label>
                <label>
                  <input
                    type="radio"
                    name="status"
                    value="Inactive"
                    checked={formData.status === "Inactive"}
                    onChange={handleStatusChange}
                  />{" "}
                  Inactive
                </label>
                <label>
                  <input
                    type="radio"
                    name="status"
                    value="Blocked"
                    checked={formData.status === "Blocked"}
                    onChange={handleStatusChange}
                  />{" "}
                  Blocked
                </label>
              </div>
            </div>
            {/* <div className="form-group">
              <label >Hourly Rate</label>
              <input
                type="number"
                step="0.01"
                id="hourly_rate"
                name="hourly_rate"
                placeholder="0.00"
                className="user-management-input"
                value={formData.hourly_rate}
                onChange={handleChange}
              />
            </div> */}
          </div>
        </section>

        {/* Security Questions */}
        {/* <section className="user-management-section">
          <h3>Security Questions</h3>
          <div className="user-management-row">
            <div className="form-group">
              <label>Security Question 1</label>
              <select
                id="security_question1"
                name="security_question1"
                className="user-management-input"
                value={formData.security_question1}
                onChange={handleChange}
              >
                <option value="">Select a security question</option>
                {SECURITY_QUESTION_CHOICES.map((q, i) => (
                  <option key={i} value={q}>
                    {q}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label >Answer 1</label>
              <input
                type="text"
                id="answer1"
                name="answer1"
                placeholder="Answer"
                className="user-management-input"
                value={formData.answer1}
                onChange={handleChange}
              
              />
            </div>
            <div className="form-group">
              <label >Security Question 2</label>
              <select
                id="security_question2"
                name="security_question2"
                className="user-management-input"
                value={formData.security_question2}
                onChange={handleChange}
                required
              >
                <option value="">Select a security question</option>
                {SECURITY_QUESTION_CHOICES.map((q, i) => (
                  <option key={i} value={q}>
                    {q}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label >Answer 2</label>
              <input
                type="text"
                id="answer2"
                name="answer2"
                placeholder="Answer"
                className="user-management-input"
                value={formData.answer2}
                onChange={handleChange}
              />
            </div>
          </div>
        </section> */}

        {/* Additional Notes */}
        <section className="user-management-section">
          <h3>Additional Notes</h3>
          <div className="form-group">
            <label >Remarks</label>
            <textarea
              id="remarks"
              name="remarks"
              className="user-management-textarea"
              placeholder="Optional remarks or notes"
              value={formData.remarks}
              onChange={handleChange}
            />
          </div>
        </section>

        {/* Buttons */}
        <div className="user-management-buttons">
          <button
            type="button"
            className="btn btn-outline-secondary user-management-cancel-btn"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="btn btn-primary user-management-save-btn"
          >
            Save User
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserForm;