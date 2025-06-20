
// import React, { useState, useEffect, useContext} from "react";
// import "./Product.css";
// import axios from "axios";
// import baseURL from "../ApiUrl/Apiurl";
// import { AuthContext } from "../AuthContext/AuthContext";

// const ProductForm = ({ onCancel, onSave, productId }) => {
//   const { userId, userRole } = useContext(AuthContext);
//   const [formData, setFormData] = useState({
//     product_id: "",
//     product_name: "",
//     product_description: "",
//     created_by: userId,
//     updated_by: userId,
//     // created_at: "",
//     // updated_at: ""
//   });

//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     if (productId) {
//       const fetchProduct = async () => {
//         try {
//           const res = await axios.get(`${baseURL}/products/${productId}/`);
//           const productData = res.data;
          
//           // Convert ISO dates to datetime-local format
//           const formatDateForInput = (isoDate) => {
//             if (!isoDate) return "";
//             const date = new Date(isoDate);
//             const localDateTime = new Date(date.getTime() - (date.getTimezoneOffset() * 60000))
//               .toISOString()
//               .slice(0, 16);
//             return localDateTime;
//           };

//           setFormData({
//             ...productData,
//             created_at: formatDateForInput(productData.created_at),
//             updated_at: formatDateForInput(productData.updated_at)
//           });
//         } catch (err) {
//           console.error("Error fetching product:", err);
//           setError("Failed to load product data");
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

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsSubmitting(true);
//     setError(null);

//     // Convert datetime-local input back to ISO string
//     const toISOStringWithSeconds = (localDateTime) => {
//       if (!localDateTime) return null;
//       return new Date(localDateTime).toISOString();
//     };

//     const payload = {
//       ...formData,
//       created_at: toISOStringWithSeconds(formData.created_at),
//       updated_at: toISOStringWithSeconds(formData.updated_at)
//     };

//     try {
//       if (productId) {
//         await axios.put(
//           `${baseURL}/products/${productId}/`,
//           payload,
//           {
//             headers: { "Content-Type": "application/json" }
//           }
//         );
//       } else {
//         await axios.post(
//           `${baseURL}/products/`,
//           payload,
//           {
//             headers: { "Content-Type": "application/json" }
//           }
//         );
//       }
//       onSave();
//     } catch (err) {
//       console.error("Error saving product:", err);
//       const errorMessage =
//         err.response?.data?.message ||
//         err.response?.data?.error ||
//         JSON.stringify(err.response?.data) ||
//         err.message ||
//         "Failed to save product";
//       setError(errorMessage);
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <div className="container mt-4 service-request-form">
//       <div className="card">
//         <div className="card-header">
//           <h5 className="mb-1">{productId ? "Edit Product" : "Add Product"}</h5>
//           <h6 className="text" style={{ color: "white" }}>Fill in product details below</h6>
//         </div>
//         <div className="card-body">
//           {error && <div className="alert alert-danger">{error}</div>}
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

//               {/* <div className="col-md-4">
//                 <label className="form-label">Created By</label>
//                 <input
//                   type="text"
//                   name="created_by"
//                   value={formData.created_by}
//                   onChange={handleChange}
//                   className="form-control"
//                   placeholder="Enter Creator"
//                 />
//               </div> */}

//               {/* <div className="col-md-4">
//                 <label className="form-label">Updated By</label>
//                 <input
//                   type="text"
//                   name="updated_by"
//                   value={formData.updated_by}
//                   onChange={handleChange}
//                   className="form-control"
//                   placeholder="Enter Updater"
//                 />
//               </div> */}

//               {/* <div className="col-md-4">
//                 <label className="form-label">Created At</label>
//                 <input
//                   type="datetime-local"
//                   name="created_at"
//                   value={formData.created_at}
//                   onChange={handleChange}
//                   className="form-control"
//                 />
//               </div> */}

//               {/* <div className="col-md-4">
//                 <label className="form-label">Updated At</label>
//                 <input
//                   type="datetime-local"
//                   name="updated_at"
//                   value={formData.updated_at}
//                   onChange={handleChange}
//                   className="form-control"
//                 />
//               </div> */}

//               <div className="d-flex justify-content-center mt-3 gap-3">
//                 <button
//                   type="submit"
//                   className="submit-btn"
//                   disabled={isSubmitting}
//                 >
//                   {isSubmitting ? "Submitting..." : "Submit"}
//                 </button>
//                 <button
//                   type="button"
//                   className="btn btn-secondary"
//                   onClick={onCancel}
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
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ProductForm = ({ onCancel, onSave, productId }) => {
  const { userId, userRole } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    product_id: "",
    product_name: "",
    product_description: "",
    created_by: userId,
    updated_by: userId,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (productId) {
      const fetchProduct = async () => {
        try {
          const res = await axios.get(`${baseURL}/products/${productId}/`);
          const productData = res.data;

          setFormData({
            ...productData,
            created_at: productData.created_at || "",
            updated_at: productData.updated_at || ""
          });
        } catch (err) {
          console.error("Error fetching product:", err);
          toast.error("Failed to load product data. Please try again.", {
            autoClose: 5000,
          });
        }
      };
      fetchProduct();
    }
  }, [productId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const payload = {
        ...formData,
        updated_by: userId,
      };

      if (productId) {
        await axios.put(`${baseURL}/products/${productId}/`, payload, {
          headers: { "Content-Type": "application/json" }
        });
        toast.success("Product updated successfully!", {
          autoClose: 3000,
          onClose: onSave
        });
      } else {
        await axios.post(`${baseURL}/products/`, payload, {
          headers: { "Content-Type": "application/json" }
        });
        toast.success("Product created successfully!", {
          autoClose: 3000,
          onClose: onSave
        });
      }
    } catch (err) {
      console.error("Error saving product:", err);
      const errorMessage = err.response?.data?.message || 
                         "Failed to save product. Please try again.";
      toast.error(errorMessage, {
        autoClose: 5000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mt-4 service-request-form">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <div className="card">
        <div className="card-header">
          <h5 className="mb-1">{productId ? "Edit Product" : "Add Product"}</h5>
          <h6 className="text" style={{ color: "white" }}>
            Fill in product details below
          </h6>
          <h6 className="text" style={{ color: "white" }}>
            Logged in as: <strong>{userId}, {userRole}</strong>
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
                  readOnly={!!productId}
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

              <div className="d-flex justify-content-center mt-3 gap-3">
                <button
                  type="submit"
                  className="submit-btn"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (productId ? "Updating..." : "Creating...") : "Submit"}
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
