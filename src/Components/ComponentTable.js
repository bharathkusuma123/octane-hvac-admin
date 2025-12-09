// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { FaEdit, FaTrash, FaEye } from "react-icons/fa";
// import { useNavigate } from "react-router-dom";
// import "./Component.css";
// import baseURL from "../ApiUrl/Apiurl";

// const ComponentTable = ({ onAdd, onEdit, onDelete }) => {
//   const [components, setComponents] = useState([]);
//   const [filteredComponents, setFilteredComponents] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [entriesPerPage, setEntriesPerPage] = useState(5);
//   const [currentPage, setCurrentPage] = useState(1);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchComponents = async () => {
//       try {
//         const response = await axios.get(`${baseURL}/components/`);
//         const componentsArray = Array.isArray(response.data.data) ? response.data.data : [];

//         const sortedComponents = componentsArray.sort(
//           (a, b) => new Date(b.created_at) - new Date(a.created_at)
//         );

//         setComponents(sortedComponents);
//         setFilteredComponents(sortedComponents);
//       } catch (error) {
//         console.error("Error fetching components:", error);
//       }
//     };

//     fetchComponents();
//   }, []);

//   useEffect(() => {
//     const filtered = components.filter((comp) =>
//       Object.values(comp)
//         .join(" ")
//         .toLowerCase()
//         .includes(searchTerm.toLowerCase())
//     );
//     setFilteredComponents(filtered);
//     setCurrentPage(1);
//   }, [searchTerm, components]);

//   const formatDate = (dateString) => {
//     if (!dateString) return '-';
//     const date = new Date(dateString);
//     const day = date.getDate().toString().padStart(2, '0');
//     const month = (date.getMonth() + 1).toString().padStart(2, '0');
//     const year = date.getFullYear();
//     return `${day}/${month}/${year}`;
//   };

//   const indexOfLastEntry = currentPage * entriesPerPage;
//   const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
//   const currentComponents = filteredComponents.slice(indexOfFirstEntry, indexOfLastEntry);
//   const totalPages = Math.ceil(filteredComponents.length / entriesPerPage);

//   return (
//     <div className="component-management-container">
//       <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap">
//         <div>
//           <h2 className="component-management-title mb-0">Component Management</h2>
//           <p className="component-management-subtitle mb-0 text-muted">Manage system components</p>
//         </div>
//         <button onClick={onAdd} className="btn btn-primary">Add New Component</button>
//       </div>

//       <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap">
//         <div className="d-flex align-items-center gap-2">
//           Show
//           <select
//             value={entriesPerPage}
//             onChange={(e) => setEntriesPerPage(Number(e.target.value))}
//             className="form-select form-select-sm w-auto"
//           >
//             <option value={5}>5</option>
//             <option value={10}>10</option>
//             <option value={25}>25</option>
//           </select>
//           entries
//         </div>
//         <input
//           type="text"
//           placeholder="Search components..."
//           className="form-control w-auto"
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//         />
//       </div>

//       <div className="table-responsive mb-4">
//         <table className="table">
//           <thead className="product-table-header">
//             <tr>
//               <th>S.No</th>
//               <th>Component ID</th>
//               <th>Name</th>
//               <th>Description</th>
//               <th>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {currentComponents.length > 0 ? (
//               currentComponents.map((component, index) => (
//                 <tr key={index}>
//                   <td>{indexOfFirstEntry + index + 1}</td>
//                   <td>{component.component_id}</td>
//                   <td>{component.component_name}</td>
//                   <td>{component.component_description}</td>
//                  <td>
//   <div className="action-icons">
//     <FaEye
//       title="View"
//       onClick={() => navigate(`/components/view/${component.component_id}`)}
//       className="action-icon view-icon"
//     />
//     <FaEdit
//       title="Edit"
//       onClick={() => onEdit(component.component_id)}
//       className="action-icon edit-icon"
//     />
//     <FaTrash
//       title="Delete"
//       onClick={async () => {
//         try {
//           await onDelete(component.component_id);
//           setComponents(prev =>
//             prev.filter(c => c.component_id !== component.component_id)
//           );
//         } catch (error) {
//           console.error("Failed to delete component:", error);
//         }
//       }}
//       className="action-icon delete-icon"
//     />
//   </div>
// </td>

