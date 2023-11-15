"use client";

import React from "react";
import { FormGroup, FormControlLabel, Switch } from "@mui/material";

const MachineToggle = () => {
  return (
    <FormGroup>
      <FormControlLabel
        control={
          <Switch
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
