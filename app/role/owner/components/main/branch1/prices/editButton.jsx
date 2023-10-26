// EditProductPopup.jsx
import React from "react";
import UpdateProduct from "./edit-product/page";

const EditProductPopup = ({ isOpen, product, onClose, onSave }) => {
  if (!isOpen) {
    return null; // If not open, don't render anything
  }

  return (
    <div className="popup-container">
      <div className="popup">
        <UpdateProduct
          id={product._id}
          productName={product.productName}
          productPrice={product.productPrice}
          onClose={onClose}
        />
      </div>
    </div>
  );
};

export default EditProductPopup;