//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan="5" className="text-center">No components found.</td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>

//       <div className="pagination-controls d-flex justify-content-center mt-3">
//         <button
//           className="btn btn-outline-primary me-2"
//           disabled={currentPage === 1}
//           onClick={() => setCurrentPage((prev) => prev - 1)}
//         >
//           Previous
//         </button>
//         <span className="align-self-center mx-2">
//           Page {currentPage} of {totalPages}
//         </span>
//         <button
//           className="btn btn-outline-primary ms-2"
//           disabled={currentPage === totalPages}
//           onClick={() => setCurrentPage((prev) => prev + 1)}
//         >
//           Next
//         </button>
//       </div>
//     </div>
//   );
// };

// export default ComponentTable;







// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { FaEdit, FaTrash, FaEye } from "react-icons/fa";
// import { useNavigate } from "react-router-dom";
// import "./Component.css";
// import baseURL from "../ApiUrl/Apiurl";
// import Swal from 'sweetalert2';

// const ComponentTable = ({ onAdd, onEdit }) => {
//   const [components, setComponents] = useState([]);
//   const [filteredComponents, setFilteredComponents] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [entriesPerPage, setEntriesPerPage] = useState(5);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const navigate = useNavigate();

//   const fetchComponents = async () => {
//     setLoading(true);
//     setError(null);
//     try {
//       const response = await axios.get(`${baseURL}/components/`);
//       const componentsArray = Array.isArray(response.data.data) ? response.data.data : [];

//       const sortedComponents = componentsArray.sort(
//         (a, b) => new Date(b.created_at) - new Date(a.created_at)
//       );

//       setComponents(sortedComponents);
//       setFilteredComponents(sortedComponents);
//     } catch (error) {
//       setError("Failed to fetch components. Please try again later.");
//       console.error("Error fetching components:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchComponents();
//   }, []);

//   const handleDelete = async (componentId) => {
//     Swal.fire({
//       title: 'Are you sure?',
//       text: 'This component will be permanently deleted!',
//       icon: 'warning',
//       showCancelButton: true,
//       confirmButtonColor: '#d33',
//       cancelButtonColor: '#3085d6',
//       confirmButtonText: 'Yes, delete it!'
//     }).then(async (result) => {
//       if (result.isConfirmed) {
//         try {
//           await axios.delete(`${baseURL}/components/${componentId}/`);
//           Swal.fire({
//             icon: 'success',
//             title: 'Deleted!',
//             text: 'Component deleted successfully!',
//             confirmButtonColor: '#3085d6',
//           });
//           // Refresh the component list after successful deletion
//           fetchComponents();
//         } catch (error) {
//           console.error(error);
//           Swal.fire({
//             icon: 'error',
//             title: 'Failed!',
//             text: 'Could not delete the component. Please try again.',
//             confirmButtonColor: '#d33',
//           });
//         }
//       }
//     });
//   };

//   useEffect(() => {
//     const filtered = components.filter((comp) =>
//       Object.values(comp)
//         .join(" ")
//         .toLowerCase()
//         .includes(searchTerm.toLowerCase())
//     );
//     setFilteredComponents(filtered);
//     setCurrentPage(1);
//   }, [searchTerm, components]);

//  const formatDateTime = (dateString) => {
//   if (!dateString) return '-';
//   const date = new Date(dateString);

//   return date.toLocaleString('en-IN', {
//     day: '2-digit',
//     month: '2-digit',
//     year: 'numeric',
//     hour: '2-digit',
//     minute: '2-digit',
//     // second: '2-digit',
//     hour12: false,
//     timeZone: 'Asia/Kolkata'
//   });
// };


