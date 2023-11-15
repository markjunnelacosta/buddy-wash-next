"use client";

import React from "react";
import { FormGroup, FormControlLabel, Switch } from "@mui/material";

const MachineToggle = ({ onToggle }) => {
  return (
    <FormGroup>
      <FormControlLabel
        control={
          <Switch
            onChange={onToggle}
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
