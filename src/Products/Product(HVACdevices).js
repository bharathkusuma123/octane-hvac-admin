import React, { useState } from "react";
import ProductForm from "./ProductForm";
import ProductTable from "./ProductTable";

const Product = () => {
  const [isFormVisible, setFormVisible] = useState(false);
  const [editProductId, setEditProductId] = useState(null);
  const [refreshFlag, setRefreshFlag] = useState(false); // for reloading products in table

  const handleAdd = () => {
    setEditProductId(null);
    setFormVisible(true);
  };

  const handleEdit = (productId) => {
    setEditProductId(productId);
    setFormVisible(true);
  };

  // Called after save to close form, refresh table, and alert user
  const handleSave = () => {
    setFormVisible(false);
    setRefreshFlag((prev) => !prev); // toggle to refresh product table
    alert(editProductId ? "Product updated successfully!" : "Product added successfully!");
  };

  return isFormVisible ? (
    <ProductForm
      productId={editProductId}
      onCancel={() => setFormVisible(false)}
      onSave={handleSave}
    />
  ) : (
    <ProductTable onAdd={handleAdd} onEdit={handleEdit} refreshFlag={refreshFlag} />
  );
};

export default Product;