//   const indexOfLastEntry = currentPage * entriesPerPage;
//   const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
//   const currentComponents = filteredComponents.slice(indexOfFirstEntry, indexOfLastEntry);
//   const totalPages = Math.ceil(filteredComponents.length / entriesPerPage);

//   return (
//     <div className="component-management-container">
//       <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap">
//         <div>
//           <h2 className="component-management-title mb-0">Component Management</h2>
//           <p className="component-management-subtitle mb-0 text-muted">Manage system components</p>
//         </div>
//         <button onClick={onAdd} className="btn btn-primary">Add New Component</button>
//       </div>

//       <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap">
//         <div className="d-flex align-items-center gap-2">
//           Show
//           <select
//             value={entriesPerPage}
//             onChange={(e) => setEntriesPerPage(Number(e.target.value))}
//             className="form-select form-select-sm w-auto"
//           >
//             <option value={5}>5</option>
//             <option value={10}>10</option>
//             <option value={25}>25</option>
//           </select>
//           entries
//         </div>
//         <input
//           type="text"
//           placeholder="Search components..."
//           className="form-control w-auto"
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//         />
//       </div>

//       {loading ? (
//         <div className="text-center my-3">
//           <div className="spinner-border text-primary"></div>
//           <p>Loading components...</p>
//         </div>
//       ) : error ? (
//         <div className="alert alert-danger">{error}</div>
//       ) : (
//         <>
//           <div className="table-responsive mb-4">
//             <table className="table">
//               <thead className="product-table-header">
//                 <tr>
//                   <th>S.No</th>
//                   <th>Component ID</th>
//                   <th>Name</th>
//                   <th>Description</th>
//                   <th>Created At</th>
//                   <th>Updated At</th>
//                   <th>Created By</th>
//                   <th>Updated By</th>
//                   <th>Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {currentComponents.length > 0 ? (
//                   currentComponents.map((component, index) => (
//                     <tr key={index}>
//                       <td>{indexOfFirstEntry + index + 1}</td>
//                       <td>{component.component_id}</td>
//                       <td>{component.component_name}</td>
//                       <td>{component.component_description}</td>
//                       <td>{formatDateTime(component.created_at)}</td>
//                       <td>{formatDateTime(component.updated_at)}</td>
//                       <td>{component.created_by || '-'}</td>
//                       <td>{component.updated_by || '-'}</td>
//                       <td>
//                         <div className="action-icons">
//                           {/* <FaEye
//                             title="View"
//                             onClick={() => navigate(`/components/view/${component.component_id}`)}
//                             className="action-icon view-icon"
//                           /> */}
//                           <FaEdit
//                             title="Edit"
//                             onClick={() => onEdit(component.component_id)}
//                             className="action-icon edit-icon"
//                           />
//                           <FaTrash
//                             title="Delete"
//                             onClick={() => handleDelete(component.component_id)}
//                             className="action-icon delete-icon"
//                           />
//                         </div>
//                       </td>
//                     </tr>
//                   ))
//                 ) : (
//                   <tr>
//                     <td colSpan="9" className="text-center">No components found.</td>
//                   </tr>
//                 )}
//               </tbody>
//             </table>
//           </div>

//           <div className="pagination-controls d-flex justify-content-center mt-3">
//             <button
//               className="btn btn-outline-primary me-2"
//               disabled={currentPage === 1}
//               onClick={() => setCurrentPage((prev) => prev - 1)}
//             >
//               Previous
//             </button>
//             <span className="align-self-center mx-2">
//               Page {currentPage} of {totalPages}
//             </span>
//             <button
//               className="btn btn-outline-primary ms-2"
//               disabled={currentPage === totalPages}
//               onClick={() => setCurrentPage((prev) => prev + 1)}
//             >
//               Next
//             </button>
//           </div>
//         </>
//       )}
//     </div>
//   );
// };

// export default ComponentTable;


// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { FaEdit, FaTrash, FaEye } from "react-icons/fa";
// import { useNavigate } from "react-router-dom";
// import "./Component.css";
// import baseURL from "../ApiUrl/Apiurl";
// import Swal from 'sweetalert2';

// const ComponentTable = ({ onAdd, onEdit }) => {
//   const [components, setComponents] = useState([]);
//   const [filteredComponents, setFilteredComponents] = useState([]);
//   const [users, setUsers] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [entriesPerPage, setEntriesPerPage] = useState(5);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [loading, setLoading] = useState(false);
//   const [usersLoading, setUsersLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const navigate = useNavigate();

//   // Fetch users data
//   const fetchUsers = async () => {
//     setUsersLoading(true);
//     try {
//       const response = await axios.get(`${baseURL}/users/`);
//       const usersArray = Array.isArray(response.data) ? response.data : [];
//       setUsers(usersArray);
//     } catch (error) {
//       console.error("Error fetching users:", error);
//     } finally {
//       setUsersLoading(false);
//     }
//   };

//   // Fetch components data
//   const fetchComponents = async () => {
//     setLoading(true);
//     setError(null);
//     try {
//       const response = await axios.get(`${baseURL}/components/`);
//       const componentsArray = Array.isArray(response.data.data) ? response.data.data : [];

//       const sortedComponents = componentsArray.sort(
//         (a, b) => new Date(b.created_at) - new Date(a.created_at)
//       );

//       setComponents(sortedComponents);
//       setFilteredComponents(sortedComponents);
//     } catch (error) {
//       setError("Failed to fetch components. Please try again later.");
//       console.error("Error fetching components:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchUsers();
//     fetchComponents();
//   }, []);

//   // Function to get username from user_id
//   const getUsername = (userId) => {
//     if (!userId || users.length === 0) return userId; // Return user_id if no users data
    
//     const user = users.find(user => user.user_id === userId);
//     return user ? user.username : userId; // Return username if found, otherwise return user_id
//   };

//   const handleDelete = async (componentId) => {
//     Swal.fire({
//       title: 'Are you sure?',
//       text: 'This component will be permanently deleted!',
//       icon: 'warning',
//       showCancelButton: true,
//       confirmButtonColor: '#d33',
//       cancelButtonColor: '#3085d6',
//       confirmButtonText: 'Yes, delete it!'
//     }).then(async (result) => {
//       if (result.isConfirmed) {
//         try {
//           await axios.delete(`${baseURL}/components/${componentId}/`);
//           Swal.fire({
//             icon: 'success',
//             title: 'Deleted!',
//             text: 'Component deleted successfully!',
//             confirmButtonColor: '#3085d6',
//           });
//           // Refresh the component list after successful deletion
//           fetchComponents();
//         } catch (error) {
//           console.error(error);
//           Swal.fire({
//             icon: 'error',
//             title: 'Failed!',
//             text: 'Could not delete the component. Please try again.',
//             confirmButtonColor: '#d33',
//           });
//         }
//       }
//     });
//   };

//   useEffect(() => {
//     const filtered = components.filter((comp) =>
//       Object.values(comp)
//         .join(" ")
//         .toLowerCase()
//         .includes(searchTerm.toLowerCase())
//     );
//     setFilteredComponents(filtered);
//     setCurrentPage(1);
//   }, [searchTerm, components]);

//   const formatDateTime = (dateString) => {
//     if (!dateString) return '-';
//     const date = new Date(dateString);

//     return date.toLocaleString('en-IN', {
//       day: '2-digit',
//       month: '2-digit',
//       year: 'numeric',
//       hour: '2-digit',
//       minute: '2-digit',
//       hour12: false,
//       timeZone: 'Asia/Kolkata'
//     });
//   };

//   const indexOfLastEntry = currentPage * entriesPerPage;
//   const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
//   const currentComponents = filteredComponents.slice(indexOfFirstEntry, indexOfLastEntry);
//   const totalPages = Math.ceil(filteredComponents.length / entriesPerPage);

