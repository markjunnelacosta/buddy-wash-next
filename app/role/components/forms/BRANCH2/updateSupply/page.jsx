"use client";
import React, { useState } from "react";
import "./editSupply.css";
import { Button } from "@mui/material";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useRouter } from "next/navigation";

export default function UpdateSupply({ id, supplyName, productPrice }) {
  const [newSupplyName, setNewSupplyName] = useState(supplyName);
  const [newProductPrice, setNewProductPrice] = useState(productPrice);
  const [supplyNameError, setSupplyNameError] = useState("");
  const [productPriceError, setProductPriceError] = useState("");

  const router = useRouter();

  const handleSupplyNameChange = (e) => {
    const newValue = e.target.value;
    setNewSupplyName(newValue);

    if (!/^[a-zA-Z\s]*$/.test(newValue)) {
      setSupplyNameError("Please enter valid characters (letters and spaces)");
    } else {
      setSupplyNameError("");
    }
  };

  const handleProductPriceChange = (e) => {
    const newValue = e.target.value;
    setNewProductPrice(newValue);

    if (!/^\d*\.?\d*$/.test(newValue)) {
      setProductPriceError("Please enter valid numbers");
    } else {
      setProductPriceError("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (supplyNameError || productPriceError) {
      return; // Don't submit if there are input errors
    }

    try {
      const res = await fetch(`/api/BRANCH2/branch2Supply/${id}`, {
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
      router.push("/role/owner/components/main/branch2/prices");

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
      <hr />
      <DialogContent>
        <div className="add-supply-form">
          <div className="input">
            <div className="supply-name">
              <p>Supply Name</p>
              <TextField
                className="text-box"
                value={newSupplyName}
                onChange={handleSupplyNameChange}
                error={!!supplyNameError}
                helperText={supplyNameError}
              />
            </div>
            <div className="product-price">
              <p>Price</p>
              <TextField
                className="text-box"
                value={newProductPrice}
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
          href="/role/owner/components/main/branch2/prices"
          className="dialog-button"
          onClick={handleSubmit}
        >
          Save
        </Button>
        <Button
          className="dialog-button"
          onClick={handleClose}
          href="/role/owner/components/main/branch2/prices"
        >
          Cancel
        </Button>
      </DialogActions>
    </div>
  );
}
