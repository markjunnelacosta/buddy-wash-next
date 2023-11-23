"use client";
import React, { useState } from "react";
import "./editLaundryMode.css";
import { Button } from "@mui/material";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useRouter } from "next/navigation";

export default function UpdateSupply({ id, modeName, price }) {
    const [newModeName, setNewModeName] = useState(modeName);
    const [newPrice, setNewPrice] = useState(price);

    return (
        <>
            <div className="form-container visible">
                <div>
                    <p>Add Laundry Mode</p>
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
        </>
    );

}