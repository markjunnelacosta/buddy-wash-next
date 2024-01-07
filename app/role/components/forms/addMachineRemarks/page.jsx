"use client";
import React from "react";
import { useState } from "react";
import "./addMachineRemarks.css";
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

export default function AddMachineRemarks() {
  const [number, setNumber] = useState("");
  const [remarks, setRemarks] = useState("");

  var today = new Date();
  var dateToday =
    today.getMonth() + 1 + "-" + today.getDate() + "-" + today.getFullYear();
  var hours = today.getHours();
  var minutes = today.getMinutes();
  var ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  hours = hours ? hours : 12; // Handle midnight (12:00 AM)
  var time = hours + ":" + (minutes < 10 ? "0" : "") + minutes + " " + ampm;
  var date = dateToday + " (" + time + ")";

  const onClickSave = async () => {
    if (!number || !remarks) {
      alert("Please fill in all required fields.");
      return;
    }

    // const nameRegex = /^[a-zA-Z ]+$/;
    // if (!nameRegex.test(remarks)) {
    //   alert("Invalid characters in customer name. Please enter a valid name.");
    //   return;
    // }

    const numberRegex = /^\d+$/;
    if (!numberRegex.test(number)) {
      alert("Invalid characters. Please enter a valid number.");
      return;
    }

    console.log(number, remarks);

    const response = await fetch("/api/machineRemarks", {
      method: "POST",
      body: JSON.stringify({
        date: date,
        number: number,
        remarks: remarks,
      }),
    });
    console.log(response);
    window.location.reload();
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
          color: " black",
          width: "80px",
          height: " 30px",
          fontWeight: "bold",
          alignSelf: "flex-end",

          borderRadius: "10px",
          // marginLeft: "70%",
        }}
        variant="contained"
        onClick={handleClickOpen}
        startIcon={<Add />}
      >
        Add
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle className="title">New Machine Remarks</DialogTitle>
        <DialogContent>
          <div className="add-machine-remarks-form">
            <div className="input">
              <div className="machine-number">
                <p>Machine Number</p>
                <input
                  className="text-box"
                  value={number}
                  onChange={(e) => setNumber(e.currentTarget.value)}
                ></input>
              </div>
              <div className="remarks">
                <p>Remarks</p>
                <input
                  className="text-box"
                  value={remarks}
                  onChange={(e) => setRemarks(e.currentTarget.value)}
                ></input>
              </div>
            </div>
          </div>
        </DialogContent>
        <DialogActions>
          <Button
            className="dialog-button"
            onClick={() => {
              onClickSave();
              handleClose();
            }}
          >
            Save
          </Button>
          <Button className="dialog-button" onClick={handleClose}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
