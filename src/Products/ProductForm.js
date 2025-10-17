


// import React, { useState, useEffect, useContext } from "react";
// import "./Product.css";
// import axios from "axios";
// import baseURL from "../ApiUrl/Apiurl";
// import { AuthContext } from "../AuthContext/AuthContext";
// import Swal from "sweetalert2";

// const ProductForm = ({ onCancel, onSave, productId }) => {
//   const { userId, userRole } = useContext(AuthContext);
//   const [formData, setFormData] = useState({
//     product_id: "",
//     product_name: "",
//     product_description: "",
//     created_by: userId,
//     updated_by: userId,
//   });

//   const [isSubmitting, setIsSubmitting] = useState(false);

//   useEffect(() => {
//     if (productId) {
//       const fetchProduct = async () => {
//         try {
//           const res = await axios.get(`${baseURL}/products/${productId}/`);
//           const productData = res.data;

//           setFormData({
//             ...productData,
//             created_at: productData.created_at || "",
//             updated_at: productData.updated_at || ""
//           });
//         } catch (err) {
//           console.error("Error fetching product:", err);
//           Swal.fire({
//             icon: "error",
//             title: "Error",
//             text: "Failed to load product data. Please try again.",
//             confirmButtonColor: "#d33",
//           });
//         }
//       };
//       fetchProduct();
//     }
//   }, [productId]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

// const handleSubmit = async (e) => {
//   e.preventDefault();
//   setIsSubmitting(true);

//   try {
//     const payload = {
//       product_name: formData.product_name,
//       product_description: formData.product_description,
//       updated_by: userId,
//     };

//     if (productId) {
//       // Update
//       await axios.put(`${baseURL}/products/${productId}/`, payload, {
//         headers: { "Content-Type": "application/json" },
//       });
//       Swal.fire({
//         icon: "success",
//         title: "Success!",
//         text: "Product updated successfully!",
//         confirmButtonColor: "#3085d6",
//       }).then(() => {
//         if (onSave) onSave();
//       });
//     } else {
//       // Create
//       const createPayload = {
//         ...payload,
//         product_id: formData.product_id,
//         created_by: userId,
//       };

//       await axios.post(`${baseURL}/products/`, createPayload, {
//         headers: { "Content-Type": "application/json" },
//       });

//       Swal.fire({
//         icon: "success",
//         title: "Success!",
//         text: "Product created successfully!",
//         confirmButtonColor: "#3085d6",
//       }).then(() => {
//         if (onSave) onSave();
//       });
//     }
//   } catch (err) {
//     console.error("Error saving product:", err);
//     const errorMessage =
//       err.response?.data?.message || "Failed to save product. Please try again.";
//     Swal.fire({
//       icon: "error",
//       title: "Error",
//       text: errorMessage,
//       confirmButtonColor: "#d33",
//     });
//   } finally {
//     setIsSubmitting(false);
//   }
// };

//   return (
//     <div className="container mt-4 service-request-form">
//       <div className="card">
//         <div className="card-header">
//           <h5 className="mb-1">{productId ? "Edit Product" : "Add Product"}</h5>
//           <h6 className="text" style={{ color: "white" }}>
//             Fill in product details below
//           </h6>
//           <h6 className="text" style={{ color: "white" }}>
//             Logged in as: <strong>{userId}, {userRole}</strong>
//           </h6>
//         </div>
//         <div className="card-body">
//           <form onSubmit={handleSubmit}>
//             <div className="row g-3">
//               <div className="col-md-4">
//                 <label className="form-label">Product ID</label>
//                 <input
//                   type="text"
//                   name="product_id"
//                   value={formData.product_id}
//                   onChange={handleChange}
//                   className="form-control"
//                   placeholder="Enter Product ID"
//                   required
//                   readOnly={!!productId}
//                 />
//               </div>

//               <div className="col-md-4">
//                 <label className="form-label">Product Name</label>
//                 <input
//                   type="text"
//                   name="product_name"
//                   value={formData.product_name}
//                   onChange={handleChange}
//                   className="form-control"
//                   placeholder="Enter Product Name"
//                   required
//                 />
//               </div>

//               <div className="col-md-4">
//                 <label className="form-label">Product Description</label>
//                 <input
//                   type="text"
//                   name="product_description"
//                   value={formData.product_description}
//                   onChange={handleChange}
//                   className="form-control"
//                   placeholder="Enter Description"
//                 />
//               </div>

//               <div className="d-flex justify-content-center mt-3 gap-3">
//                 <button
//                   type="submit"
//                   className="submit-btn"
//                   disabled={isSubmitting}
//                 >
//                   {isSubmitting ? (productId ? "Updating..." : "Creating...") : "Submit"}
//                 </button>
//                 <button
//                   type="button"
//                   className="btn btn-secondary"
//                   onClick={onCancel}
//                   disabled={isSubmitting}
//                 >
//                   Cancel
//                 </button>
//               </div>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProductForm;




