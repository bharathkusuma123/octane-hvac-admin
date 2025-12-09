// import React, { useEffect, useState } from "react";
// import "./UserManagement.css";
// import baseURL from "../ApiUrl/Apiurl";
// import { FaEye, FaEdit, FaTrash } from "react-icons/fa";
// import Swal from 'sweetalert2';

// const UserTable = ({ onAdd, onEdit  }) => {
//   const [users, setUsers] = useState([]);
//   const [filteredUsers, setFilteredUsers] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [entriesPerPage, setEntriesPerPage] = useState(5);
//   const [currentPage, setCurrentPage] = useState(1);

// useEffect(() => {
//   fetch(`${baseURL}/users/`)
//     .then((response) => {
//       if (!response.ok) throw new Error("Failed to fetch users");
//       return response.json();
//     })
//     .then((data) => {
//       // Filter only required roles
//       const filteredRoles = data.filter(user =>
//         ["Service Manager", "Service Engineer", "Customer"].includes(user.role)
//       );

//       // Sort by created_at in descending order
//       const sortedData = filteredRoles.sort(
//         (a, b) => new Date(b.created_at) - new Date(a.created_at)
//       );

//       setUsers(sortedData);
//       setFilteredUsers(sortedData);
//     })
//     .catch((error) => {
//       console.error("Error fetching user data:", error);
//     });
// }, []);


//   useEffect(() => {
//     const filtered = users.filter((user) =>
//       Object.values(user)
//         .join(" ")
//         .toLowerCase()
//         .includes(searchTerm.toLowerCase())
//     );
//     setFilteredUsers(filtered);
//     setCurrentPage(1); // Reset to first page on search
//   }, [searchTerm, users]);



//     const formatDate = (dateString) => {
//     if (!dateString) return '-';
//     const date = new Date(dateString);
//     const day = date.getDate().toString().padStart(2, '0');
//     const month = (date.getMonth() + 1).toString().padStart(2, '0');
//     const year = date.getFullYear();
//     return `${day}/${month}/${year}`;
//   };

//   const handleDelete = async (userId) => {
//     const confirmed = await Swal.fire({
//       title: "Are you sure?",
//       text: `You are about to delete user ID: ${userId}`,
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#d33",
//       cancelButtonColor: "#3085d6",
//       confirmButtonText: "Yes, delete it!",
//     });

//     if (confirmed.isConfirmed) {
//       try {
//         const response = await fetch(`${baseURL}/users/${userId}/`, {
//           method: "DELETE",
//         });

//         if (!response.ok) throw new Error("Delete failed");

//         Swal.fire("Deleted!", "User has been deleted.", "success");

//         const updatedUsers = users.filter((u) => u.user_id !== userId);
//         setUsers(updatedUsers);
//         setFilteredUsers(updatedUsers);
//       } catch (error) {
//         console.error("Delete error:", error);
//         Swal.fire("Error", "Failed to delete user", "error");
//       }
//     }
//   };

//   const indexOfLastEntry = currentPage * entriesPerPage;
//   const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
//   const currentUsers = filteredUsers.slice(indexOfFirstEntry, indexOfLastEntry);
//   const totalPages = Math.ceil(filteredUsers.length / entriesPerPage);

//   return (
//     <div className="user-management-container">
//       {/* Header */}
//       <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap">
//         <div>
//           <h2 className="user-management-title mb-0">User Management</h2>
//           <p className="user-management-subtitle mb-0 text-muted">Manage user records</p>
//         </div>
//         <button onClick={onAdd} className="btn btn-primary">
//           Add New User
//         </button>
//       </div>

//       {/* Controls */}
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
//           placeholder="Search users..."
//           className="form-control w-auto"
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//         />
//       </div>

