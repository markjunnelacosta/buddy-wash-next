"use client";
import React, { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';

function AddMachine({ onAddMachine }) {
  const [open, setOpen] = useState(false);
  const [machineName, setMachineName] = useState('');
  const [machineType, setMachineType] = useState('wash'); // Default to 'wash'
  const [timerMinutes, setTimerMinutes] = useState(0);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAddMachine = () => {

    const newMachine = {
      name: machineName,
      type: machineType,
      timerMinutes: timerMinutes,
    };
    onAddMachine(newMachine);
    handleClose();
  };
}

export default AddMachine;
