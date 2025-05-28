import React, { useState, useEffect } from "react";
import "./ResourceManagement.css";

const ResourceTable = ({ onAdd }) => {
  const [resources, setResources] = useState([]);
  const [filteredResources, setFilteredResources] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [entriesPerPage, setEntriesPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    // Replace this with actual API call if needed
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
      },
      // Add more dummy entries if needed
    ];

    setResources(dummyData);
    setFilteredResources(dummyData);
  }, []);

  useEffect(() => {
    const filtered = resources.filter((res) =>
      Object.values(res)
        .join(" ")
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    );
    setFilteredResources(filtered);
    setCurrentPage(1);
  }, [searchTerm, resources]);

  const indexOfLastEntry = currentPage * entriesPerPage;
  const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
  const currentResources = filteredResources.slice(indexOfFirstEntry, indexOfLastEntry);
  const totalPages = Math.ceil(filteredResources.length / entriesPerPage);

  return (
    <div className="container my-4">
      <div className="resource-mgmt-box p-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h2 className="resource-mgmt-title2">Resource List</h2>
          <button className="btn btn-primary" onClick={onAdd}>Add Resource</button>
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
              <option value={25}>25</option>
            </select>
            entries
          </div>

          <input
            type="text"
            placeholder="Search resources..."
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
              {currentResources.map((res, idx) => (
                <tr key={idx}>
                  <td>{indexOfFirstEntry + idx + 1}</td>
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

          {filteredResources.length === 0 && (
            <div className="text-center p-3">No resources found.</div>
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

export default ResourceTable;
