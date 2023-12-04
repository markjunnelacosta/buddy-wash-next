"use client";
import React, { useState, useEffect } from "react";
import "./promotions.css";
import editVouchers from "./voucherTable";
import AddVoucher from "@/app/role/components/forms/addVoucher/page";
import { Select, MenuItem } from '@mui/material';

function Promotions() {
  const [voucherFilter, setVoucherFilter] = useState("active");

  return (
    <div className="voucher-container">
      <div className="blue-container">
        <div className="searchContainer-right">
          <p
            style={{
              color: "black",
              fontWeight: "bold",
              margin: "20px 0px 0px 0px",
            }}
            variant="contained"
          >
            Vouchers
          </p>
          <div className="selects-container">
            <Select
              value={voucherFilter}
              onChange={(event) => setVoucherFilter(event.target.value)}
              style={{
                backgroundColor: "white",
                color: "black",
                width: "120px",
                height: "50px",
                fontWeight: "bold",
                borderRadius: "10px"
              }}
            >
              <MenuItem disabled>Select Vouchers</MenuItem>
              <MenuItem value="active">Active</MenuItem>
              <MenuItem value="expired">Expired</MenuItem>
            </Select>
          </div>
          <AddVoucher />
        </div>
        <div className="table-container">{editVouchers(voucherFilter)}
        </div>
      </div>
    </div>
  );
}
export default Promotions;
