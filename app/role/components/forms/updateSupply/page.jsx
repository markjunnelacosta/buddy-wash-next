"use client";
import React from "react";
import { useState } from "react";
import "./editSupply.css";
import { Button } from "@mui/material";
// import * as React from "react";
// import Button from '@mui/material/Button';
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Add } from "@mui/icons-material";
import { useRouter } from "next/navigation";

export default function UpdateSupply({
    id,
    supplyName,
    productPrice,
}) {
    const [newSupplyName, setNewSupplyName] = useState(supplyName);
    const [newProductPrice, setNewProductPrice] = useState(productPrice);

    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch(`http://localhost:3000/api/supply/${id}`, {
                method: "PUT",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify({ id, newSupplyName, newProductPrice }),
            });

            if (!res.ok) {
                throw new Error("Failed to update supply details");
            }

            router.refresh();
            router.push("/role/owner/components/main/branch1/prices");

            window.location.reload();
        } catch (error) {
            console.log(error);
        }
    };

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };


    return (
        <div className="box-container" style={{ zIndex: 9999 }}>
                <DialogTitle>Edit Supply</DialogTitle>
                <hr/>
                <DialogContent>
                    <div className="add-supply-form">
                        <div className="input">
                            <div className="supply-name">
                                <p>Supply Name</p>
                                <input
                                    className="text-box"
                                    value={newSupplyName}
                                    onChange={(e) => setNewSupplyName(e.currentTarget.value)}
                                ></input>
                            </div>
                            <div className="product-price">
                                <p>Price</p>
                                <input
                                    className="text-box"
                                    value={newProductPrice}
                                    onChange={(e) => setNewProductPrice(e.currentTarget.value)}
                                ></input>
                            </div>
                        </div>
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button
                        href="/role/owner/components/main/branch1/prices"
                        className="dialog-button"
                        onClick={handleSubmit}
                    >
                        Save
                    </Button>
                    <Button
                        className="dialog-button"
                        onClick={handleClose}
                    >
                        Cancel
                    </Button>
                </DialogActions>
        </div>
    );
}
