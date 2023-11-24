"use client";
import React from "react";
import { useState } from "react";
import "./AddCustomer.css";
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

export default function AddCustomer() {
  const [customerName, setCustomerName] = useState("");
  const [customerNumber, setCustomerNumber] = useState("");

  const onClickSave = async () => {
    
   if (
      !customerName ||
      !customerNumber
    ) { 
      alert("Please fill in all required fields.");
      return;
    }


    const nameRegex = /^[a-zA-Z ]+$/;
    if (!nameRegex.test(customerName)) {
      alert("Invalid characters in customer name. Please enter a valid name.");
      return;
    }

    const numberRegex = /^\d+$/;
    if (!numberRegex.test(customerNumber)) {
      alert("Invalid characters in phone number. Please enter a valid number.");
      return;
    }

    console.log(customerName, customerNumber);

    const response = await fetch("/api/customer", {
      method: "POST",
      body: JSON.stringify({
        customerName: customerName,
        customerNumber: customerNumber,
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
        // href="/role/components/forms/addCustomer"
        style={{
          backgroundColor: "white",
          color: "black",
          width: "200px",
          height: "50px",
          fontWeight: "bold",
          alignSelf: "flex-end",
          margin: "30px",
          borderRadius: "10px",
        }}
        variant="contained"
        onClick={handleClickOpen}
        startIcon={<Add />}
      >
        New Customer
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle className="title">New Customer</DialogTitle>
        <DialogContent>
          <div className="add-customer-form">
            <div className="input">
              <div className="customer-name">
                <p>Customer Name</p>
                <input
                  className="text-box"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.currentTarget.value)}
                ></input>
              </div>
              <div className="phone-number">
                <p>Phone Number</p>
                <input
                  className="text-box"
                  value={customerNumber}
                  onChange={(e) => setCustomerNumber(e.currentTarget.value)}
                ></input>
              </div>
            </div>
          </div>
        </DialogContent>
        <DialogActions>
          <Button
            href="/role/staff/manageCustomer"
            className="dialog-button"
            onClick={() => {
              onClickSave();
              handleClose();
            }}
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
