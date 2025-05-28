// src/components/ProductTable.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Product(HVACdevices).css";

const ProductTable = ({ onAdd }) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [entriesPerPage, setEntriesPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch products from API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://175.29.21.7:8006/products/");
        
        // Handle different response structures
        let productsData = [];
        if (Array.isArray(response.data)) {
          productsData = response.data;
        } else if (Array.isArray(response.data.data)) {
          productsData = response.data.data;
        } else if (Array.isArray(response.data.results)) {
          productsData = response.data.results;
        }

        console.log("Fetched products:", productsData);
        setProducts(productsData);
        setFilteredProducts(productsData);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching products:", err);
        setError(err.message);
        setLoading(false);
        setProducts([]);
        setFilteredProducts([]);
      }
    };

    fetchProducts();
  }, []);

  // Filter products based on search term
  useEffect(() => {
    const filtered = products.filter(product => 
      product && 
      Object.values(product)
        .join(" ")
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(filtered);
    setCurrentPage(1);
  }, [searchTerm, products]);

  // Pagination
  const indexOfLastEntry = currentPage * entriesPerPage;
  const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstEntry, indexOfLastEntry);
  const totalPages = Math.ceil(filteredProducts.length / entriesPerPage);

  // Format date
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
          <button className="btn btn-primary" onClick={() => window.location.reload()}>
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

        <div className="table-responsive">
          <table className="table table-bordered table-striped">
            <thead className="table-light">
              <tr>
                <th>S.No</th>
                <th>Product ID</th>
                <th>Product Name</th>
                <th>Description</th>
                <th>PM Group</th>
                <th>Created At</th>
                <th>Updated At</th>
                <th>Created By</th>
                <th>Updated By</th>
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
                    <td>{product.pm_group || "-"}</td>
                    <td>{formatDate(product.created_at)}</td>
                    <td>{formatDate(product.updated_at)}</td>
                    <td>{product.created_by || "-"}</td>
                    <td>{product.updated_by || "-"}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="9" className="text-center">
                    {searchTerm ? "No matching products found" : "No products available"}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {filteredProducts.length > entriesPerPage && (
          <div className="pagination-controls d-flex justify-content-center mt-3">
            <button
              className="btn btn-outline-primary me-2"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(prev => prev - 1)}
            >
              Previous
            </button>
            <span className="align-self-center mx-2">
              Page {currentPage} of {totalPages}
            </span>
            <button
              className="btn btn-outline-primary ms-2"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(prev => prev + 1)}
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductTable;