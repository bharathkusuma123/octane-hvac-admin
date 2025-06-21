import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import baseURL from "../ApiUrl/Apiurl";
import "./Product.css";

const ProductView = () => {
  const { product_id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`${baseURL}/products/${product_id}/`);
        setProduct(response.data);
        setError(null);
      } catch (err) {
        console.error("Error fetching product:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [product_id]);

  const formatDate = (dateString) => {
    if (!dateString) return '-';
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  if (loading) {
    return (
      <div className="container my-4">
        <div className="comp-wrapper p-4 text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p>Loading product details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container my-4">
        <div className="comp-wrapper p-4">
          <div className="alert alert-danger" role="alert">
            Error loading product: {error}
          </div>
          <button className="btn btn-primary" onClick={() => navigate(-1)}>
            Go Back
          </button>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container my-4">
        <div className="comp-wrapper p-4">
          <div className="alert alert-warning" role="alert">
            Product not found
          </div>
          <button className="btn btn-primary" onClick={() => navigate(-1)}>
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container my-4">
      <div className="comp-wrapper p-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="comp-title">Product Details</h2>
          <button className="btn btn-secondary" onClick={() => navigate(-1)}>
            Back to List
          </button>
        </div>

        <div className="card">
          <div className="card-header">
            <h5>{product.product_name}</h5>
          </div>
          <div className="card-body">
            <div className="row">
              <div className="col-md-6">
                <div className="mb-3">
                  <label className="form-label fw-bold">Product ID</label>
                  <p>{product.product_id}</p>
                </div>
                <div className="mb-3">
                  <label className="form-label fw-bold">Product Name</label>
                  <p>{product.product_name}</p>
                </div>
                <div className="mb-3">
                  <label className="form-label fw-bold">Description</label>
                  <p>{product.product_description || "-"}</p>
                </div>
              </div>
              <div className="col-md-6">
                <div className="mb-3">
                  <label className="form-label fw-bold">Created At</label>
                  <p>{formatDate(product.created_at)}</p>
                </div>
                <div className="mb-3">
                  <label className="form-label fw-bold">Updated At</label>
                  <p>{formatDate(product.updated_at)}</p>
                </div>
                <div className="mb-3">
                  <label className="form-label fw-bold">Created By</label>
                  <p>{product.created_by || "-"}</p>
                </div>
                <div className="mb-3">
                  <label className="form-label fw-bold">Updated By</label>
                  <p>{product.updated_by || "-"}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductView;