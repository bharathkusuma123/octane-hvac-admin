// src/components/ProductTable.js
import React from "react";
import "./Product(HVACdevices).css";

const ProductTable = ({ onAdd }) => {
  const dummyData = [
    {
      product_id: "05001",
      product_name: "CRS 2500",
      product_description: "Ceiling Mounted HVAC",
      pm_group_id: "Group-1",
      created_at: "2024-06-01 10:30",
      updated_at: "2024-06-05 14:15",
      created_by: "admin",
      updated_by: "jdoe",
    },
  ];

  return (
    <div className="container my-4">
      <div className="comp-wrapper p-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h2 className="comp-title">Product List</h2>
          <button className="btn btn-primary" onClick={onAdd}>Add Product</button>
        </div>

      <div className="table-responsive">
        <table className="table table-bordered table-striped">
          <thead className="table-light">
            <tr>
              <th>Product ID</th>
              <th>Product Name</th>
              <th>Description</th>
              <th>PM Group ID</th>
              <th>Created At</th>
              <th>Updated At</th>
              <th>Created By</th>
              <th>Updated By</th>
            </tr>
          </thead>
          <tbody>
            {dummyData.map((product, index) => (
              <tr key={index}>
                <td>{product.product_id}</td>
                <td>{product.product_name}</td>
                <td>{product.product_description}</td>
                <td>{product.pm_group_id}</td>
                <td>{product.created_at}</td>
                <td>{product.updated_at}</td>
                <td>{product.created_by}</td>
                <td>{product.updated_by}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
     </div>
    </div>
  );
};

export default ProductTable;
