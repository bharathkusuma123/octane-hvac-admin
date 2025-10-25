// // components/TopNavbar.js
// import React, { useEffect, useState } from "react";
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import logo from "../Logos/hvac-logo-new.jpg";
// import baseURL from "../ApiUrl/Apiurl";
// import { useCompany } from "../AuthContext/CompanyContext";

// const TopNavbar = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const userRole = localStorage.getItem("userRole");
//   const userId = localStorage.getItem("userId");
//  const { selectedCompany, updateCompany } = useCompany();
//   const [userData, setUserData] = useState(null);
//   // const [selectedCompany, setSelectedCompany] = useState("");

//   const handleLogout = () => {
//     localStorage.removeItem("userRole");
//     localStorage.removeItem("userId");
//       localStorage.removeItem("selectedCompany");
//     navigate("/");
//   };

// useEffect(() => {
//     if (userRole === "Admin" && userId) {
//       fetch(`${baseURL}/users/`)
//         .then((res) => res.json())
//         .then((data) => {
//           const matchedUser = Array.isArray(data)
//             ? data.find((user) => user.user_id === userId)
//             : null;

//           if (matchedUser) {
//             setUserData(matchedUser);
//             const storedCompany = localStorage.getItem("selectedCompany");
//             if (!storedCompany) {
//               updateCompany(matchedUser.default_company);
//             }
//           }
//         })
//         .catch((err) => console.error("Failed to load user data", err));
//     }
//   }, [userRole, userId]);

//   if (userRole !== "Admin") return null;

//   const navItems = [
//     { path: "/admin/component", label: "Components" },
//     { path: "/admin/products", label: "Products" },
//     { path: "/admin/resource-management", label: "Resources" },
//     { path: "/admin/user-management", label: "Users" },
//   ];

//   const handleCompanyChange = (e) => {
//     updateCompany(e.target.value);
//   };

//   return (
//     <nav className="top-navbar">
//       <div className="nav-container">
//         <div className="nav-brand">
//           <img src={logo} alt="Company Logo" style={{ width: "100px", height: "50px" }} />
//         </div>

//         <div className="nav-links">
//           {navItems.map((item) => (
//             <Link
//               key={item.path}
//               to={item.path}
//               className={location.pathname === item.path ? "active" : ""}
//             >
//               {item.label}
//             </Link>
//           ))}

//           {userData && (
//             <select
//         className="form-select ms-3"
//         value={selectedCompany}
//         onChange={handleCompanyChange}
//         style={{ minWidth: "150px" }}
//       >
//               <option value={userData.default_company}>
//                 {userData.default_company}
//               </option>
//               {Array.isArray(userData.companies) &&
//                 userData.companies
//                   .filter((comp) => comp !== userData.default_company)
//                   .map((comp) => (
//                     <option key={comp} value={comp}>
//                       {comp}
//                     </option>
//                   ))}
//             </select>
//           )}
//         </div>

//         <div className="nav-user">
//           <button onClick={handleLogout} className="logout-btn">
//             Logout
//           </button>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default TopNavbar;


//===================================================================

import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../Logos/hvac-logo-new.jpg";
import baseURL from "../ApiUrl/Apiurl";
import { useCompany } from "../AuthContext/CompanyContext";

const TopNavbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const userRole = localStorage.getItem("userRole");
  const userId = localStorage.getItem("userId");
  const { selectedCompany, updateCompany } = useCompany();
  const [userData, setUserData] = useState(null);
  const [companiesData, setCompaniesData] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleLogout = () => {
    localStorage.removeItem("userRole");
    localStorage.removeItem("userId");
    localStorage.removeItem("selectedCompany");
    updateCompany("");
    navigate("/");
  };

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

  // Function to get company display name in format: "TCS (COMP1)"
  const getCompanyDisplayName = (companyId) => {
    if (!companiesData || companiesData.length === 0) return companyId;
    
    const company = companiesData.find(comp => comp.company_id === companyId);
    if (company) {
      return `${company.company_name} (${company.company_id})`;
    }
    return companyId;
  };

  useEffect(() => {
    if (userRole === "Admin" && userId) {
      setLoading(true);
      
      // Fetch companies first
      fetchCompanies().then(() => {
        // Then fetch user data
        fetch(`${baseURL}/users/`)
          .then((res) => res.json())
          .then((data) => {
            const matchedUser = Array.isArray(data)
              ? data.find((user) => user.user_id === userId)
              : null;

            if (matchedUser) {
              setUserData(matchedUser);
              const storedCompany = localStorage.getItem("selectedCompany");
              if (!storedCompany) {
                updateCompany(matchedUser.default_company);
              }
            }
            setLoading(false);
          })
          .catch((err) => {
            console.error("Failed to load user data", err);
            setLoading(false);
          });
      });
    }
  }, [userRole, userId, updateCompany]);

  if (userRole !== "Admin") return null;

  const navItems = [
    { path: "/admin/component", label: "Components" },
    { path: "/admin/products", label: "Products" },
    { path: "/admin/resource-management", label: "Resources" },
    { path: "/admin/user-management", label: "Users" },
  ];

  const handleCompanyChange = (e) => {
    updateCompany(e.target.value);
  };

  if (loading) {
    return (
      <nav className="top-navbar">
        <div className="nav-container">
          <div className="nav-brand">
            <img src={logo} alt="Company Logo" style={{ width: "100px", height: "50px" }} />
          </div>
          <div className="nav-links">
            <span>Loading companies...</span>
          </div>
        </div>
      </nav>
    );
  }

  return (
    <nav className="top-navbar">
      <div className="nav-container">
        <div className="nav-brand">
          <img src={logo} alt="Company Logo" style={{ width: "100px", height: "50px" }} />
        </div>

        <div className="nav-links">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={location.pathname === item.path ? "active" : ""}
            >
              {item.label}
            </Link>
          ))}

          {userData && (
            <select
              className="form-select ms-3"
              value={selectedCompany}
              onChange={handleCompanyChange}
              style={{ minWidth: "220px" }}
              title={getCompanyDisplayName(selectedCompany)}
            >
              <option value={userData.default_company}>
                {getCompanyDisplayName(userData.default_company)}
              </option>
              {Array.isArray(userData.companies) &&
                userData.companies
                  .filter((comp) => comp !== userData.default_company)
                  .map((comp) => (
                    <option key={comp} value={comp}>
                      {getCompanyDisplayName(comp)}
                    </option>
                  ))}
            </select>
          )}
        </div>

        <div className="nav-user">
          <button onClick={handleLogout} className="logout-btn">
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default TopNavbar;


