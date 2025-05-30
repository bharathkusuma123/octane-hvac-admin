// ComponentForm.js
import React from "react";
import "./Component.css";

const ComponentForm = ({ onCancel, onSave }) => {
  const handleSubmit = async (e) => {
    e.preventDefault();

    const component_id = document.getElementById("component-id").value;
    const component_name = document.getElementById("component-name").value;
    const component_description = document.getElementById(
      "component-description"
    ).value;

    const timestamp = new Date().toISOString();

    const formData = {
      component_id,
      component_name,
      component_description,
      created_at: timestamp,
      updated_at: timestamp,
      created_by: "admin",
      updated_by: "admin",
    };

    try {
      const response = await fetch("http://175.29.21.7:8006/components/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Component saved successfully!");
        onSave(); // trigger parent callback if needed
      } else {
        alert("Failed to save component. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("An error occurred while submitting the form.");
    }
  };

  return (
    <div className="container my-4">
      <div className="comp-wrapper p-4">
        <div className="comp-header mb-4">
          <h2 className="comp-title">Component</h2>
          <p className="comp-subtitle">Fill in the component details below</p>
        </div>

        <form className="comp-form" onSubmit={handleSubmit}>
          <div className="row g-3 mb-3">
            <div className="col-md-6">
              <label htmlFor="component-id" className="form-label comp-label">
                Component ID
              </label>
              <input
                type="text"
                id="component-id"
                className="form-control comp-input"
                placeholder="Enter component ID"
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="component-name" className="form-label comp-label">
                Component Name
              </label>
              <input
                type="text"
                id="component-name"
                className="form-control comp-input"
                placeholder="Enter component name"
              />
            </div>
          </div>

          <div className="mb-3">
            <label
              htmlFor="component-description"
              className="form-label comp-label"
            >
              Component Description
            </label>
            <textarea
              id="component-description"
              className="form-control comp-textarea"
              placeholder="Add any notes or description..."
              rows="4"
            />
          </div>

          <div className="d-flex justify-content-end gap-2 flex-wrap">
            <button
              type="button"
              className="btn btn-outline-secondary comp-btn-cancel"
              onClick={onCancel}
            >
              Cancel
            </button>
            <button type="submit" className="btn btn-primary comp-btn-save">
              Save Item Component
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ComponentForm;
