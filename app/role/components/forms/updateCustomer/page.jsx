"use client";
import React from "react";
import { useState } from "react";
import "./UpdateCustomer.css";
import { Button } from "@mui/material";
// import * as React from "react";
// import Button from '@mui/material/Button';
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useRouter } from "next/navigation";
import Backdrop from "@mui/material/Backdrop";

export default function UpdateCustomerForm({
  id,
  customerName,
  customerNumber,
}) {
  const [newCustomerName, setNewCustomerName] = useState(customerName);
  const [newCustomerNumber, setNewCustomerNumber] = useState(customerNumber);

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`http://localhost:3000/api/customer/${id}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ id, newCustomerName, newCustomerNumber }),
      });

      if (!res.ok) {
        throw new Error("Failed to update customer details");
      }

      router.refresh();
      router.push("/role/staff/manageCustomer");
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

  //   const [openBackDrop, setOpenBackDrop] = React.useState(false);
  //   const handleCloseBackDrop = () => {
  //     setOpenBackDrop(false);
  //   };
  //   const handleOpenBackDrop = () => {
  //     setOpenBackDrop(true);
  //   };

  return (
    <div>
      {/* <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={openBackDrop}
        onClick={handleCloseBackDrop}
      > */}
      <form onSubmit={handleSubmit} className="update-customer-form">
        <div className="title">
          <p>Update Customer Details</p>
        </div>
        <div className="input">
          <div className="customer-name">
            <p>Customer Name</p>
            <input
              onChange={(e) => setNewCustomerName(e.target.value)}
              value={newCustomerName}
              className="text-box"
            ></input>
          </div>
          <div className="phone-number">
            <p>Phone Number</p>
            <input
              onChange={(e) => setNewCustomerNumber(e.target.value)}
              value={newCustomerNumber}
              className="text-box"
            ></input>
          </div>
        </div>

        <button className="dialog-button">Save</button>
      </form>
      {/* </Backdrop> */}
    </div>
  );
}
