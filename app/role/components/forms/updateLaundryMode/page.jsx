"use client";
import React, { useState } from "react";
import "./editLaundryMode.css";

export default function UpdateLaundryMode({ id, modeName, price, onClose }) {
    const [newModeName, setNewModeName] = useState(modeName);
    const [newPrice, setNewPrice] = useState(price);

    const onClick = async (e) => {
        e.preventDefault();
        console.log({
            id,
            newModeName,
            newPrice
        });
        try {
            const res = await fetch(`http://localhost:3000/api/laundry-price/${id}`, {
                method: "PUT",
                headers: {
                    "Content-type": "application/json",
                },

                body: JSON.stringify({
                    id,
                    newModeName,
                    newPrice
                }),
            });

            if (!res.ok) {
                throw new Error("Failed to update laundry details");
            }

            onClose();
            window.location.reload();

        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div>
            <div className="form-container">
                <div>
                    <p>Update Laundry Mode</p>
                    <hr />
                    <div className="form-group">
                        <p>Mode Name</p>
                        <input
                            type="text"
                            value={newModeName}
                            onChange={(e) => setNewModeName(e.currentTarget.value)}
                        ></input>
                        <p>Price</p>
                        <input
                            type="Number"
                            value={newPrice}
                            onChange={(e) => setNewPrice(e.currentTarget.value)}
                        ></input>
                    </div>
                    <br />
                    <button className="cancel" onClick={onClose}>Cancel</button>
                    <button className="saveButton" onClick={onClick}>Save</button>
                </div>

            </div>
        </div>
    );

}