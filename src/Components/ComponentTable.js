// ComponentTable.js
import React from "react";
import "./Component.css";

const ComponentTable = ({ onAdd }) => {
  const dummyData = [
    {
      component_id: "05512",
      component_name: "Heat Exchanger",
      component_description: "Heat Exchanger CRS-5000/10000",
      created_at: "2024-05-01 10:00:00",
      updated_at: "2024-05-20 14:20:00",
      created_by: "admin",
      updated_by: "editor"
    }
  ];

  return (
    <div className="container my-4 compo-main">
      <div className="comp-wrapper p-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h2 className="comp-title">Component List</h2>
          <button className="btn btn-primary" onClick={onAdd}>Add Component</button>
        </div>
        <div className="table-responsive">
          <table className="table table-bordered table-hover">
            <thead className="table-light">
              <tr>
                <th>Component ID</th>
                <th>Component Name</th>
                <th>Description</th>
                <th>Created At</th>
                <th>Updated At</th>
                <th>Created By</th>
                <th>Updated By</th>
              </tr>
            </thead>
            <tbody>
              {dummyData.map((item, idx) => (
                <tr key={idx}>
                  <td>{item.component_id}</td>
                  <td>{item.component_name}</td>
                  <td>{item.component_description}</td>
                  <td>{item.created_at}</td>
                  <td>{item.updated_at}</td>
                  <td>{item.created_by}</td>
                  <td>{item.updated_by}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ComponentTable;
