"use client";
import React from "react";
import "./price.css";
import { Button, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { Add } from "@mui/icons-material";
import DownloadIcon from "@mui/icons-material/Download";
import editPrices from "./priceTable";
import AddSupply from "@/app/role/components/forms/BRANCH2/addSupply/page";

function Prices() {
  return (
    <div className="prices-container">
      <div className="blue-container">
        <div className="searchContainer-right">
          <p
            style={{
              color: "black",
              fontWeight: "bold",
              margin: "30px",
            }}
            variant="contained"
          >
            Price List
          </p>
          <AddSupply />
        </div>
        <div className="table-container">{editPrices()}</div>
      </div>
    </div>
  );
}
export default Prices;
