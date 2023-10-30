"use client";
import React from "react";
import { useState, useEffect } from "react";
import "./UpdateSupply.css";
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
import ProductSelection from "./productSelection";

const getSupplies = async () => {
  try {
    const res = await fetch("http://localhost:3000/api/supply", {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch supplies");
    }

    // console.log(await res.json());
    const response = await res.json();
    return response.supplies;
  } catch (error) {
    console.log("Error loading customers: ", error);
  }
};

export default function UpdateSupply() {
  const [supplies, setSupplies] = React.useState([]);
  const [date, setDate] = useState("");
  const [supplyName, setSupplyName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [type, setType] = useState("");

  //gets supplies list
  React.useEffect(() => {
    const fetchSupplies = async () => {
      try {
        const suppliesData = await getSupplies();
        setSupplies(suppliesData);
      } catch (error) {
        console.error("Error fetching supplies:", error);
      }
    };

    fetchSupplies();
  }, []);

  React.useEffect(() => {}, [supplies]);

  console.log({ supplies });

  const onClickSave = async () => {
    console.log(date, supplyName, quantity, type);

    // const response = await fetch(`/api/supply/${supplyName}/`);
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
        Update Supplies
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Update Supply</DialogTitle>
        <DialogContent>
          <div className="update-supply-form">
            <div className="input">
              {/* make every input a selection */}
              <div className="supply-name">
                <p>Supply Name</p>
                <select
                  className="text-box"
                  onChange={(e) => setSupplyName(e.target.value)}
                >
                  {supplies.map((supply, i) => (
                    <option key={i}>{supply.supplyName}</option>
                  ))}
                </select>
                {/* <input
                  className="text-box"
                  value={supplyName}
                  onChange={(e) => setSupplyName(e.currentTarget.value)}
                ></input> */}
              </div>

              <div className="quantity">
                <p>Quantity</p>
                <input
                  className="text-box"
                  value={quantity}
                  onChange={(e) => setQuantity(e.currentTarget.value)}
                ></input>
              </div>

              <div className="Type">
                <p>Type</p>
                <input
                  className="text-box"
                  value={quantity}
                  onChange={(e) => setType(e.currentTarget.value)}
                ></input>
              </div>
            </div>
          </div>
        </DialogContent>
        <DialogActions>
          <Button
            href="/role/staff/supplyList"
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