//       {/* Table */}
//       <div className="table-responsive mb-4">
//         <table className="table ">
//           <thead className="product-table-header">
//             <tr>
//               <th>S.No</th>
//               <th>User ID</th>
//               <th>Full Name</th>
//               <th>Username</th>
//               <th>Email</th>
//               <th>Mobile No.</th>
//               <th>Telephone</th>
//               <th>City</th>
//               <th>Country</th>
//               <th>Status</th>
//               <th>Role</th>
//               <th>Default Company</th>
//               <th>Accessible Companies</th>
//               <th>Created At</th>
//                  <th>Actions</th> 
//             </tr>
//           </thead>
//           <tbody>
//             {currentUsers.length > 0 ? (
//               currentUsers.map((user, index) => (
//                 <tr key={index}>
//                   <td>{indexOfFirstEntry + index + 1}</td>
//                   <td>{user.user_id}</td>
//                   <td>{user.full_name}</td>
//                   <td>{user.username}</td>
//                   <td>{user.email}</td>
//                   <td>{user.mobile}</td>
//                   <td>{user.telephone}</td>
//                   <td>{user.city}</td>
//                   <td>{user.country_code}</td>
//                   <td>
//                     <span className={`badge ${
//                       user.status === 'Active' ? 'bg-success' :
//                       user.status === 'Inactive' ? 'bg-warning text-dark' :
//                       'bg-danger'
//                     }`}>
//                       {user.status}
//                     </span>
//                   </td>
//                   <td>{user.role}</td>
//                   <td>{user.default_company}</td>
//                  <td>{Array.isArray(user.companies) ? user.companies.join(", ") : user.companies}</td>
//                   <td>{formatDate(new Date(user.created_at).toLocaleString())}</td>
//                   <td>
//   <div className="action-icons">
   
//    <FaEdit
//   title="Edit"
//   onClick={() => onEdit(user)}
//   className="action-icon edit-icon"
// />
// <FaTrash
//   title="Delete"
//   onClick={() => handleDelete(user.user_id)}
//   className="action-icon delete-icon"
// />
//   </div>
// </td>

//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan="13" className="text-center">No users found.</td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>

//       {/* Pagination */}
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

// export default UserTable;


// import React, { useEffect, useState } from "react";
// import "./UserManagement.css";
// import baseURL from "../ApiUrl/Apiurl";
// import { FaEye, FaEdit, FaTrash } from "react-icons/fa";
// import Swal from 'sweetalert2';

// const UserTable = ({ onAdd, onEdit  }) => {
//   const [users, setUsers] = useState([]);
//   const [filteredUsers, setFilteredUsers] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [entriesPerPage, setEntriesPerPage] = useState(5);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [companiesData, setCompaniesData] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // Fetch companies data
//   const fetchCompanies = async () => {
//     try {
//       const response = await fetch(`${baseURL}/companies/`);
//       const data = await response.json();
//       if (data.status === "success") {
//         setCompaniesData(data.data);
//       }
//     } catch (error) {
//       console.error("Failed to load companies data", error);
//     }
//   };

//   // Function to get company name only (hide ID)
//   const getCompanyName = (companyId) => {
//     if (!companiesData || companiesData.length === 0) return companyId;
    
//     const company = companiesData.find(comp => comp.company_id === companyId);
//     return company ? company.company_name : companyId;
//   };

//   // Function to get accessible companies names only
//   const getAccessibleCompaniesDisplay = (companyIds) => {
//     if (!companyIds || !Array.isArray(companyIds)) return '-';
    
//     if (companiesData.length === 0) {
//       return companyIds.join(", ");
//     }
    
//     return companyIds.map(companyId => getCompanyName(companyId)).join(", ");
//   };

//   useEffect(() => {
//     const fetchData = async () => {
//       setLoading(true);
      
//       // Fetch companies first
//       await fetchCompanies();
      
//       // Then fetch users
//       try {
//         const response = await fetch(`${baseURL}/users/`);
//         if (!response.ok) throw new Error("Failed to fetch users");
//         const data = await response.json();
        
//         // Filter only required roles
//         const filteredRoles = data.filter(user =>
//           ["Service Manager", "Service Engineer", "Customer"].includes(user.role)
//         );

//         // Sort by created_at in descending order
//         const sortedData = filteredRoles.sort(
//           (a, b) => new Date(b.created_at) - new Date(a.created_at)
//         );

//         setUsers(sortedData);
//         setFilteredUsers(sortedData);
//       } catch (error) {
//         console.error("Error fetching user data:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   useEffect(() => {
//     const filtered = users.filter((user) =>
//       Object.values(user)
//         .join(" ")
//         .toLowerCase()
//         .includes(searchTerm.toLowerCase())
//     );
//     setFilteredUsers(filtered);
//     setCurrentPage(1); // Reset to first page on search
//   }, [searchTerm, users]);

//   const formatDate = (dateString) => {
//     if (!dateString) return '-';
//     const date = new Date(dateString);
//     const day = date.getDate().toString().padStart(2, '0');
//     const month = (date.getMonth() + 1).toString().padStart(2, '0');
//     const year = date.getFullYear();
//     return `${day}/${month}/${year}`;
//   };

//   const handleDelete = async (userId) => {
//     const confirmed = await Swal.fire({
//       title: "Are you sure?",
//       text: `You are about to delete user ID: ${userId}`,
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#d33",
//       cancelButtonColor: "#3085d6",
//       confirmButtonText: "Yes, delete it!",
//     });

