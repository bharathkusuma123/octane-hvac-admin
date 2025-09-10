import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import baseURL from "../ApiUrl/Apiurl";
import { AuthContext } from "../AuthContext/AuthContext";
import Swal from "sweetalert2";

const ResourceForm = ({ onCancel, onSave }) => {
  const { userId, userRole } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    resourceId: "",
    engineerId: "",
    fullName: "",
    mobile_no: "",
    email: "",
    status: "Active",
    hourlyRate: "",
  });

  const [engineers, setEngineers] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchEngineers = async () => {
      try {
        const response = await axios.get(`${baseURL}/users/`);
        const filtered = response.data.filter(
          (user) => user.role === "Service Engineer"
        );
        setEngineers(filtered);
      } catch (error) {
        console.error("Error fetching users:", error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to load engineers list",
          confirmButtonColor: "#d33",
        });
      }
    };
    fetchEngineers();
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
        mobile_no: selectedEngineer?.mobile || "",
        email: selectedEngineer?.email || "",
        fullName: selectedEngineer?.username || "",
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const selectedCompany = localStorage.getItem("selectedCompany");

    if (!formData.resourceId || !selectedCompany) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Please select both an engineer and a company",
        confirmButtonColor: "#d33",
      });
      setIsSubmitting(false);
      return;
    }

    const payload = {
      resource_id: formData.resourceId,
      full_name: formData.fullName,
      mobile_no: formData.mobile_no,
      email: formData.email,
      hourly_rate: formData.hourlyRate,
      status: formData.status,
      created_by: userId,
      updated_by: userId,
      user: formData.engineerId,
      user_id: userId,
      company: selectedCompany,
      company_id: selectedCompany
    };
    console.log("Submitting payload:", JSON.stringify(payload, null, 2));

    try {
      const response = await axios.post(
        `${baseURL}/resources/`,
        payload
      );
      
      Swal.fire({
        icon: "success",
        title: "Success!",
        text: "Resource saved successfully!",
        confirmButtonColor: "#3085d6",
      }).then(() => {
        // Reset form after successful submission
        setFormData({
          resourceId: "",
          engineerId: "",
          fullName: "",
          mobile_no: "",
          email: "",
          status: "Active",
          hourlyRate: "",
        });
        if (onSave) onSave();
      });
      
    } catch (error) {
      console.error("Failed to save resource:", error);
      const errorMessage = error.response?.data?.message || 
                          error.response?.data?.error || 
                          error.message || 
                          "Failed to save resource";
      Swal.fire({
        icon: "error",
        title: "Error",
        text: errorMessage,
        confirmButtonColor: "#d33",
      });
    } finally {
      setIsSubmitting(false);
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
          <h6 className="text" style={{ color: "white" }}>
            Logged in as: <strong>{userId},{userRole}</strong>
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

              <div className="col-md-4">
                <label className="form-label">Mobile</label>
                <input
                  type="text"
                  name="mobile_no"
                  value={formData.mobile_no}
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
                <button 
                  type="submit" 
                  className="submit-btn"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Saving...' : 'Save Resource'}
                </button>
                <button 
                  type="button" 
                  className="btn btn-secondary" 
                  onClick={onCancel}
                  disabled={isSubmitting}
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

export default ResourceForm;