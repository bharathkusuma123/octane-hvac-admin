import React, { useEffect, useState } from "react";
import "./UserManagement.css";
import baseURL from "../ApiUrl/Apiurl";

const UserTable = ({ onAdd }) => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [entriesPerPage, setEntriesPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);

useEffect(() => {
  fetch(`${baseURL}/users/`)
    .then((response) => {
      if (!response.ok) throw new Error("Failed to fetch users");
      return response.json();
    })
    .then((data) => {
      // Filter only required roles
      const filteredRoles = data.filter(user =>
        ["Service Manager", "Service Engineer", "Customer"].includes(user.role)
      );

      // Sort by created_at in descending order
      const sortedData = filteredRoles.sort(
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
    setCurrentPage(1); // Reset to first page on search
  }, [searchTerm, users]);



    const formatDate = (dateString) => {
    if (!dateString) return '-';
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const indexOfLastEntry = currentPage * entriesPerPage;
  const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstEntry, indexOfLastEntry);
  const totalPages = Math.ceil(filteredUsers.length / entriesPerPage);

  return (
    <div className="user-management-container">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap">
        <div>
          <h2 className="user-management-title mb-0">User Management</h2>
          <p className="user-management-subtitle mb-0 text-muted">Manage user records</p>
        </div>
        <button onClick={onAdd} className="btn btn-primary">
          Add New User
        </button>
      </div>

      {/* Controls */}
      <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap">
        <div className="d-flex align-items-center gap-2">
          Show
          <select
            value={entriesPerPage}
            onChange={(e) => setEntriesPerPage(Number(e.target.value))}
            className="form-select form-select-sm w-auto"
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={25}>25</option>
          </select>
          entries
        </div>

        <input
          type="text"
          placeholder="Search users..."
          className="form-control w-auto"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Table */}
      <div className="table-responsive mb-4">
        <table className="table ">
          <thead className="product-table-header">
            <tr>
              <th>S.No</th>
              <th>User ID</th>
              <th>Full Name</th>
              <th>Username</th>
              <th>Email</th>
              <th>Mobile No.</th>
              <th>Telephone</th>
              <th>City</th>
              <th>Country</th>
              <th>Status</th>
              <th>Role</th>
              <th>Default Company</th>
              <th>Accessible Companies</th>
              <th>Created At</th>
            </tr>
          </thead>
          <tbody>
            {currentUsers.length > 0 ? (
              currentUsers.map((user, index) => (
                <tr key={index}>
                  <td>{indexOfFirstEntry + index + 1}</td>
                  <td>{user.user_id}</td>
                  <td>{user.full_name}</td>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>{user.mobile}</td>
                  <td>{user.telephone}</td>
                  <td>{user.city}</td>
                  <td>{user.country_code}</td>
                  <td>
                    <span className={`badge ${
                      user.status === 'Active' ? 'bg-success' :
                      user.status === 'Inactive' ? 'bg-warning text-dark' :
                      'bg-danger'
                    }`}>
                      {user.status}
                    </span>
                  </td>
                  <td>{user.role}</td>
                  <td>{user.default_company}</td>
                 <td>{Array.isArray(user.companies) ? user.companies.join(", ") : user.companies}</td>
                  <td>{formatDate(new Date(user.created_at).toLocaleString())}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="13" className="text-center">No users found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
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
  );
};

export default UserTable;