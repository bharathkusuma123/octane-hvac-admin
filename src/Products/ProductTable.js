import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaEdit, FaTrash } from "react-icons/fa";
import "./Product.css";

const ProductTable = ({ onAdd, onEdit, refreshFlag }) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [entriesPerPage, setEntriesPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://175.29.21.7:8006/products/");
      let productsData = [];

      if (Array.isArray(response.data)) {
        productsData = response.data;
      } else if (Array.isArray(response.data.data)) {
        productsData = response.data.data;
      } else if (Array.isArray(response.data.results)) {
        productsData = response.data.results;
      }

      // Sort by created_at descending (newest first)
      productsData.sort((a, b) => {
        const dateA = new Date(a.created_at).getTime() || 0;
        const dateB = new Date(b.created_at).getTime() || 0;
        return dateB - dateA; // descending order
      });

      setProducts(productsData);
      setFilteredProducts(productsData);
      setError(null);
    } catch (err) {
      console.error("Error fetching products:", err);
      setError(err.message);
      setProducts([]);
      setFilteredProducts([]);
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    fetchProducts();
  }, [refreshFlag]); // refetch when refreshFlag toggles

  useEffect(() => {
    const filtered = products.filter(
      (product) =>
        product &&
        Object.values(product)
          .join(" ")
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(filtered);
    setCurrentPage(1);
  }, [searchTerm, products]);

  const indexOfLastEntry = currentPage * entriesPerPage;
  const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstEntry, indexOfLastEntry);
  const totalPages = Math.ceil(filteredProducts.length / entriesPerPage);

  const formatDate = (timestamp) => {
    if (!timestamp) return "-";
    try {
      const date = new Date(timestamp);
      return isNaN(date.getTime()) ? timestamp : date.toLocaleString();
    } catch {
      return timestamp;
    }
  };

  if (loading) {
    return (
      <div className="container my-4">
        <div className="comp-wrapper p-4 text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p>Loading products...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container my-4">
        <div className="comp-wrapper p-4">
          <div className="alert alert-danger" role="alert">
            Error loading products: {error}
          </div>
          <button className="btn btn-primary" onClick={fetchProducts}>
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container my-4">
      <div className="comp-wrapper p-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h2 className="comp-title">Product List</h2>
          <button className="btn btn-primary" onClick={onAdd}>
            Add Product
          </button>
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
            placeholder="Search products..."
            className="form-control search-input w-auto"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="table-responsive mb-4">
          <table className="table ">
            <thead className="product-table-header">
              <tr>
                <th>S.No</th>
                <th>Product ID</th>
                <th>Product Name</th>
                <th>Description</th>
                {/* <th>PM Group</th> */}
                <th>Created At</th>
                <th>Updated At</th>
                <th>Created By</th>
                <th>Updated By</th>
                {/* <th>Actions</th> */}
              </tr>
            </thead>

            <tbody>
              {currentProducts.length > 0 ? (
                currentProducts.map((product, index) => (
                  <tr key={product.product_id || index}>
                    <td>{indexOfFirstEntry + index + 1}</td>
                    <td>{product.product_id}</td>
                    <td>{product.product_name}</td>
                    <td>{product.product_description || "-"}</td>
                    {/* <td>{product.pm_group || "-"}</td> */}
                    <td>{formatDate(product.created_at)}</td>
                    <td>{formatDate(product.updated_at)}</td>
                    <td>{product.created_by || "-"}</td>
                    <td>{product.updated_by || "-"}</td>
                    {/* <td>
                      <FaEdit
                        className="text-primary me-2"
                        style={{ cursor: "pointer" }}
                        title="Edit"
                        onClick={() => onEdit(product.product_id)}
                      />
                      <FaTrash
                        className="text-danger"
                        style={{ cursor: "pointer" }}
                        title="Delete"
                        onClick={async () => {
                          if (
                            window.confirm(
                              "Are you sure you want to delete this product?"
                            )
                          ) {
                            try {
                              await axios.delete(
                                `http://175.29.21.7:8006/products/${product.product_id}/`
                              );
                              alert("Product deleted successfully");
                              fetchProducts();
                            } catch (err) {
                              alert("Failed to delete product: " + err.message);
                            }
                          }
                        }}
                      />
                    </td> */}
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="10" className="text-center">
                    No products found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {totalPages > 1 && (
          <nav aria-label="Page navigation">
            <ul className="pagination justify-content-center">
              <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
                <button
                  className="page-link"
                  onClick={() => setCurrentPage(currentPage - 1)}
                >
                  Previous
                </button>
              </li>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <li
                  key={page}
                  className={`page-item ${currentPage === page ? "active" : ""}`}
                >
                  <button className="page-link" onClick={() => setCurrentPage(page)}>
                    {page}
                  </button>
                </li>
              ))}

              <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
                <button
                  className="page-link"
                  onClick={() => setCurrentPage(currentPage + 1)}
                >
                  Next
                </button>
              </li>
            </ul>
          </nav>
        )}
      </div>
    </div>
  );
};

export default ProductTable;
