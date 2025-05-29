import React, { useState } from "react";
import "./ResourceManagement.css";

const ResourceForm = ({ onCancel, onSave }) => {
  const [formData, setFormData] = useState({
    resourceId: '',
    fullName: '',
    phone: '',
    email: '',
    status: 'Active',
    hourlyRate: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitted Resource:', formData);
    onSave();
  };

  return (
    <div className="resource-management-container">
        <h2 className="resource-mgmt-title2">Resource Management</h2>
        <p className="resource-mgmt-subtitle">Add, view and manage your engineering resources</p>

        <form className="resource-mgmt-form" onSubmit={handleSubmit}>
          <div className="resource-mgmt-section">
            <h3 className="resource-mgmt-heading">Resource Details</h3>
            <div className="resource-mgmt-row">
              <div className="resource-mgmt-group">
                <label>Resource ID</label>
                <input type="text" name="resourceId" value={formData.resourceId} onChange={handleChange} placeholder="e.g., 00123" />
              </div>
              <div className="resource-mgmt-group">
                <label>Full Name</label>
                <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} placeholder="Enter full name" />
              </div>
            </div>
          </div>

          <div className="resource-mgmt-section">
            <h3 className="resource-mgmt-heading">Contact Information</h3>
            <div className="resource-mgmt-row">
              <div className="resource-mgmt-group">
                <label>Phone</label>
                <input type="text" name="phone" value={formData.phone} onChange={handleChange} placeholder="e.g., +91 9876543210" />
              </div>
              <div className="resource-mgmt-group">
                <label>Email</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="e.g., engineer@example.com" />
              </div>
            </div>
          </div>

          <div className="resource-mgmt-section">
            <h3 className="resource-mgmt-heading">Status & Hourly Rate</h3>
            <div className="resource-mgmt-status-row">
              {["Active", "Inactive", "Blocked"].map((s) => (
                <label key={s}>
                  <input type="radio" name="status" value={s} checked={formData.status === s} onChange={handleChange} /> {s}
                </label>
              ))}
            </div>
            <div className="resource-mgmt-row">
              <div className="resource-mgmt-group">
                <label>Hourly Rate</label>
                <input type="number" name="hourlyRate" value={formData.hourlyRate} onChange={handleChange} placeholder="0.00" />
              </div>
            </div>
          </div>

          <div className="resource-mgmt-actions">
            <button type="button" className="btn btn-outline-secondary" onClick={onCancel}>Cancel</button>
            <button type="submit" className="btn btn-primary">Save Resource</button>
          </div>
        </form>
    </div>
  );
};

export default ResourceForm;
