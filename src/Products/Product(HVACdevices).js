

// import React, { useState } from "react";
// import ProductForm from "./ProductForm";
// import ProductTable from "./ProductTable";

// const Product = () => {
//   const [isFormVisible, setFormVisible] = useState(false);
//   const [currentProduct, setCurrentProduct] = useState(null); // Store the entire product object
//   const [refreshFlag, setRefreshFlag] = useState(false);

//   const handleAdd = () => {
//     setCurrentProduct(null);
//     setFormVisible(true);
//   };

//   const handleEdit = (product) => {
//     setCurrentProduct(product); // Store the product data
//     setFormVisible(true);
//   };

//   const handleSave = () => {
//     setFormVisible(false);
//     setRefreshFlag((prev) => !prev);
//   };

//   return isFormVisible ? (
//     <ProductForm
//       product={currentProduct} // Pass the product data
//       onCancel={() => setFormVisible(false)}
//       onSave={handleSave}
//     />
//   ) : (
//     <ProductTable 
//       onAdd={handleAdd} 
//       onEdit={handleEdit} 
//       refreshFlag={refreshFlag} 
//     />
//   );
// };

// export default Product;




import React, { useState, useEffect } from "react";
import ProductForm from "./ProductForm";
import ProductTable from "./ProductTable";

const Product = () => {
  const [isFormVisible, setFormVisible] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null); // Store the entire product object
  const [refreshFlag, setRefreshFlag] = useState(false);

  // Handle browser back button and swipe gesture when form is open
  useEffect(() => {
    if (isFormVisible) {
      // Push a new history state to trap the back button
      window.history.pushState({ formOpen: true }, '', window.location.pathname);
      
      const handlePopState = (event) => {
        if (isFormVisible) {
          // Prevent default back navigation
          event.preventDefault();
          // Close the form instead of navigating away
          setFormVisible(false);
          setCurrentProduct(null);
          // Push a new state to handle any further back attempts
          window.history.pushState({ formOpen: true }, '', window.location.pathname);
        }
      };
      
      window.addEventListener('popstate', handlePopState);
      
      // Cleanup event listener when form closes
      return () => {
        window.removeEventListener('popstate', handlePopState);
      };
    }
  }, [isFormVisible]);

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