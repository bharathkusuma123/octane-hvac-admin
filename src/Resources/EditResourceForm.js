import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import baseURL from "../ApiUrl/Apiurl";
import { AuthContext } from "../AuthContext/AuthContext";

const EditResourceForm = ({ resource, onCancel, onUpdate }) => {
  const { userId, userRole } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    resourceId: "",
    engineerId: "",
    fullName: "",
    phone: "",
    email: "",
    status: "Active",
    hourlyRate: "",
  });

  const [engineers, setEngineers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Fetch engineers list
    axios
      .get(`${baseURL}/users/`)
      .then((response) => {
        const filtered = response.data.filter(
          (user) => user.role === "Service Engineer"
        );
        setEngineers(filtered);
        
        // Pre-populate form with the resource data
        if (resource) {
          setFormData({
            resourceId: resource.resource_id,
            engineerId: resource.user,
            fullName: resource.full_name,
            phone: resource.mobile_no,
            email: resource.email,
            status: resource.status,
            hourlyRate: resource.hourly_rate,
          });
        }
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
        setIsLoading(false);
      });
  }, [resource]);

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
    // if (!formData.resourceId || !selectedCompany || !resource?.id) {
    //   alert("Please fill all required fields");
    //   return;
    // }

    const payload = {
      resource_id: formData.resourceId,
      full_name: formData.fullName,
      mobile_no: formData.phone,
      email: formData.email,
      hourly_rate: formData.hourlyRate,
      status: formData.status,
      updated_by: "Admin", // Or use the actual user name from context
      user: formData.engineerId,
      user_id: userId,
      company: selectedCompany,
      company_id: selectedCompany
    };

    try {
      const response = await axios.put(
        `${baseURL}/resources/${resource.resource_id}/`,
        payload
      );
      console.log("Resource updated successfully:", response.data);
      onUpdate();
    } catch (error) {
      console.error("Failed to update resource:", error);
      alert("Failed to update resource. Please try again.");
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!resource) {
    return <div>No resource selected for editing</div>;
  }

  return (
    <div className="container mt-4 service-request-form">
      <div className="card">
        <div className="card-header">
          <h5 className="mb-1">Edit Resource</h5>
          <h6 className="text" style={{ color: "white" }}>
            Update resource details
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
                  readOnly // Typically resource ID shouldn't be changed
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
                  Update Resource
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

export default EditResourceForm;