import React, { useEffect, useState, useContext } from "react";
import "./ResourceManagement.css";
import baseURL from "../ApiUrl/Apiurl"; 
import { AuthContext } from "../AuthContext/AuthContext";
import { useCompany } from "../AuthContext/CompanyContext";
import { FaEdit, FaTrash } from "react-icons/fa";
import axios from "axios";

const ResourceTable = ({ onAdd, onEdit  }) => { 
  const [resources, setResources] = useState([]);
   const { userId, userRole } = useContext(AuthContext);
  const [filteredResources, setFilteredResources] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [entriesPerPage, setEntriesPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
    const { selectedCompany } = useCompany();

  // Fetch data from API
    const fetchResources = async () => {
      try {
        if (!selectedCompany || !userId) return;

        const response = await fetch(
          `${baseURL}/resources/?company_id=${selectedCompany}&user_id=${userId}`
        );

        const result = await response.json();
        if (result.status === "success" && Array.isArray(result.data)) {
          const sortedData = result.data.sort(
            (a, b) => new Date(b.created_at) - new Date(a.created_at)
          );
          setResources(sortedData);
          setFilteredResources(sortedData);
        } else {
          console.error("Unexpected API response format:", result);
        }
      } catch (error) {
        console.error("Failed to fetch resources:", error);
      }
    };


useEffect(() => {
    fetchResources();
  }, [userId, selectedCompany]);


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

const handleDelete = async (resourceId) => {
  if (!window.confirm('Are you sure you want to delete this resource?')) {
    return;
  }

  try {
    console.log('Attempting to delete resource:', resourceId);
    console.log('Current user ID:', userId);
    console.log('Selected company ID:', selectedCompany);

    // First option: Try with query parameters
    const deleteUrl = `${baseURL}/resources/${resourceId}/?user_id=${userId}&company_id=${selectedCompany}`;
    console.log('DELETE URL:', deleteUrl);

    const response = await axios.delete(deleteUrl, {
      headers: {
        'Content-Type': 'application/json',
      }
    });

    console.log('Delete response:', response);

    if (response.status === 200 || response.status === 204) {
      console.log('Resource deleted successfully');
      fetchResources();
      alert('Resource deleted successfully');
    } else {
      console.warn('Unexpected response status:', response.status);
      alert('Failed to delete resource: Unexpected response');
    }
  } catch (error) {
    console.error('Detailed delete error:', {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status,
      config: error.config
    });

    let errorMessage = 'Error deleting resource';
    if (error.response) {
      errorMessage += `: ${error.response.status} - ${error.response.data?.message || 'No additional details'}`;
    } else if (error.request) {
      errorMessage += ': No response received from server';
    } else {
      errorMessage += `: ${error.message}`;
    }

    alert(errorMessage);
  }
};

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
  const currentResources = filteredResources.slice(indexOfFirstEntry, indexOfLastEntry);
  const totalPages = Math.ceil(filteredResources.length / entriesPerPage);

  return (
    <div className="user-management-container">
      <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap">
        <div>
          <h2 className="user-management-title mb-0">Resource Management</h2>
          <p className="user-management-subtitle mb-0 text-muted">Manage resource records</p>
        </div>
        <button onClick={onAdd} className="btn btn-primary">Add New Resource</button>
      </div>

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
          placeholder="Search resources..."
          className="form-control w-auto"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="table-responsive mb-4">
        <table className="table ">
          <thead className="product-table-header">
            <tr>
              <th>S.No</th>
              <th>Resource ID</th>
              <th>user ID</th>
               <th>Company</th>
              <th>Full Name</th>
              <th>Mobile</th>
              <th>Email</th>
              <th>Status</th>
              <th>Hourly Rate</th>
              <th>Created At</th>
              <th>Updated At</th>
              <th>Created By</th>
              <th>Updated By</th>
              {/* <th>Actions</th> */}
            </tr>
          </thead>
          <tbody>
            {currentResources.length > 0 ? (
              currentResources.map((res, index) => (
                <tr key={res.resource_id}>
                  <td>{indexOfFirstEntry + index + 1}</td>
                  <td>{res.resource_id}</td>
                  <td>{res.user}</td>
                    <td>{res.company}</td>
                  <td>{res.full_name}</td>
                  <td>{res.mobile_no}</td>
                  <td>{res.email}</td>
                  <td>
                    <span className={`badge ${
                      res.status === 'Active' ? 'bg-success' :
                      res.status === 'Inactive' ? 'bg-warning text-dark' :
                      'bg-danger'
                    }`}>
                      {res.status}
                    </span>
                  </td>
                  <td>{res.hourly_rate}</td>
                  <td>{formatDate(new Date(res.created_at).toLocaleString())}</td>
                  <td>{formatDate(new Date(res.updated_at).toLocaleString())}</td>
                  <td>{res.created_by}</td>
                  <td>{res.updated_by}</td>
                  {/* <td>
                    <FaEdit 
          className="text-primary me-2" 
          role="button" 
          onClick={() => onEdit(res)}  // Add onClick handler
        />
                    <FaTrash 
          className="text-danger" 
          role="button" 
          onClick={() => handleDelete(res.resource_id)} 
        />
      </td> */}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="11" className="text-center">No resources found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

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

export default ResourceTable;