//   return (
//     <div className="component-management-container">
//       <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap">
//         <div>
//           <h2 className="component-management-title mb-0">Component Management</h2>
//           <p className="component-management-subtitle mb-0 text-muted">Manage system components</p>
//         </div>
//         <button onClick={onAdd} className="btn btn-primary">Add New Component</button>
//       </div>

//       <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap">
//         <div className="d-flex align-items-center gap-2">
//           Show
//           <select
//             value={entriesPerPage}
//             onChange={(e) => setEntriesPerPage(Number(e.target.value))}
//             className="form-select form-select-sm w-auto"
//           >
//             <option value={5}>5</option>
//             <option value={10}>10</option>
//             <option value={25}>25</option>
//           </select>
//           entries
//         </div>
//         <input
//           type="text"
//           placeholder="Search components..."
//           className="form-control w-auto"
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//         />
//       </div>

//       {loading || usersLoading ? (
//         <div className="text-center my-3">
//           <div className="spinner-border text-primary"></div>
//           <p>Loading {loading ? 'components' : 'users'}...</p>
//         </div>
//       ) : error ? (
//         <div className="alert alert-danger">{error}</div>
//       ) : (
//         <>
//           <div className="table-responsive mb-4">
//             <table className="table">
//               <thead className="product-table-header">
//                 <tr>
//                   <th>S.No</th>
//                   <th>Component ID</th>
//                   <th>Name</th>
//                   <th>Description</th>
//                   <th>Created At</th>
//                   <th>Updated At</th>
//                   <th>Created By</th>
//                   <th>Updated By</th>
//                   <th>Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {currentComponents.length > 0 ? (
//                   currentComponents.map((component, index) => (
//                     <tr key={index}>
//                       <td>{indexOfFirstEntry + index + 1}</td>
//                       <td>{component.component_id}</td>
//                       <td>{component.component_name}</td>
//                       <td>{component.component_description}</td>
//                       <td>{formatDateTime(component.created_at)}</td>
//                       <td>{formatDateTime(component.updated_at)}</td>
//                       <td>{getUsername(component.created_by)}</td>
//                       <td>{getUsername(component.updated_by)}</td>
//                       <td>
//                         <div className="action-icons">
//                           <FaEdit
//                             title="Edit"
//                             onClick={() => onEdit(component.component_id)}
//                             className="action-icon edit-icon"
//                           />
//                           <FaTrash
//                             title="Delete"
//                             onClick={() => handleDelete(component.component_id)}
//                             className="action-icon delete-icon"
//                           />
//                         </div>
//                       </td>
//                     </tr>
//                   ))
//                 ) : (
//                   <tr>
//                     <td colSpan="9" className="text-center">No components found.</td>
//                   </tr>
//                 )}
//               </tbody>
//             </table>
//           </div>

//           <div className="pagination-controls d-flex justify-content-center mt-3">
//             <button
//               className="btn btn-outline-primary me-2"
//               disabled={currentPage === 1}
//               onClick={() => setCurrentPage((prev) => prev - 1)}
//             >
//               Previous
//             </button>
//             <span className="align-self-center mx-2">
//               Page {currentPage} of {totalPages}
//             </span>
//             <button
//               className="btn btn-outline-primary ms-2"
//               disabled={currentPage === totalPages}
//               onClick={() => setCurrentPage((prev) => prev + 1)}
//             >
//               Next
//             </button>
//           </div>
//         </>
//       )}
//     </div>
//   );
// };

// export default ComponentTable;

//===============================================================
// After fixing filter -Global search issue 


import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaEdit, FaTrash, FaEye } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "./Component.css";
import baseURL from "../ApiUrl/Apiurl";
import Swal from 'sweetalert2';