//     if (confirmed.isConfirmed) {
//       try {
//         const response = await fetch(`${baseURL}/users/${userId}/`, {
//           method: "DELETE",
//         });

//         if (!response.ok) throw new Error("Delete failed");

//         Swal.fire("Deleted!", "User has been deleted.", "success");

//         const updatedUsers = users.filter((u) => u.user_id !== userId);
//         setUsers(updatedUsers);
//         setFilteredUsers(updatedUsers);
//       } catch (error) {
//         console.error("Delete error:", error);
//         Swal.fire("Error", "Failed to delete user", "error");
//       }
//     }
//   };

//   const indexOfLastEntry = currentPage * entriesPerPage;
//   const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
//   const currentUsers = filteredUsers.slice(indexOfFirstEntry, indexOfLastEntry);
//   const totalPages = Math.ceil(filteredUsers.length / entriesPerPage);

//   if (loading) {
//     return (
//       <div className="user-management-container">
//         <div className="text-center my-4">Loading users and companies...</div>
//       </div>
//     );
//   }

//   return (
//     <div className="user-management-container">
//       {/* Header */}
//       <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap">
//         <div>
//           <h2 className="user-management-title mb-0">User Management</h2>
//           <p className="user-management-subtitle mb-0 text-muted">Manage user records</p>
//         </div>
//         <button onClick={onAdd} className="btn btn-primary">
//           Add New User
//         </button>
//       </div>

//       {/* Controls */}
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
//           placeholder="Search users..."
//           className="form-control w-auto"
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//         />
//       </div>

//       {/* Table */}
//       <div className="table-responsive mb-4">
//         <table className="table">
//           <thead className="product-table-header">
//             <tr>
//               <th>S.No</th>
//               <th>User ID</th>
//               <th>Full Name</th>
//               <th>Username</th>
//               <th>Email</th>
//               <th>Mobile No.</th>
//               <th>Telephone</th>
//               <th>City</th>
//               <th>Country</th>
//               <th>Status</th>
//               <th>Role</th>
//               <th>Default Company</th>
//               <th>Accessible Companies</th>
//               <th>Created At</th>
//               <th>Actions</th> 
//             </tr>
//           </thead>
//           <tbody>
//             {currentUsers.length > 0 ? (
//               currentUsers.map((user, index) => (
//                 <tr key={index}>
//                   <td>{indexOfFirstEntry + index + 1}</td>
//                   <td>{user.user_id}</td>
//                   <td>{user.full_name}</td>
//                   <td>{user.username}</td>
//                   <td>{user.email}</td>
//                   <td>{user.mobile}</td>
//                   <td>{user.telephone}</td>
//                   <td>{user.city}</td>
//                   <td>{user.country_code}</td>
//                   <td>
//                     <span className={`badge ${
//                       user.status === 'Active' ? 'bg-success' :
//                       user.status === 'Inactive' ? 'bg-warning text-dark' :
//                       'bg-danger'
//                     }`}>
//                       {user.status}
//                     </span>
//                   </td>
//                   <td>{user.role}</td>
//                   <td title={getCompanyName(user.default_company)}>
//                     {getCompanyName(user.default_company)}
//                   </td>
//                   <td title={getAccessibleCompaniesDisplay(user.companies)}>
//                     {getAccessibleCompaniesDisplay(user.companies)}
//                   </td>
//                   <td>{formatDate(user.created_at)}</td>
//                   <td>
//                     <div className="action-icons">
//                       <FaEdit
//                         title="Edit"
//                         onClick={() => onEdit(user)}
//                         className="action-icon edit-icon"
//                       />
//                       <FaTrash
//                         title="Delete"
//                         onClick={() => handleDelete(user.user_id)}
//                         className="action-icon delete-icon"
//                       />
//                     </div>
//                   </td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan="15" className="text-center">
//                   {searchTerm ? 'No users found matching your search' : 'No users found'}
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>

//       {/* Pagination */}
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

// export default UserTable;

//===============================================================
// After fixing filter -Global search issue 


import React, { useEffect, useState } from "react";
import "./UserManagement.css";
import baseURL from "../ApiUrl/Apiurl";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";
import Swal from 'sweetalert2';

