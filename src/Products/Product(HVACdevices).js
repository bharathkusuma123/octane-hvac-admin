// src/components/Product.js
import React, { useState } from "react";
import ProductForm from "./ProductForm";
import ProductTable from "./ProductTable";

const Product = () => {
  const [isFormVisible, setFormVisible] = useState(false);

  return isFormVisible ? (
    <ProductForm onCancel={() => setFormVisible(false)} onSave={() => setFormVisible(false)} />
  ) : (
    <ProductTable onAdd={() => setFormVisible(true)} />
  );
};

export default Product;
