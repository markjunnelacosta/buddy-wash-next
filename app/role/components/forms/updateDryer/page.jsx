"use client";
import React, { useState } from "react";
import "./editDryer.css";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, ListItemText, } from "@mui/material";
import { useRouter } from "next/navigation";
import { TextField, MenuItem } from "@mui/material";

const UpdateDryer = ({ id, dryerNumber, action, timer, queue, useCount, status }) => {
  const [newDryerNumber, setNewDryerNumber] = useState(dryerNumber);
  const [newAction, setNewAction] = useState(action);
  const [newTimer, setNewTimer] = useState(timer);
  const [newQueue, setNewQueue] = useState(queue);
  const [newUseCount, setNewUseCount] = useState(useCount);
  const [newStatus, setNewStatus] = useState(status);

  const [dryerNumberError, setDryerNumberError] = useState("");
  const [timerError, setTimerError] = useState("");
  const [queueError, setQueueError] = useState("");
  const [useCountError, setUseCountError] = useState("");

  const router = useRouter();

  const handleDryerNumberChange = (e) => {
    const newValue = e.target.value;
    setNewDryerNumber(newValue);

    if (!/^\d*$/.test(newValue)) {
      setDryerNumberError("Please enter valid numbers");
    } else {
      setDryerNumberError("");
    }
  };

  const handleActionChange = (e) => {
    const newValue = e.target.value;
    setNewAction(newValue);
  };

  const handleTimerChange = (e) => {
    const newValue = e.target.value;
    setNewTimer(newValue);

    if (!/^\d*:\d{2}$/.test(newValue)) {
      setTimerError("Please enter valid timer format (e.g., 05:30)");
    } else {
      setTimerError("");
    }
  };

  const handleQueueChange = (e) => {
    const newValue = e.target.value;
    setNewQueue(newValue);

    if (!/^\d*$/.test(newValue)) {
      setQueueError("Please enter valid numbers");
    } else {
      setQueueError("");
    }
  };

  const handleUseCountChange = (e) => {
    const newValue = e.target.value;
    setNewUseCount(newValue);

    if (!/^\d*$/.test(newValue)) {
      setUseCountError("Please enter valid numbers");
    } else {
      setUseCountError("");
    }
  };

  const handleStatusChange = (e) => {
    const newValue = e.target.value;
    setNewStatus(newValue);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (timerError || queueError || useCountError) {
      return; // Don't submit if there are input errors
    }

    try {
      const res = await fetch(`/api/dryer/${id}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          id,
          newDryerNumber,
          newAction,
          newTimer,
          newQueue,
          newUseCount,
          newStatus,
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to update dryer details");
      }

      router.refresh();
      router.push("/role/owner/components/main/branch1/dryers");

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
    <div className="box-container">
      <DialogTitle>Edit Dryer</DialogTitle>
      <DialogContent>
        <div className="add-dryer-form">
          <div className="input">
            <div className="dryer-number">
              <p>Dryer Number</p>
              <TextField
                className="text-box"
                value={newDryerNumber}
                onChange={handleDryerNumberChange}
                disabled // Make dryer number non-editable
              />
            </div>
            <div className="action">
              <p>Action</p>
              <TextField
                select
                className="text-box"
                value={newAction}
                onChange={handleActionChange}
              >
                <MenuItem value="Off">Off</MenuItem>
                <MenuItem value="Running">Running</MenuItem>
              </TextField>
            </div>
            <div className="timer">
              <p>Timer</p>
              <TextField
                className="text-box"
                value={newTimer}
                onChange={handleTimerChange}
                error={!!timerError}
                helperText={timerError}
              />
            </div>
          </div>

          <hr />
          <div className="input">
            <div className="queue">
              <p>Queue</p>
              <TextField
                className="text-box"
                value={newQueue}
                onChange={handleQueueChange}
                error={!!queueError}
                helperText={queueError}
              />
            </div>
            <div className="use-count">
              <p>Use Count</p>
              <TextField
                className="text-box"
                value={newUseCount}
                onChange={handleUseCountChange}
                disabled // Make use count non-editable
              />
            </div>
            <div className="status">
              <p>Status</p>
              <TextField
                select
                className="text-box"
                value={newStatus}
                onChange={handleStatusChange}
              >
                <MenuItem value="Operational">Operational</MenuItem>
                <MenuItem value="Under Maintenance">Under Maintenance</MenuItem>
              </TextField>
            </div>
          </div>
        </div>
      </DialogContent>
      <DialogActions>
        <Button
          href="/role/owner/components/main/branch1/machines/dryerTable"
          className="dialog-button"
          onClick={handleSubmit}
        >
          Save
        </Button>
        <Button className="dialog-button" onClick={handleClose} href="/role/staff/machine">
          Cancel
        </Button>
      </DialogActions>
    </div>
  );
};

export default UpdateDryer;
