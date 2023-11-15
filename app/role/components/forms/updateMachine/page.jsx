import React, { useState } from "react";
import "./editMachine.css";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import { useRouter } from "next/navigation";
import { TextField, MenuItem } from "@mui/material";

const UpdateMachine = ({ id, machineNumber, action, timer, queue, useCount, status }) => {
  const [newMachineNumber, setNewMachineNumber] = useState(machineNumber);
  const [newAction, setNewAction] = useState(action);
  const [newTimer, setNewTimer] = useState(timer);
  const [newQueue, setNewQueue] = useState(queue);
  const [newUseCount, setNewUseCount] = useState(useCount);
  const [newStatus, setNewStatus] = useState(status);

  const [machineNumberError, setMachineNumberError] = useState("");
  const [timerError, setTimerError] = useState("");
  const [queueError, setQueueError] = useState("");
  const [useCountError, setUseCountError] = useState("");

  const router = useRouter();

  const handleMachineNumberChange = (e) => {
    const newValue = e.target.value;
    setNewMachineNumber(newValue);

    if (!/^\d*$/.test(newValue)) {
      setMachineNumberError("Please enter valid numbers");
    } else {
      setMachineNumberError("");
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
      const res = await fetch(`http://localhost:3000/api/machine/${id}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          id,
          newMachineNumber,
          newAction,
          newTimer,
          newQueue,
          newUseCount,
          newStatus,
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to update machine details");
      }

      router.refresh();
      router.push("/role/owner/components/main/branch1/machines");

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
      <DialogTitle>Edit Machine</DialogTitle>
      <DialogContent>
        <div className="add-machine-form">
          <div className="input">
            <div className="machine-number">
              <p>Machine Number</p>
              <TextField
                className="text-box"
                value={newMachineNumber}
                onChange={handleMachineNumberChange}
                disabled // Make machine number non-editable
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
                <MenuItem value="Running">Running</MenuItem>
                <MenuItem value="Off">Off</MenuItem>
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
          href="/role/owner/components/main/branch1/machines/machineTable"
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

export default UpdateMachine;
