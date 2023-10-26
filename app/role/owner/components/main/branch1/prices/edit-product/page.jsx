"use client";
import React, { useState, useEffect } from "react";
import "./editProduct.css";
import { useRouter } from "next/navigation";

export default function UpdateProduct({
    id,
    productName,
    productPrice,
    onClose,
}) {
    const [newProductName, setNewProductName] = useState(productName);
    const [newProductPrice, setNewProductPrice] = useState(productPrice);

    const router = useRouter();

    const handleSave = async (e) => {
        e.preventDefault();
        console.log({
            id,
            newProductName,
            newProductPrice,
        });
        try {
            const res = await fetch(`http://localhost:3000/api/product/${id}`, {
                method: "PUT",
                headers: {
                    "Content-type": "application/json",
                },

                body: JSON.stringify({
                    id,
                    newProductName,
                    newProductPrice,
                }),
            });

            if (!res.ok) {
                throw new Error("Failed to update product details");
            }

            router.refresh();
            router.push("/role/owner/components/main/branch1/prices");
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <div>
            <div className="form-container">
                <div>
                    <p>New Product</p>
                    <hr />
                    <div className="form-group">
                        <div id="first">
                            {/* Product Name input */}
                            <p>Name</p>
                            <input
                                onChange={(e) => setNewProductName(e.target.value)}
                                value={newProductName}
                            />

                            <div id="second">
                                {/* Price input */}
                                <p>Price</p>
                                <input
                                    onChange={(e) => setNewProductPrice(e.target.value)}
                                    value={newProductPrice}
                                />
                            </div>
                            <br />
                            <button className="cancel" onClick={onClose}>
                                Cancel
                            </button>
                            <button className="save" onClick={handleSave}>
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}