const UserTable = ({ onAdd, onEdit }) => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [entriesPerPage, setEntriesPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [companiesData, setCompaniesData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch companies data
  const fetchCompanies = async () => {
    try {
      const response = await fetch(`${baseURL}/companies/`);
      const data = await response.json();
      if (data.status === "success") {
        setCompaniesData(data.data);
      }
    } catch (error) {
      console.error("Failed to load companies data", error);
    }
  };

  // Function to get company name only (hide ID)
  const getCompanyName = (companyId) => {
    if (!companiesData || companiesData.length === 0) return companyId;
    
    const company = companiesData.find(comp => comp.company_id === companyId);
    return company ? company.company_name : companyId;
  };

  // Function to get company ID and name for search
  const getCompanySearchData = (companyId) => {
    if (!companiesData || companiesData.length === 0) return companyId;
    
    const company = companiesData.find(comp => comp.company_id === companyId);
    if (company) {
      return `${company.company_id} ${company.company_name}`;
    }
    return companyId;
  };

  // Function to get accessible companies names and IDs for search
  const getAccessibleCompaniesSearch = (companyIds) => {
    if (!companyIds || !Array.isArray(companyIds)) return '';
    
    if (companiesData.length === 0) {
      return companyIds.join(' ');
    }
    
    const companyData = companyIds.map(companyId => {
      const company = companiesData.find(comp => comp.company_id === companyId);
      return company ? `${company.company_id} ${company.company_name}` : companyId;
    });
    
    return companyData.join(' ');
  };

  // Function to format date for display
  const formatDate = (dateString) => {
    if (!dateString) return '-';
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  // Function to format date in multiple formats for search
  const formatDateForSearch = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    
    if (isNaN(date.getTime())) return '';
    
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    const monthName = date.toLocaleString('en-IN', { month: 'long' });
    const monthShort = date.toLocaleString('en-IN', { month: 'short' });
    const hour = date.getHours().toString().padStart(2, '0');
    const minute = date.getMinutes().toString().padStart(2, '0');
    const second = date.getSeconds().toString().padStart(2, '0');
    
    // Return multiple formats for better searchability
    return [
      `${day}/${month}/${year}`,                    // DD/MM/YYYY
      `${day}/${month}/${year} ${hour}:${minute}:${second}`, // DD/MM/YYYY HH:MM:SS
      `${month}/${day}/${year}`,                    // MM/DD/YYYY
      `${year}-${month}-${day}`,                    // YYYY-MM-DD
      `${year}${month}${day}`,                      // YYYYMMDD
      `${day}-${month}-${year}`,                    // DD-MM-YYYY
      date.toISOString(),                           // ISO string
      monthName,                                    // January, February
      monthShort,                                   // Jan, Feb
      `${year}`,                                    // 2024
      `${month}/${year}`,                           // MM/YYYY
      `${day} ${monthName} ${year}`,               // 15 January 2024
      `${day} ${monthShort} ${year}`,              // 15 Jan 2024
      `${hour}:${minute}`,                          // HH:MM
      `${hour}:${minute}:${second}`,               // HH:MM:SS
    ].join(' ');
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      
      // Fetch companies first
      await fetchCompanies();
      
      // Then fetch users
      try {
        const response = await fetch(`${baseURL}/users/`);
        if (!response.ok) throw new Error("Failed to fetch users");
        const data = await response.json();
        
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
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Enhanced global search functionality
  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredUsers(users);
      setCurrentPage(1);
      return;
    }

    const searchLower = searchTerm.toLowerCase().trim();
    
    const filtered = users.filter((user) => {
      // Get company data for search
      const defaultCompanySearch = getCompanySearchData(user.default_company);
      const accessibleCompaniesSearch = getAccessibleCompaniesSearch(user.companies);
      
      // Get dates in multiple formats for search
      const createdDateFormats = formatDateForSearch(user.created_at);
      
      // Create a comprehensive search string
      const searchableText = [
        // Raw user data
        user.user_id || '',
        user.full_name || '',
        user.username || '',
        user.email || '',
        user.mobile || '',
        user.telephone || '',
        user.city || '',
        user.country_code || '',
        user.status || '',
        user.role || '',
        user.default_company || '',
        user.companies ? user.companies.join(' ') : '',
        user.created_at || '',
        user.updated_at || '',
        
        // Formatted company names and IDs for search
        defaultCompanySearch,
        accessibleCompaniesSearch,
        
        // Dates in multiple formats
        createdDateFormats,
        
        // Display values (exactly as shown in table)
        formatDate(user.created_at),
        getCompanyName(user.default_company),
        user.companies ? user.companies.map(id => getCompanyName(id)).join(' ') : '',
        
        // Status with badge text multiple times for better search
        user.status === 'Active' ? 'Active Active Active' : '',
        user.status === 'Inactive' ? 'Inactive Inactive Inactive' : '',
        user.status === 'Pending' ? 'Pending Pending Pending' : '',
        
        // Role variations for better search
        user.role === 'Service Manager' ? 'Service Manager Manager ServiceManager' : '',
        user.role === 'Service Engineer' ? 'Service Engineer Engineer ServiceEngineer' : '',
        user.role === 'Customer' ? 'Customer Customer' : '',
        
        // Country variations
        user.country_code ? `${user.country_code} country` : '',
        
        // Add any other properties that might exist
        ...Object.values(user).filter(val => 
          val !== null && val !== undefined
        ).map(val => {
          if (typeof val === 'string' || typeof val === 'number') {
            return String(val);
          }
          if (typeof val === 'boolean') {
            return val ? 'true yes active' : 'false no inactive';
          }
          if (Array.isArray(val)) {
            return val.join(' ');
          }
          if (typeof val === 'object' && val !== null) {
            return JSON.stringify(val);
          }
          return '';
        })
      ]
      .join(' ')                    // Combine into one string
      .toLowerCase()                // Make case-insensitive
      .replace(/\s+/g, ' ')         // Normalize spaces
      .trim();
      
      return searchableText.includes(searchLower);
    });
    
    setFilteredUsers(filtered);
    setCurrentPage(1);
  }, [searchTerm, users, companiesData]);

  const handleDelete = async (userId) => {
    const confirmed = await Swal.fire({
      title: "Are you sure?",
      text: `You are about to delete user ID: ${userId}`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (confirmed.isConfirmed) {
      try {
        const response = await fetch(`${baseURL}/users/${userId}/`, {
          method: "DELETE",
        });

        if (!response.ok) throw new Error("Delete failed");

        Swal.fire("Deleted!", "User has been deleted.", "success");

        const updatedUsers = users.filter((u) => u.user_id !== userId);
        setUsers(updatedUsers);
        setFilteredUsers(updatedUsers);
      } catch (error) {
        console.error("Delete error:", error);
        Swal.fire("Error", "Failed to delete user", "error");
      }
    }
  };

  const indexOfLastEntry = currentPage * entriesPerPage;
  const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstEntry, indexOfLastEntry);
  const totalPages = Math.ceil(filteredUsers.length / entriesPerPage);

  if (loading) {
    return (
      <div className="user-management-container">
        <div className="text-center my-4">Loading users and companies...</div>
      </div>
    );
  }

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

        <div className="d-flex align-items-center gap-2">
          <input
            type="text"
            placeholder="Search in all columns..."
            className="form-control"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ minWidth: '250px' }}
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

      {/* Search Results Info */}
      {searchTerm && (
        <div className="alert alert-info mb-3">
          <strong>Search Results:</strong> Found {filteredUsers.length} user(s) matching "{searchTerm}"
        </div>
      )}

      {/* Table */}
      <div className="table-responsive mb-4">
        <table className="table">
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
              <th>Actions</th> 
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
                  <td title={getCompanyName(user.default_company)}>
                    {getCompanyName(user.default_company)}
                  </td>
                  <td title={user.companies ? user.companies.map(id => getCompanyName(id)).join(', ') : '-'}>
                    {user.companies ? user.companies.map(id => getCompanyName(id)).join(', ') : '-'}
                  </td>
                  <td>{formatDate(user.created_at)}</td>
                  <td>
                    <div className="action-icons">
                      <FaEdit
                        title="Edit"
                        onClick={() => onEdit(user)}
                        className="action-icon edit-icon"
                      />
                      <FaTrash
                        title="Delete"
                        onClick={() => handleDelete(user.user_id)}
                        className="action-icon delete-icon"
                      />
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="15" className="text-center">
                  {searchTerm ? `No users found matching "${searchTerm}"` : 'No users found'}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
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
            {(() => {
              const maxVisiblePages = 5;
              let pageNumbers = [];
              
              if (totalPages <= maxVisiblePages) {
                for (let i = 1; i <= totalPages; i++) {
                  pageNumbers.push(i);
                }
              } else {
                let startPage = Math.max(1, currentPage - 2);
                let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
                
                if (endPage - startPage + 1 < maxVisiblePages) {
                  startPage = Math.max(1, endPage - maxVisiblePages + 1);
                }
                
                for (let i = startPage; i <= endPage; i++) {
                  pageNumbers.push(i);
                }
              }
              
              return pageNumbers.map((page) => (
                <button
                  key={page}
                  className={`btn mx-1 ${currentPage === page ? 'btn-primary' : 'btn-outline-primary'}`}
                  onClick={() => setCurrentPage(page)}
                >
                  {page}
                </button>
              ));
            })()}
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
    </div>
  );
};

export default UserTable;