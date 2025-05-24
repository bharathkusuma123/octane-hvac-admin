// src/components/ProductForm.js
import React from "react";
import "./Product(HVACdevices).css";

const ProductForm = ({ onCancel, onSave }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Add save logic here (e.g., localStorage, API)
    onSave(); // Call onSave after handling
  };

  return (
    <div className="prod-form-wrapper container shadow-sm">
      <div className="prod-header mb-4">
        <h2 className="prod-title">Product (HVAC Devices)</h2>
        <p className="prod-subtitle">Fill in the Product details below</p>
      </div>

      <form className="prod-form" onSubmit={handleSubmit}>
        {/* Form Fields here (same as previous response) */}

        <div className="row prod-form-row">
          <div className="col-md-4 mb-3">
            <label className="prod-label">Product ID</label>
            <input type="text" className="form-control prod-input" placeholder="Enter product ID" />
          </div>
          <div className="col-md-4 mb-3">
            <label className="prod-label">Product Name</label>
            <input type="text" className="form-control prod-input" placeholder="Enter product name" />
          </div>
          <div className="col-md-4 mb-3">
            <label className="prod-label">PM Group ID</label>
            <input type="text" className="form-control prod-input" placeholder="Enter PM Group ID" />
          </div>
        </div>

        <div className="mb-3">
          <label className="prod-label">Product Description</label>
          <textarea className="form-control prod-textarea" placeholder="Enter product description"></textarea>
        </div>

        <div className="row prod-form-row">
          <div className="col-md-6 mb-3">
            <label className="prod-label">Created At</label>
            <input type="datetime-local" className="form-control prod-input" />
          </div>
          <div className="col-md-6 mb-3">
            <label className="prod-label">Updated At</label>
            <input type="datetime-local" className="form-control prod-input" />
          </div>
        </div>

        <div className="row prod-form-row">
          <div className="col-md-6 mb-3">
            <label className="prod-label">Created By</label>
            <input type="text" className="form-control prod-input" placeholder="Creator username" />
          </div>
          <div className="col-md-6 mb-3">
            <label className="prod-label">Updated By</label>
            <input type="text" className="form-control prod-input" placeholder="Updater username" />
          </div>
        </div>

        <div className="d-flex justify-content-end gap-2 prod-button-group">
          <button type="button" className="btn btn-outline-secondary prod-btn-cancel" onClick={onCancel}>
            Cancel
          </button>
          <button type="submit" className="btn btn-primary prod-btn-save">
            Save Product
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;
