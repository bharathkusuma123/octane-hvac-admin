import React from "react";
import "./UserManagement.css";

const UserForm = ({ onCancel, onSave }) => {
  return (
    <div className="user-management-container">
      <h2 className="user-management-title">User Management</h2>
      <p className="user-management-subtitle">Add, view and manage user accounts</p>

      <form className="user-management-form" onSubmit={(e) => { e.preventDefault(); onSave(); }}>
        {/* Basic Information */}
        <section className="user-management-section">
          <h3>Basic Information</h3>
          <div className="user-management-row">
            <input type="text" placeholder="Enter username" className="user-management-input" />
            <input type="text" placeholder="Enter full name" className="user-management-input" />
            <input type="email" placeholder="user@example.com" className="user-management-input" />
            <select className="user-management-input">
              <option>Select role</option>
              <option>Super Admin</option>
              <option>Admin</option>
              <option>Service Manager</option>
              <option>Service Engineer</option>
              <option>Customer</option>
            </select>
          </div>
        </section>

        {/* Contact Information */}
        <section className="user-management-section">
          <h3>Contact Information</h3>
          <div className="user-management-row">
            <input type="text" placeholder="Mobile (e.g., +1 123-456-7890)" className="user-management-input" />
            <input type="text" placeholder="Telephone" className="user-management-input" />
            <input type="text" placeholder="City" className="user-management-input" />
            <input type="text" placeholder="Country Code (e.g., +966)" className="user-management-input" />
          </div>
        </section>

        {/* Address */}
        <section className="user-management-section">
          <h3>Address</h3>
          <textarea className="user-management-textarea" placeholder="Enter complete postal address" />
        </section>

        {/* Account Settings */}
        <section className="user-management-section">
          <h3>Account Settings</h3>
          <div className="user-management-row">
            <input type="password" placeholder="Enter password" className="user-management-input" />
            <input type="password" placeholder="Confirm password" className="user-management-input" />
            <div className="user-management-status">
              <label><input type="radio" name="status" defaultChecked /> Active</label>
              <label><input type="radio" name="status" /> Inactive</label>
              <label><input type="radio" name="status" /> Blocked</label>
            </div>
            <input type="number" placeholder="Hourly Rate (e.g., 0.00)" className="user-management-input" />
          </div>
        </section>

        {/* Security Questions */}
        <section className="user-management-section">
          <h3>Security Questions</h3>
          <div className="user-management-row">
            <select className="user-management-input">
              <option>Select a security question</option>
            </select>
            <input type="text" placeholder="Answer" className="user-management-input" />
            <select className="user-management-input">
              <option>Select a security question</option>
            </select>
            <input type="text" placeholder="Answer" className="user-management-input" />
          </div>
        </section>

        {/* Additional Notes */}
        <section className="user-management-section">
          <h3>Additional Notes</h3>
          <textarea className="user-management-textarea" placeholder="Optional remarks or notes" />
        </section>

        {/* Buttons */}
        <div className="user-management-buttons">
          <button type="button" className="btn btn-outline-secondary user-management-cancel-btn" onClick={onCancel}>Cancel</button>
          <button type="submit" className="btn btn-primary user-management-save-btn">Save User</button>
        </div>
      </form>
    </div>
  );
};

export default UserForm;
