"use client";
import React, { useState } from "react";
import './addProduct.css'


const OwnerPage = ({ isOpen, onClose, onSaveData }) => {
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");

  const onClick = async () => {
    console.log(productName, productPrice);
    const response = await fetch("/api/product", {
      method: "POST",
      body: JSON.stringify({
        productName: productName,
        productPrice: productPrice,
      }),
    });

    console.log(response);

    onSaveData();
    onClose();
  };

  return (
    <>
      {isOpen && (
        <div className="form-container visible">
          <div>
            <p>New Product</p>
            <hr />
            <div className="form-group">
              <div id="first">
                <p>Product</p>
                <input
                  type="text"
                  placeholder="Product Name"
                  value={productName}
                  onChange={(e) => setProductName(e.currentTarget.value)}>
                </input>
              </div>

              <div id="second">
                <p>Price</p>
                <input
                  type="text"
                  placeholder="Price"
                  value={productPrice}
                  onChange={(e) => setProductPrice(e.currentTarget.value)}>
                </input>
              </div>

            </div>
            <br />
            <button className="cancel" onClick={onClose}>Cancel</button>
            <button className="save" onClick={onClick}>Save</button>
          </div>
        </div>
      )}
    </>
  );
};

export default OwnerPage;


