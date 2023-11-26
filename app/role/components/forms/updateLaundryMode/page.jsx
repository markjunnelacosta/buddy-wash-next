"use client";
import React, { useState } from "react";
import "./editLaundryMode.css";

export default function UpdateLaundryMode({ id, modeName, price, timer, onClose }) {
    const [newModeName, setNewModeName] = useState(modeName);
    const [newPrice, setNewPrice] = useState(price);
    const [newTimer, setNewTimer] = useState(timer);
    const [showTimerInput, setShowTimerInput] = useState(false);

    const onClick = async (e) => {
        e.preventDefault();
        console.log({
            id,
            newModeName,
            newPrice,
            timer
        });
        try {
            const res = await fetch(`/api/laundry-price/${id}`, {
                method: "PUT",
                headers: {
                    "Content-type": "application/json",
                },

                body: JSON.stringify({
                    id,
                    newModeName,
                    newPrice,
                    timer
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
                        <p>Timer</p>
                        <input
                            type="number"
                            value={newTimer}
                            onChange={(e) => setNewTimer(e.currentTarget.value)}
                        />
                    </div>
                    <br />
                    <button className="cancel" onClick={onClose}>Cancel</button>
                    <button className="saveButton" onClick={onClick}>Save</button>
                </div>

            </div>
        </div>
    );

}