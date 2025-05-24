import React from "react";
import "./UserManagement.css";

const UserTable = ({ onAdd }) => {
  const dummyData = [
    {
      user_id: 1,
      username: "john.doe",
      full_name: "John Doe",
      email: "john@example.com",
      phone: "+1 123-456-7890",
      telephone: "+1 111-222-3333",
      city: "Riyadh",
      country_code: "+966",
      status: "Active",
      remarks: "No remarks",
      role: "Service Engineer",
      hourly_rate: "120.00",
      address: "1234 Main Street, Riyadh, KSA",
      created_at: "2024-01-15 08:00:00",
      updated_at: "2024-05-15 09:45:00",
      created_by: "admin",
      updated_by: "admin"
    }
  ];

  return (
    <div className="container my-4">
      <div className="user-management-box p-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h2 className="user-management-title">User List</h2>
          <button className="btn btn-primary" onClick={onAdd}>Add User</button>
        </div>
        <div className="table-responsive">
          <table className="table table-bordered table-hover">
            <thead className="table-light">
              <tr>
                <th>User ID</th>
                <th>Username</th>
                <th>Full Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Telephone</th>
                <th>City</th>
                <th>Country Code</th>
                <th>Status</th>
                <th>Remarks</th>
                <th>Role</th>
                <th>Hourly Rate</th>
                <th>Address</th>
                <th>Created At</th>
                <th>Updated At</th>
                <th>Created By</th>
                <th>Updated By</th>
              </tr>
            </thead>
            <tbody>
              {dummyData.map((user, idx) => (
                <tr key={idx}>
                  <td>{user.user_id}</td>
                  <td>{user.username}</td>
                  <td>{user.full_name}</td>
                  <td>{user.email}</td>
                  <td>{user.phone}</td>
                  <td>{user.telephone}</td>
                  <td>{user.city}</td>
                  <td>{user.country_code}</td>
                  <td>{user.status}</td>
                  <td>{user.remarks}</td>
                  <td>{user.role}</td>
                  <td>{user.hourly_rate}</td>
                  <td>{user.address}</td>
                  <td>{user.created_at}</td>
                  <td>{user.updated_at}</td>
                  <td>{user.created_by}</td>
                  <td>{user.updated_by}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UserTable;
