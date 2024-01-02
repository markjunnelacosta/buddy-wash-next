"use client";
import React, { useState } from "react";
import './addLaundryMode.css'

const AddLaundryMode = ({ isOpen, onClose, onSaveData }) => {

    const [category, setCategory] = useState("");
    const [modeName, setModeName] = useState("");
    const [price, setPrice] = useState("");
    const [timer, setTimer] = useState("");
    const [showTimerInput, setShowTimerInput] = useState(false);

    const onClick = async () => {
        if (
            !category ||
            !modeName ||
            !price
          ) { 
            alert("Please fill in all required fields.");
            return;
          }
      
          const numberRegex = /^\d+$/;
          if (!numberRegex.test(price)) {
            alert("Invalid characters in price. Please enter a valid number.");
            return;
          }

        //   if (!numberRegex.test(timer)) {
        //     alert("Invalid characters in timer. Please enter a valid number.");
        //     return;
        //   }

        console.log(category, modeName, price);
        const response = await fetch("/api/laundry-price", {
            method: "POST",
            body: JSON.stringify({
                category: category,
                modeName: modeName,
                price: price,
                timer: showTimerInput ? timer : undefined,
            }),
        });

        console.log(response);

        onSaveData();
        onClose();
    };

    const handleCategoryChange = (e) => {
        setCategory(e.currentTarget.value);
        setShowTimerInput(e.currentTarget.value === "Wash" || e.currentTarget.value === "Dry");
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
                                onChange={handleCategoryChange}
                            >
                                <option value=""></option>
                                <option value="Wash">Wash Mode</option>
                                <option value="Dry">Dry Mode</option>
                                <option value="Weight">Weight</option>
                                <option value="Fold">Fold</option>
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
                            {showTimerInput && (
                                <>
                                    <p>Timer</p>
                                    <input
                                        type="number"
                                        value={timer}
                                        onChange={(e) => setTimer(e.currentTarget.value)}
                                    ></input>
                                </>
                            )}
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