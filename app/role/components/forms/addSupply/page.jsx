"use client";
import React, { useState } from "react";
import { Button } from "@mui/material";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Add } from "@mui/icons-material";
import './AddSupply.css'

export default function AddSupply() {
  const [supplyName, setSupplyName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [supplyNameError, setSupplyNameError] = useState('');
  const [productPriceError, setProductPriceError] = useState('');

  const handleSupplyNameChange = (e) => {
    const newValue = e.target.value;
    setSupplyName(newValue);

    if (!/^[a-zA-Z\s]*$/.test(newValue)) {
      setSupplyNameError('Please enter valid characters (letters and spaces)');
    } else {
      setSupplyNameError('');
    }
  };

  const handleProductPriceChange = (e) => {
    const newValue = e.target.value;
    setProductPrice(newValue);

    if (!/^\d*\.?\d*$/.test(newValue)) {
      setProductPriceError('Please enter valid numbers');
    } else {
      setProductPriceError('');
    }
  };

  const onClickSave = async () => {
    if (supplyNameError || productPriceError) {
      return; // Don't submit if there are input errors
    }
    if (!supplyName || !productPrice) {
      alert("Please fill in all required fields.");
      return;
    }

    const response = await fetch("/api/supply", {
      method: "POST",
      body: JSON.stringify({
        supplyName: supplyName,
        availableStock: 0,
        productPrice: productPrice,
      }),
    });
    if (response.ok) {
      handleClose();
    } else {
      console.log("Failed to add supply");
    }
  };

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSupplyName("");
    setProductPrice("");
    setSupplyNameError('');
    setProductPriceError('');
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
          alignSelf: "flex-start",
          margin: "30px 30px 20px 0px",
          borderRadius: "10px",
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
                <TextField
                  className="text-box"
                  value={supplyName}
                  onChange={handleSupplyNameChange}
                  error={!!supplyNameError}
                  helperText={supplyNameError}
                />
              </div>
              <div className="product-price">
                <p>Price</p>
                <TextField
                  className="text-box"
                  value={productPrice}
                  onChange={handleProductPriceChange}
                  error={!!productPriceError}
                  helperText={productPriceError}
                />
              </div>
            </div>
          </div>
        </DialogContent>
        <DialogActions>
          <Button
            href="/role/owner/components/main/branch1/prices"
            className="dialog-button"
            onClick={onClickSave}
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
      </Dialog>
    </div>
  );
}
