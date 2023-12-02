"use client";
import React from "react";
import "./promotions.css";
import editVouchers from "./voucherTable";
import AddVoucher from "@/app/role/components/forms/addVoucher/page";

function Promotions() {
  return (
    <div className="promotions-container">
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
            Vouchers
          </p>
          <AddVoucher />
        </div>
        <div className="table-container">{editVouchers()}</div>
      </div>
    </div>
  );
}
export default Promotions;
