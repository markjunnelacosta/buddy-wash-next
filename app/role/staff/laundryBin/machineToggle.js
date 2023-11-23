"use client";

import React, { useState, useEffect } from "react";
import { FormGroup, FormControlLabel, Switch } from "@mui/material";

const MachineToggle = ({ orderId, onToggle }) => {
  const localStorageKey = `machineToggleState_${orderId}`;

  const storedState = localStorage.getItem(localStorageKey);
  const [isChecked, setIsChecked] = useState(
    storedState ? JSON.parse(storedState) : false
  );

  useEffect(() => {
    localStorage.setItem(localStorageKey, JSON.stringify(isChecked));
  }, [isChecked, localStorageKey]);

  const handleToggle = () => {
    setIsChecked(!isChecked);
    onToggle(orderId, !isChecked);
  };

  return (
    <FormGroup>
      <FormControlLabel
        control={
          <Switch
            checked={isChecked}
            onChange={handleToggle}
            sx={{
              m: 1,
            }}
          />
        }
      />
    </FormGroup>
  );
};

export default MachineToggle;
