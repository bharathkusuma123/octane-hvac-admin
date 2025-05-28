import React, { useEffect, useState } from "react";
import "./UserManagement.css";

const UserTable = ({ onAdd }) => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [entriesPerPage, setEntriesPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetch("http://175.29.21.7:8006/users/")
      .then((response) => {
        if (!response.ok) throw new Error("Failed to fetch users");
        return response.json();
      })
      .then((data) => {
        const sortedData = data.sort(
          (a, b) => new Date(b.created_at) - new Date(a.created_at)
        );
        setUsers(sortedData);
        setFilteredUsers(sortedData);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }, []);

  useEffect(() => {
    const filtered = users.filter((user) =>
      Object.values(user)
        .join(" ")
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    );
    setFilteredUsers(filtered);
    setCurrentPage(1); // reset to page 1 on new search
  }, [searchTerm, users]);

  const indexOfLastEntry = currentPage * entriesPerPage;
  const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstEntry, indexOfLastEntry);
  const totalPages = Math.ceil(filteredUsers.length / entriesPerPage);

  return (
    <div className="container my-4">
      <div className="user-management-box p-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h2 className="user-management-title">User List</h2>
          <button className="btn btn-primary" onClick={onAdd}>Add User</button>
        </div>

        <div className="table-controls d-flex justify-content-between align-items-center mb-3 flex-wrap">
          <div className="entries-selector d-flex align-items-center gap-2">
            Show
            <select
              value={entriesPerPage}
              onChange={(e) => setEntriesPerPage(Number(e.target.value))}
              className="form-select form-select-sm w-auto"
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={20}>20</option>
            </select>
            entries
          </div>

          <input
            type="text"
            placeholder="Search users..."
            className="form-control search-input w-auto"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="table-responsive">
          <table className="table table-bordered table-hover">
            <thead className="table-light">
              <tr>
                <th>S.No</th>
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
              {currentUsers.map((user, idx) => (
                <tr key={idx}>
                  <td>{indexOfFirstEntry + idx + 1}</td> {/* S.No */}
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

          {filteredUsers.length === 0 && (
            <div className="text-center p-3">No users found.</div>
          )}
        </div>

        {/* Pagination Controls */}
        <div className="pagination-controls d-flex justify-content-center mt-3">
          <button
            className="btn btn-outline-primary me-2"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => prev - 1)}
          >
            Previous
          </button>
          <span className="align-self-center mx-2">
            Page {currentPage} of {totalPages}
          </span>
          <button
            className="btn btn-outline-primary ms-2"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((prev) => prev + 1)}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserTable;
