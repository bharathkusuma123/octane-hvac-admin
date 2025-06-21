import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import baseURL from "../ApiUrl/Apiurl";
import "./ComponentView.css";

const ComponentView = () => {
  const { component_id } = useParams();
  const [component, setComponent] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchComponent = async () => {
      try {
        const response = await fetch(`${baseURL}/components/${component_id}/`);
        const data = await response.json();
        setComponent(data.data);
      } catch (error) {
        console.error("Error fetching component details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchComponent();
  }, [component_id]);

  if (loading)
    return (
      <div className="text-center my-5">
        <div className="spinner-border text-primary"></div>
        <p>Loading component details...</p>
      </div>
    );

  if (!component)
    return <div className="alert alert-danger">Component not found</div>;

  return (
    <div className="container mt-4 service-request-formview">
      <div className="card">
        <div className="card-header d-flex justify-content-between align-items-center">
          <div>
            <h5 className="mb-1">View Component</h5>
            <h6 className="text-white mb-0">Detailed component information</h6>
          </div>
          <button className="btn btn-light btn-sm" onClick={() => navigate(-1)}>
            &larr; Back
          </button>
        </div>
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-bordered table-striped">
              <tbody>
                <tr>
                  <th>Component ID</th>
                  <td>{component.component_id}</td>
                </tr>
                <tr>
                  <th>Component Name</th>
                  <td>{component.component_name}</td>
                </tr>
                <tr>
                  <th>Description</th>
                  <td>{component.component_description}</td>
                </tr>
                <tr>
                  <th>Created At</th>
                  <td>{new Date(component.created_at).toLocaleString()}</td>
                </tr>
                <tr>
                  <th>Updated At</th>
                  <td>{new Date(component.updated_at).toLocaleString()}</td>
                </tr>
                <tr>
                  <th>Created By</th>
                  <td>{component.created_by}</td>
                </tr>
                <tr>
                  <th>Updated By</th>
                  <td>{component.updated_by}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComponentView;