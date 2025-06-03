import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaEdit, FaTrash } from "react-icons/fa";
import "./Component.css";

const ComponentTable = ({ onAdd,onEdit,onDelete }) => {
  const [components, setComponents] = useState([]);
  const [filteredComponents, setFilteredComponents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [entriesPerPage, setEntriesPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);

  // Fetch data from API
useEffect(() => {
  const fetchComponents = async () => {
    try {
      const response = await axios.get("http://175.29.21.7:8006/components/");
      const componentsArray = Array.isArray(response.data.data) ? response.data.data : [];

      // Sort by created_at in descending order (most recent first)
      const sortedComponents = componentsArray.sort(
        (a, b) => new Date(b.created_at) - new Date(a.created_at)
      );

      setComponents(sortedComponents);
      setFilteredComponents(sortedComponents);
    } catch (error) {
      console.error("Error fetching components:", error);
    }
  };

  fetchComponents();
}, []);


  // Filter based on search
  useEffect(() => {
    const filtered = components.filter((comp) =>
      Object.values(comp)
        .join(" ")
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    );
    setFilteredComponents(filtered);
    setCurrentPage(1);
  }, [searchTerm, components]);

  const indexOfLastEntry = currentPage * entriesPerPage;
  const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
  const currentComponents = filteredComponents.slice(indexOfFirstEntry, indexOfLastEntry);
  const totalPages = Math.ceil(filteredComponents.length / entriesPerPage);

  return (
    <div className="component-management-container">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap">
        <div>
          <h2 className="component-management-title mb-0">Component Management</h2>
          <p className="component-management-subtitle mb-0 text-muted">Manage system components</p>
        </div>
        <button onClick={onAdd} className="btn btn-primary">Add New Component</button>
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
          placeholder="Search components..."
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
              <th>Component ID</th>
              <th>Name</th>
              <th>Description</th>
              <th>Created At</th>
              <th>Updated At</th>
              <th>Created By</th>
              <th>Updated By</th>
              {/* <th>Actions</th>  */}

            </tr>
          </thead>
          <tbody>
            {currentComponents.length > 0 ? (
              currentComponents.map((component, index) => (
                <tr key={index}>
                  <td>{indexOfFirstEntry + index + 1}</td>
                  <td>{component.component_id}</td>
                  <td>{component.component_name}</td>
                  <td>{component.component_description}</td>
                  <td>{new Date(component.created_at).toLocaleString()}</td>
                  <td>{new Date(component.updated_at).toLocaleString()}</td>
                  <td>{component.created_by}</td>
                  <td>{component.updated_by}</td>
                  {/* <td>
                    <FaEdit
                      className="text-primary me-2"
                      style={{ cursor: "pointer" }}
                      onClick={() => onEdit(component.component_id)}
                    />
                    <FaTrash
                      className="text-danger"
                      style={{ cursor: "pointer" }}
                      onClick={async () => {
                        try {
                          // Call the parent delete handler (if needed)
                          await onDelete(component.component_id);

                          // Remove the deleted component from the local state
                          setComponents(prev =>
                            prev.filter(c => c.component_id !== component.component_id)
                          );
                        } catch (error) {
                          console.error("Failed to delete component:", error);
                        }
                      }}
                    />
                  </td> */}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="text-center">No components found.</td>
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

export default ComponentTable;