import React, { useState, useEffect, useContext } from "react";
import "./Product.css";
import axios from "axios";
import baseURL from "../ApiUrl/Apiurl";
import { AuthContext } from "../AuthContext/AuthContext";
import Swal from "sweetalert2";

const ProductForm = ({ onCancel, onSave, product }) => {
  const { userId, userRole } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState({
    product_id: "",
    product_name: "",
    product_description: "",
    created_by: "",
    updated_by: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch user details from API
  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const userIdFromStorage = localStorage.getItem("userId") || "USRA1";
        const response = await axios.get(`http://175.29.21.7:8006/users/${userIdFromStorage}/`);
        
        if (response.data.status === "success") {
          const userData = response.data.data;
          setUsername(userData.username);
          
          // Set form data with username
          if (product) {
            // Edit mode
            setFormData({
              product_id: product.product_id || "",
              product_name: product.product_name || "",
              product_description: product.product_description || "",
              created_by: product.created_by || userData.username,
              updated_by: userData.username,
            });
          } else {
            // Add mode
            setFormData({
              product_id: "",
              product_name: "",
              product_description: "",
              created_by: userData.username,
              updated_by: userData.username,
            });
          }
        }
      } catch (error) {
        console.error("Error fetching user details:", error);
        // Fallback to userId if API fails
        setUsername(userId);
        setFormData(prev => ({
          ...prev,
          created_by: userId,
          updated_by: userId,
        }));
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserDetails();
  }, [product, userId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (isLoading) {
      Swal.fire({
        icon: "warning",
        title: "Please wait",
        text: "User details are still loading...",
        confirmButtonColor: "#3085d6",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const payload = {
        product_id: formData.product_id,
        product_name: formData.product_name,
        product_description: formData.product_description,
        updated_by: username || userId, // Use username if available, otherwise fallback to userId
      };

      if (product) {
        // Update existing product
        await axios.put(`${baseURL}/products/${product.product_id}/`, payload);
        Swal.fire({
          icon: "success",
          title: "Success!",
          text: "Product updated successfully!",
          confirmButtonColor: "#3085d6",
        });
      } else {
        // Create new product
        payload.created_by = username || userId; // Use username if available, otherwise fallback to userId
        await axios.post(`${baseURL}/products/`, payload);
        Swal.fire({
          icon: "success",
          title: "Success!",
          text: "Product created successfully!",
          confirmButtonColor: "#3085d6",
        });
      }
      
      if (onSave) onSave();
    } catch (err) {
      console.error("Error saving product:", err);
      const errorMessage = err.response?.data?.message || 
        "Failed to save product. Please try again.";
      Swal.fire({
        icon: "error",
        title: "Error",
        text: errorMessage,
        confirmButtonColor: "#d33",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="container mt-4 service-request-form">
        <div className="card">
          <div className="card-body text-center">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="mt-2">Loading user details...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-4 service-request-form">
      <div className="card">
        <div className="card-header">
          <h5 className="mb-1">{product ? "Edit Product" : "Add Product"}</h5>
          <h6 className="text" style={{ color: "white" }}>
            Fill in product details below
          </h6>
          <h6 className="text" style={{ color: "white" }}>
            Logged in as: <strong>{username || userId}, {userRole}</strong>
          </h6>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="row g-3">
              <div className="col-md-4">
                <label className="form-label">Product ID</label>
                <input
                  type="text"
                  name="product_id"
                  value={formData.product_id}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="Enter Product ID"
                  required
                  readOnly={!!product} // Make read-only in edit mode
                />
              </div>

              <div className="col-md-4">
                <label className="form-label">Product Name</label>
                <input
                  type="text"
                  name="product_name"
                  value={formData.product_name}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="Enter Product Name"
                  required
                />
              </div>

              <div className="col-md-4">
                <label className="form-label">Product Description</label>
                <input
                  type="text"
                  name="product_description"
                  value={formData.product_description}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="Enter Description"
                />
              </div>

              {/* Display current user info */}
              <div className="col-12">
                <div className="alert alert-info py-2">
                  <small>
                    <strong>Current User:</strong> {username || userId} | 
                    <strong> Created By:</strong> {formData.created_by} | 
                    <strong> Updated By:</strong> {formData.updated_by}
                  </small>
                </div>
              </div>

              <div className="d-flex justify-content-center mt-3 gap-3">
                <button
                  type="submit"
                  className="submit-btn"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (product ? "Updating..." : "Creating...") : "Submit"}
                </button>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={onCancel}
                  disabled={isSubmitting}
                >
                  Cancel
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProductForm;