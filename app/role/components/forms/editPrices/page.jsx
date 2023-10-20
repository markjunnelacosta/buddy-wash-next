"use client";
import React from "react";
import { useState } from "react";
import "./editPrices.css";
import { Button } from "@mui/material";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Add } from "@mui/icons-material";

export default function editPrices() {
    const [date, setDate] = useState("");
    const [productName, setProductName] = useState("");
    const [prices, setPrices] = useState("");

    const onClickSave = async () => {
        console.log(date, productName, prices);

        // const response = await fetch(`/api/prices/${productName}/`);
        // const data = await response.json();
        // console.log(data);
    };

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <Button
                style={{
                    backgroundColor: "white",
                    color: "black",
                    width: "200px",
                    height: "50px",
                    fontWeight: "bold",
                    alignSelf: "flex-end",
                    margin: "30px",
                    borderRadius: "10px",
                    marginLeft: "83.5%",
                }}
                variant="contained"
                onClick={handleClickOpen}
            >
                Update Prices
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>New Product</DialogTitle>
                <DialogContent>
                    <div className="update-prices-form">
                        <div className="input">
                            {/* make every input a selection */}
                            <div className="product-name">
                                <p>Product Name</p>
                                <input
                                    className="text-box"
                                    value={productName}
                                    onChange={(e) => setProductName(e.currentTarget.value)}
                                ></input>
                            </div>

                            <div className="price">
                                <p>Price</p>
                                <input
                                    className="text-box"
                                    value={prices}
                                    onChange={(e) => setPrices(e.currentTarget.value)}
                                ></input>
                            </div>
                        </div>
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button
                        href="/role/owner/components/main/branch1/prices"
                        className="dialog-button"
                        onClick={() => {
                            onClickSave();
                            handleClose();
                        }}
                    >
                        Save
                    </Button>
                    <Button
                        // href="/role/owner/components/main/prices"
                        className="dialog-button"
                        onClick={handleClose}
                    >
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
