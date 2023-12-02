"use client";

import React, { useState, useEffect } from "react";
import { FormGroup, FormControlLabel, Switch } from "@mui/material";

const DryerToggle = ({ orderId, onToggle, disabled, isChecked }) => {
  const handleToggle = () => {
    // setIsChecked(!isChecked);
    onToggle(orderId);
  };

  return (
    <FormGroup>
      <FormControlLabel
        control={
          <Switch
            disabled={disabled || isChecked}
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

export default DryerToggle;
