import React, { useEffect,useState } from "react";
import axios from "axios";
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
const [engineers, setEngineers] = useState([]);

  useEffect(() => {
    axios.get('http://175.29.21.7:8006/users/')
      .then((response) => {
        const filtered = response.data.filter(user => user.role === 'Service Engineer');
        setEngineers(filtered);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  }, []);

const handleChange = (e) => {
  const { name, value } = e.target;

  // If resourceId is changed, fetch phone and email of selected engineer
  if (name === 'resourceId') {
    const selectedEngineer = engineers.find((eng) => eng.user_id == value);
    setFormData(prev => ({
      ...prev,
      resourceId: value,
      phone: selectedEngineer?.phone || '',
      email: selectedEngineer?.email || '',
      fullName: selectedEngineer?.username || ''
    }));
  } else {
    setFormData(prev => ({ ...prev, [name]: value }));
  }
};


const handleSubmit = async (e) => {
  e.preventDefault();

  // Build payload as per API spec
  const payload = {
    resource_id: formData.resourceId,
    full_name: formData.fullName,
    mobile_no: formData.phone,
    email: formData.email,
    hourly_rate: formData.hourlyRate,
    status: formData.status,
    created_by: "Admin", 
    updated_by: "Admin",  
    user: formData.resourceId  
  };

  try {
    const response = await axios.post("http://175.29.21.7:8006/resources/", payload);
    console.log("Resource saved successfully:", response.data);

    onSave(); 
  } catch (error) {
    console.error("Failed to save resource:", error);
  }
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
                <input type="text" name="resourceId"  placeholder="e.g., 00123" />
              </div>
              <div className="resource-mgmt-group">
               <label>Resource Name (Service Engineer)</label>
              <select
              className="resource-mgmt-input"
                name="resourceId"
                value={formData.resourceId}
                onChange={handleChange}
              >
                <option value="">Select Engineer</option>
                {engineers.map((eng) => (
                  <option key={eng.user_id} value={eng.user_id}>
                    {eng.username}({eng.user_id})

                  </option>
                ))}
              </select>
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
