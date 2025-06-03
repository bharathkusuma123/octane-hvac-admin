import React, { useState, useEffect } from "react";
import "./Product.css";
import axios from "axios";

const ProductForm = ({ onCancel, onSave, productId }) => {
  const [formData, setFormData] = useState({
    product_id: "",
    product_name: "",
    product_description: "",
    created_by: "",
    updated_by: "",
    created_at: "",
    updated_at: ""
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  // Fetch product details when editing
  useEffect(() => {
    if (!productId) {
      // If adding new product, reset form
      setFormData({
        product_id: "",
        product_name: "",
        product_description: "",
        created_by: "",
        updated_by: "",
        created_at: "",
        updated_at: ""
      });
      setError(null);
      return;
    }

    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://175.29.21.7:8006/products/${productId}/`);
        const data = response.data.data;

        // Convert ISO string to datetime-local input format (yyyy-MM-ddTHH:mm)
        const toLocalDateTime = (isoString) => {
          if (!isoString) return "";
          const date = new Date(isoString);
          // Format like "2025-05-31T06:43"
          const pad = (n) => (n < 10 ? "0" + n : n);
          return (
            date.getFullYear() +
            "-" +
            pad(date.getMonth() + 1) +
            "-" +
            pad(date.getDate()) +
            "T" +
            pad(date.getHours()) +
            ":" +
            pad(date.getMinutes())
          );
        };

        setFormData({
          product_id: data.product_id || "",
          product_name: data.product_name || "",
          product_description: data.product_description || "",
          created_by: data.created_by || "",
          updated_by: data.updated_by || "",
          created_at: toLocalDateTime(data.created_at),
          updated_at: toLocalDateTime(data.updated_at)
        });
        setError(null);
      } catch (err) {
        console.error("Failed to fetch product:", err);
        setError("Failed to load product data for editing.");
      }
    };

    fetchProduct();
  }, [productId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    // Convert datetime-local input back to ISO string with seconds
    const toISOStringWithSeconds = (localDateTime) => {
      if (!localDateTime) return null;
      const date = new Date(localDateTime);
      return date.toISOString();
    };

    const payload = {
      ...formData,
      created_at: formData.created_at
        ? toISOStringWithSeconds(formData.created_at)
        : new Date().toISOString(),
      updated_at: formData.updated_at
        ? toISOStringWithSeconds(formData.updated_at)
        : new Date().toISOString()
    };

    try {
      if (productId) {
        // Editing: Use PUT or PATCH API if available, else POST to update
        // Assuming PUT available at /products/:id/
        await axios.put(
          `http://175.29.21.7:8006/products/${productId}/`,
          payload,
          {
            headers: { "Content-Type": "application/json" }
          }
        );
      } else {
        // Adding new product
        await axios.post(
          "http://175.29.21.7:8006/products/",
          payload,
          {
            headers: { "Content-Type": "application/json" }
          }
        );
      }

      onSave();
    } catch (err) {
      console.error("Error saving product:", err);
      const errorMessage =
        err.response?.data?.message ||
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
        <h2 className="prod-title">{productId ? "Edit Product" : "Add Product"} (HVAC Devices)</h2>
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
              disabled={!!productId} // disable editing product_id when editing existing product
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
        </div>

        <div className="mb-3">
          <label className="prod-label">Product Description</label>
          <textarea
            className="form-control prod-textarea"
            name="product_description"
            placeholder="Enter product description"
            value={formData.product_description}
            onChange={handleChange}
          />
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
