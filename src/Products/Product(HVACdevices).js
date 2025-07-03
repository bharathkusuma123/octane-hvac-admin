

import React, { useState } from "react";
import ProductForm from "./ProductForm";
import ProductTable from "./ProductTable";

const Product = () => {
  const [isFormVisible, setFormVisible] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null); // Store the entire product object
  const [refreshFlag, setRefreshFlag] = useState(false);

  const handleAdd = () => {
    setCurrentProduct(null);
    setFormVisible(true);
  };

  const handleEdit = (product) => {
    setCurrentProduct(product); // Store the product data
    setFormVisible(true);
  };

  const handleSave = () => {
    setFormVisible(false);
    setRefreshFlag((prev) => !prev);
  };

  return isFormVisible ? (
    <ProductForm
      product={currentProduct} // Pass the product data
      onCancel={() => setFormVisible(false)}
      onSave={handleSave}
    />
  ) : (
    <ProductTable 
      onAdd={handleAdd} 
      onEdit={handleEdit} 
      refreshFlag={refreshFlag} 
    />
  );
};

export default Product;