import React, { useEffect, useState } from "react";
import "./UserManagement.css";

const UserTable = ({ onAdd }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("http://175.29.21.7:8006/users/")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }
        return response.json();
      })
      .then((data) => {
        // Sort by created_at descending (most recent first)
        const sortedData = data.sort(
          (a, b) => new Date(b.created_at) - new Date(a.created_at)
        );
        setUsers(sortedData);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }, []);

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
              {users.map((user, idx) => (
                <tr key={idx}>
                  <td>{user.user_id}</td>
                  <td>{user.username}</td>
                  <td>{user.full_name}</td>
                  <td>{user.email}</td>
                  <td>{user.mobile_no}</td>
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
          {users.length === 0 && (
            <div className="text-center p-3">Loading users or no data available.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserTable;
