"use client";

import React, { useState, useEffect } from "react";
import { FormGroup, FormControlLabel, Switch } from "@mui/material";

const MachineToggle = ({ orderId, onToggle, isChecked }) => {
  const handleToggle = () => {
    // setIsChecked(!isChecked);
    onToggle(orderId);
  };

  return (
    <FormGroup>
      <FormControlLabel
        control={
          <Switch
            disabled={isChecked}
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