const ComponentTable = ({ onAdd, onEdit }) => {
  const [components, setComponents] = useState([]);
  const [filteredComponents, setFilteredComponents] = useState([]);
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [entriesPerPage, setEntriesPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [usersLoading, setUsersLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Fetch users data
  const fetchUsers = async () => {
    setUsersLoading(true);
    try {
      const response = await axios.get(`${baseURL}/users/`);
      const usersArray = Array.isArray(response.data) ? response.data : [];
      setUsers(usersArray);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setUsersLoading(false);
    }
  };

  // Fetch components data
  const fetchComponents = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`${baseURL}/components/`);
      const componentsArray = Array.isArray(response.data.data) ? response.data.data : [];

      const sortedComponents = componentsArray.sort(
        (a, b) => new Date(b.created_at) - new Date(a.created_at)
      );

      setComponents(sortedComponents);
      setFilteredComponents(sortedComponents);
    } catch (error) {
      setError("Failed to fetch components. Please try again later.");
      console.error("Error fetching components:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
    fetchComponents();
  }, []);

  // Function to get username from user_id
  const getUsername = (userId) => {
    if (!userId || users.length === 0) return userId;
    
    const user = users.find(user => user.user_id === userId);
    return user ? user.username : userId;
  };

  // Function to format date for display
  const formatDateTime = (dateString) => {
    if (!dateString) return '-';
    const date = new Date(dateString);

    return date.toLocaleString('en-IN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
      timeZone: 'Asia/Kolkata'
    });
  };

  // Function to format date in multiple formats for search
  const formatDateForSearch = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    
    if (isNaN(date.getTime())) return '';
    
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    const hour = date.getHours().toString().padStart(2, '0');
    const minute = date.getMinutes().toString().padStart(2, '0');
    
    // Return multiple formats for better searchability
    return [
      `${day}/${month}/${year} ${hour}:${minute}`,  // DD/MM/YYYY HH:MM
      `${day}/${month}/${year}`,                    // DD/MM/YYYY
      `${month}/${day}/${year}`,                    // MM/DD/YYYY (alternative)
      `${year}-${month}-${day}`,                    // YYYY-MM-DD
      `${year}${month}${day}`,                      // YYYYMMDD
      `${day}-${month}-${year}`,                    // DD-MM-YYYY
      `${hour}:${minute}`,                          // HH:MM
      date.toISOString(),                           // ISO string
    ].join(' ');
  };

  const handleDelete = async (componentId) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'This component will be permanently deleted!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`${baseURL}/components/${componentId}/`);
          Swal.fire({
            icon: 'success',
            title: 'Deleted!',
            text: 'Component deleted successfully!',
            confirmButtonColor: '#3085d6',
          });
          fetchComponents();
        } catch (error) {
          console.error(error);
          Swal.fire({
            icon: 'error',
            title: 'Failed!',
            text: 'Could not delete the component. Please try again.',
            confirmButtonColor: '#d33',
          });
        }
      }
    });
  };

  // Enhanced search functionality
  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredComponents(components);
      setCurrentPage(1);
      return;
    }

    const searchLower = searchTerm.toLowerCase().trim();
    
    const filtered = components.filter((comp) => {
      // Get username for search (not just user ID)
      const createdByUsername = getUsername(comp.created_by);
      const updatedByUsername = getUsername(comp.updated_by);
      
      // Get dates in multiple formats for search
      const createdDateFormats = formatDateForSearch(comp.created_at);
      const updatedDateFormats = formatDateForSearch(comp.updated_at);
      
      // Create a comprehensive search string that includes:
      // 1. All raw values from the component object
      // 2. Usernames (converted from user IDs)
      // 3. Dates in multiple formats
      // 4. Display values as shown in table
      const searchableText = [
        // Raw component data
        comp.component_id || '',
        comp.component_name || '',
        comp.component_description || '',
        comp.created_at || '',
        comp.updated_at || '',
        comp.created_by || '',  // Keep user ID for search too
        comp.updated_by || '',  // Keep user ID for search too
        
        // Converted usernames
        createdByUsername,
        updatedByUsername,
        
        // Dates in multiple formats
        createdDateFormats,
        updatedDateFormats,
        
        // Display values (exactly as shown in table)
        formatDateTime(comp.created_at),
        formatDateTime(comp.updated_at),
        
        // Add any other properties that might exist
        ...Object.values(comp).filter(val => 
          typeof val === 'string' || typeof val === 'number'
        ).map(val => String(val))
      ]
      .join(' ')                    // Combine into one string
      .toLowerCase()                // Make case-insensitive
      .replace(/\s+/g, ' ')         // Normalize spaces
      .trim();
      
      return searchableText.includes(searchLower);
    });
    
    setFilteredComponents(filtered);
    setCurrentPage(1);
  }, [searchTerm, components, users]); // Added users dependency

  const indexOfLastEntry = currentPage * entriesPerPage;
  const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
  const currentComponents = filteredComponents.slice(indexOfFirstEntry, indexOfLastEntry);
  const totalPages = Math.ceil(filteredComponents.length / entriesPerPage);

  return (
    <div className="component-management-container">
      <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap">
        <div>
          <h2 className="component-management-title mb-0">Component Management</h2>
          <p className="component-management-subtitle mb-0 text-muted">Manage system components</p>
        </div>
        <button onClick={onAdd} className="btn btn-primary">Add New Component</button>
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
        <div className="d-flex align-items-center gap-2">
          <input
            type="text"
            placeholder="Search in all columns..."
            className="form-control"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ minWidth: '300px' }}
          />
          {searchTerm && (
            <button 
              className="btn btn-sm btn-outline-secondary"
              onClick={() => setSearchTerm('')}
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {loading || usersLoading ? (
        <div className="text-center my-3">
          <div className="spinner-border text-primary"></div>
          <p>Loading {loading ? 'components' : 'users'}...</p>
        </div>
      ) : error ? (
        <div className="alert alert-danger">{error}</div>
      ) : (
        <>
          {/* Search Results Info */}
          {searchTerm && (
            <div className="alert alert-info mb-3">
              <strong>Search Results:</strong> Found {filteredComponents.length} component(s) matching "{searchTerm}"
            </div>
          )}

          <div className="table-responsive mb-4">
            <table className="table">
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
                  <th>Actions</th>
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
                      <td>{formatDateTime(component.created_at)}</td>
                      <td>{formatDateTime(component.updated_at)}</td>
                      <td>{getUsername(component.created_by)}</td>
                      <td>{getUsername(component.updated_by)}</td>
                      <td>
                        <div className="action-icons">
                          <FaEdit
                            title="Edit"
                            onClick={() => onEdit(component.component_id)}
                            className="action-icon edit-icon"
                          />
                          <FaTrash
                            title="Delete"
                            onClick={() => handleDelete(component.component_id)}
                            className="action-icon delete-icon"
                          />
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="9" className="text-center">
                      {searchTerm ? `No components found matching "${searchTerm}"` : 'No components found.'}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {totalPages > 1 && (
            <div className="pagination-controls d-flex justify-content-center mt-3">
              <button
                className="btn btn-outline-primary me-2"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((prev) => prev - 1)}
              >
                Previous
              </button>
              
              <div className="d-flex align-items-center mx-2">
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  let pageNum;
                  if (totalPages <= 5) {
                    pageNum = i + 1;
                  } else if (currentPage <= 3) {
                    pageNum = i + 1;
                  } else if (currentPage >= totalPages - 2) {
                    pageNum = totalPages - 4 + i;
                  } else {
                    pageNum = currentPage - 2 + i;
                  }
                  
                  return (
                    <button
                      key={pageNum}
                      className={`btn mx-1 ${currentPage === pageNum ? 'btn-primary' : 'btn-outline-primary'}`}
                      onClick={() => setCurrentPage(pageNum)}
                    >
                      {pageNum}
                    </button>
                  );
                })}
              </div>
              
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
          )}
        </>
      )}
    </div>
  );
};

export default ComponentTable;