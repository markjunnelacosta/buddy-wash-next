"use client";
import React, { useState } from "react";
import './addLaundryMode.css'

const AddLaundryMode = ({ isOpen, onClose, onSaveData }) => {

    const [category, setCategory] = useState("");
    const [modeName, setModeName] = useState("");
    const [price, setPrice] = useState("");

    const onClick = async () => {
        console.log(category, modeName, price);
        const response = await fetch("/api/laundry-price", {
          method: "POST",
          body: JSON.stringify({
            category: category,
            modeName: modeName,
            price: price
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
                        <p>Add Laundry Mode</p>
                        <hr />
                        <div className="form-group">
                            <p>Category</p>
                            <select
                                value={category}
                                onChange={(e) => setCategory(e.currentTarget.value)}
                            >
                                <option value=""></option>
                                <option value="Wash">Wash Mode</option>
                                <option value="Dry">Dry Mode</option>
                            </select>
                            <p>Mode Name</p>
                            <input
                                type="text"
                                value={modeName}
                                onChange={(e) => setModeName(e.currentTarget.value)}
                            ></input>
                            <p>Price</p>
                            <input
                                type="Number"
                                value={price}
                                onChange={(e) => setPrice(e.currentTarget.value)}
                            ></input>
                        </div>
                        <br />
                        <button className="cancel" onClick={onClose}>Cancel</button>
                        <button className="saveButton" onClick={onClick}>Save</button>
                    </div>

                </div>
            )}
        </>
    );
}

export default AddLaundryMode;