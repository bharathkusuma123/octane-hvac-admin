import React from "react";
import "./ResourceManagement.css";

const ResourceTable = ({ onAdd }) => {
  const dummyData = [
    {
      resource_id: "R001",
      full_name: "John Doe",
      mobile_no: "+91 9876543210",
      email: "john.doe@example.com",
      status: "Active",
      hourly_rate: "150.00",
      created_at: "2024-04-10 12:00:00",
      updated_at: "2024-05-20 15:30:00",
      created_by: "admin",
      updated_by: "manager"
    }
  ];

  return (
    <div className="container my-4">
      <div className="resource-mgmt-box p-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h2 className="resource-mgmt-title2">Resource List</h2>
          <button className="btn btn-primary" onClick={onAdd}>Add Resource</button>
        </div>
        <div className="table-responsive">
          <table className="table table-bordered table-hover">
            <thead className="table-light">
              <tr>
                <th>Resource ID</th>
                <th>Full Name</th>
                <th>Mobile No</th>
                <th>Email</th>
                <th>Status</th>
                <th>Hourly Rate</th>
                <th>Created At</th>
                <th>Updated At</th>
                <th>Created By</th>
                <th>Updated By</th>
              </tr>
            </thead>
            <tbody>
              {dummyData.map((res, idx) => (
                <tr key={idx}>
                  <td>{res.resource_id}</td>
                  <td>{res.full_name}</td>
                  <td>{res.mobile_no}</td>
                  <td>{res.email}</td>
                  <td>{res.status}</td>
                  <td>{res.hourly_rate}</td>
                  <td>{res.created_at}</td>
                  <td>{res.updated_at}</td>
                  <td>{res.created_by}</td>
                  <td>{res.updated_by}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ResourceTable;
