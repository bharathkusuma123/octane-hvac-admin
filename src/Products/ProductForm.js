// src/components/ProductForm.js
import React, { useState } from "react";
import "./Product.css";
import axios from "axios";

const ProductForm = ({ onCancel, onSave }) => {
  const [formData, setFormData] = useState({
    product_id: "",
    product_name: "",
    product_description: "",
    // pm_group: "",
    created_by: "",
    updated_by: "",
    created_at: "",
    updated_at: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

 const handleSubmit = async (e) => {
  e.preventDefault();
  setIsSubmitting(true);
  setError(null);

  const payload = {
    ...formData,
    created_at: formData.created_at 
      ? new Date(formData.created_at).toISOString() 
      : new Date().toISOString(),
    updated_at: formData.updated_at 
      ? new Date(formData.updated_at).toISOString() 
      : new Date().toISOString()
  };

  try {
    console.log("Submitting product data:", payload);
    const response = await axios.post("http://175.29.21.7:8006/products/", payload, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    console.log("API response:", response.data);
    onSave();
  } catch (err) {
    console.error("Full error object:", err);
    console.error("Error response data:", err.response?.data);
    
    const errorMessage = err.response?.data?.message || 
                       err.response?.data?.error ||
                       JSON.stringify(err.response?.data) ||
                       err.message ||
                       "Failed to save product";
    setError(errorMessage);
  } finally {
    setIsSubmitting(false);
  }
};

  return (
    <div className="prod-form-wrapper container shadow-sm">
      <div className="prod-header mb-4">
        <h2 className="prod-title">Product (HVAC Devices)</h2>
        <p className="prod-subtitle">Fill in the Product details below</p>
      </div>

      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      <form className="prod-form" onSubmit={handleSubmit}>
        <div className="row prod-form-row">
          <div className="col-md-6 mb-3">
            <label className="prod-label">Product ID</label>
            <input
              type="text"
              name="product_id"
              className="form-control prod-input"
              placeholder="Enter product ID"
              value={formData.product_id}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-md-6 mb-3">
            <label className="prod-label">Product Name</label>
            <input
              type="text"
              name="product_name"
              className="form-control prod-input"
              placeholder="Enter product name"
              value={formData.product_name}
              onChange={handleChange}
              required
            />
          </div>
          {/* <div className="col-md-4 mb-3">
            <label className="prod-label">PM Group ID</label>
            <input
              type="text"
              name="pm_group"
              className="form-control prod-input"
              placeholder="Enter PM Group ID"
              value={formData.pm_group}
              onChange={handleChange}
              required
            />
          </div> */}
        </div>

        <div className="mb-3">
          <label className="prod-label">Product Description</label>
          <textarea
            className="form-control prod-textarea"
            name="product_description"
            placeholder="Enter product description"
            value={formData.product_description}
            onChange={handleChange}
          ></textarea>
        </div>

        <div className="row prod-form-row">
          <div className="col-md-6 mb-3">
            <label className="prod-label">Created At</label>
            <input
              type="datetime-local"
              name="created_at"
              className="form-control prod-input"
              value={formData.created_at}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-6 mb-3">
            <label className="prod-label">Updated At</label>
            <input
              type="datetime-local"
              name="updated_at"
              className="form-control prod-input"
              value={formData.updated_at}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="row prod-form-row">
          <div className="col-md-6 mb-3">
            <label className="prod-label">Created By</label>
            <input
              type="text"
              name="created_by"
              className="form-control prod-input"
              placeholder="Creator username"
              value={formData.created_by}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-md-6 mb-3">
            <label className="prod-label">Updated By</label>
            <input
              type="text"
              name="updated_by"
              className="form-control prod-input"
              placeholder="Updater username"
              value={formData.updated_by}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="d-flex justify-content-end gap-2 prod-button-group">
          <button
            type="button"
            className="btn btn-outline-secondary prod-btn-cancel"
            onClick={onCancel}
            disabled={isSubmitting}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="btn btn-primary prod-btn-save"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Saving..." : "Save Product"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;