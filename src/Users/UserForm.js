import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import baseURL from "../ApiUrl/Apiurl";
import { AuthContext } from "../AuthContext/AuthContext";
import { EyeFill, EyeSlashFill } from "react-bootstrap-icons";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const UserForm = ({ onCancel, onSave }) => {
  const { userId, userRole } = useContext(AuthContext);
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
    default_company: "",
    switch_company_allowed: false,
    companies: [], 
    
  });
const [companies, setCompanies] = useState([]);
const [loggedUserCompanies, setLoggedUserCompanies] = useState([]);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showLastPassword, setShowLastPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);


useEffect(() => {
  const fetchUserCompanies = async () => {
    try {
      const response = await fetch(`${baseURL}/users/`);
      const users = await response.json();

      const currentUser = users.find(user => user.user_id === userId);
      if (currentUser) {
        let companiesList = currentUser.companies || [];

        // Include default_company if it's not already in the list
        if (
          currentUser.default_company &&
          !companiesList.includes(currentUser.default_company)
        ) {
          companiesList = [...companiesList, currentUser.default_company];
        }

        setLoggedUserCompanies(companiesList);
        setFormData(prev => ({
          ...prev,
          default_company: currentUser.default_company || ""
        }));
      }
    } catch (error) {
      console.error("Error fetching user companies:", error);
      toast.error("Failed to load user company data");

    }
  };

  fetchUserCompanies();
}, [userId]);





  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "number" ? value.trim() : value,
    }));
  };

const handleSwitchChange = (e) => {
  const isAllowed = e.target.value === "true";
  setFormData(prev => ({
    ...prev,
    switch_company_allowed: isAllowed,
    switchable_companies: isAllowed ? prev.switchable_companies : [] // reset if "No"
  }));
};

const handleSwitchableCompanyChange = (e) => {
  const selected = Array.from(e.target.selectedOptions, (option) => option.value);
  setFormData((prevFormData) => ({
    ...prevFormData,
    companies: selected, // ✅ store in formData.companies
  }));
};


  const handleStatusChange = (e) => {
    setFormData((prev) => ({ ...prev, status: e.target.value }));
  };


   useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await fetch(`${baseURL}/companies/`);
        const data = await response.json();
        if (data.status === "success") {
          setCompanies(data.data);
        } else {
          toast.error("Failed to load companies");
        }
      } catch (error) {
        console.error("Error fetching companies:", error);
        toast.error("Error loading companies");
      }
    };


  fetchCompanies();
}, []);

 const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const generateUserId = async () => {
      try {
        const response = await fetch(`${baseURL}/users/`);
        const users = await response.json();

        const userIds = users.map(u => u.user_id).filter(id => /^USRID\d+$/.test(id));
        const numbers = userIds.map(id => parseInt(id.replace('USRID', ''), 10));
        const max = Math.max(...numbers, 0);
        return `USRID${(max + 1).toString().padStart(4, '0')}`;
      } catch (error) {
        console.error("Error generating user ID:", error);
        toast.error("Failed to generate user ID");
        return null;
      }
    };

    const user_id = await generateUserId();
    if (!user_id) {
      setIsSubmitting(false);
      return;
    }

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
      remarks: safeTrim(formData.remarks) || null,
      created_by: userId,
      updated_by: userId,
      default_company: formData.default_company || null,
      companies: formData.companies || [],
    };

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
        toast.error(`Failed to save user: ${errorData.message || 'Unknown error'}`, {
          autoClose: 5000,
        });
        return;
      }

      toast.success('User saved successfully!', {
        autoClose: 3000,
        onClose: onSave
      });
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error('An error occurred. Please try again later.', {
        autoClose: 5000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (

   


    <div className="container mt-4 service-request-form">
       <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <div className="card">
        <div className="card-header">
          <h5 className="mb-1">User Management</h5>
          <h6 className="text" style={{ color: "white" }}>
            Add, view and manage user accounts
          </h6>
      <h6 className="text" style={{ color: "white" }}>
  Logged in as: <strong>{userId},{userRole}</strong>
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
              <div className="col-md-4">
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


              <div className="col-md-4">
            <label className="form-label">Default Company</label>
            <select
  name="default_company"
  className="form-control"
  value={formData.default_company}
  onChange={handleChange}
  required
>
  <option value="">Select a company</option>
  {companies
    .filter(company => loggedUserCompanies.includes(company.company_id))
    .map(company => (
      <option key={company.company_id} value={company.company_id}>
        {company.company_name} -  {company.company_id}
      </option>
    ))}
</select>

          </div>


          <div className="col-md-4 mt-2">
  <label className="form-label">Switch Company</label>
  <div className="d-flex gap-3">
    <div className="form-check form-check-inline">
      <input
        className="form-check-input"
        type="radio"
        name="switch_company_allowed"
        value="true"
        checked={formData.switch_company_allowed === true}
        onChange={handleSwitchChange}
      />
      <label className="form-check-label">Yes</label>
    </div>
    <div className="form-check form-check-inline">
      <input
        className="form-check-input"
        type="radio"
        name="switch_company_allowed"
        value="false"
        checked={formData.switch_company_allowed === false}
        onChange={handleSwitchChange}
      />
      <label className="form-check-label">No</label>
    </div>
  </div>
</div>

            </div>


{formData.switch_company_allowed && (
  <div className="col-md-4 mt-2">
    <label className="form-label">Select Companies</label>
    <select
      multiple
      style={{ height: "100px" }}
      className="form-control"
      value={formData.companies} // ✅ this now reflects selected companies
      onChange={handleSwitchableCompanyChange}
    >
      {loggedUserCompanies.map((companyId) => {
        const company = companies.find((c) => c.company_id === companyId);
        return (
          <option key={companyId} value={companyId}>
            {companyId} - {company?.company_name || "Unknown"}
          </option>
        );
      })}
    </select>
  </div>
)}




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
          {/* Account Settings */}
            <div className="row g-3 mb-4">
              <h5>Account Settings</h5>
              <div className="col-md-4">
                <label className="form-label">Password</label>
                <div className="input-group">
                  <input
                    type={showCurrentPassword ? "text" : "password"}
                    name="current_password"
                    className="form-control"
                    placeholder="Enter password"
                    value={formData.current_password}
                    onChange={handleChange}
                    required
                  />
                  <button
                    className="btn btn-outline-secondary"
                    type="button"
                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                  >
                    {showCurrentPassword ? <EyeSlashFill /> : <EyeFill />}
                  </button>
                </div>
              </div>
              <div className="col-md-4">
                <label className="form-label">Confirm Password</label>
                <div className="input-group">
                  <input
                    type={showLastPassword ? "text" : "password"}
                    name="last_password"
                    className="form-control"
                    placeholder="Confirm password"
                    value={formData.last_password}
                    onChange={handleChange}
                    required
                  />
                  <button
                    className="btn btn-outline-secondary"
                    type="button"
                    onClick={() => setShowLastPassword(!showLastPassword)}
                  >
                    {showLastPassword ? <EyeSlashFill /> : <EyeFill />}
                  </button>
                </div>
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
                     {/* Buttons */}
            <div className="d-flex justify-content-center mt-3 gap-3">
              <button 
                type="submit" 
                className="submit-btn"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Saving User...' : 'Save User'}
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

          </form>
        </div>
      </div>
    </div>
    
  );
};

export default UserForm;