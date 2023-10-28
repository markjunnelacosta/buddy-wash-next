"use client";
import React from "react";
import { useState } from "react";
import "./AddSupply.css";
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

export default function AddSupply() {
  const [supplyName, setSupplyName] = useState("");
  const [productPrice, setProductPrice] = useState("");

  const onClickSave = async () => {
    console.log(supplyName, productPrice);

    const response = await fetch("/api/supply", {
      method: "POST",
      body: JSON.stringify({
        supplyName: supplyName,
        availableStock: 0,
        productPrice: productPrice,
      }),
    });
    console.log(response);
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
          marginLeft: "109vh",
        }}
        variant="contained"
        onClick={handleClickOpen}
        startIcon={<Add />}
      >
        New Supply
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>New Supply</DialogTitle>
        <DialogContent>
          <div className="add-supply-form">
            <div className="input">
              <div className="supply-name">
                <p>Supply Name</p>
                <input
                  className="text-box"
                  value={supplyName}
                  onChange={(e) => setSupplyName(e.currentTarget.value)}
                ></input>
              </div>
              <div className="product-price">
                <p>Price</p>
                <input
                  className="text-box"
                  value={productPrice}
                  onChange={(e) => setProductPrice(e.currentTarget.value)}
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
            // href="/role/staff/components/main-content/manageCustomer"
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
