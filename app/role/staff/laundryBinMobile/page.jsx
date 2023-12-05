"use client";

import React from "react";
import "./LaundryBin.css";
import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { Add, Timer } from "@mui/icons-material";
import { useState, useEffect } from "react";
import AddLaundry from "../../components/forms/addLaundry/page";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import MachineToggle from "./machineToggle";
import DryerToggle from "./dryerToggle";
import Countdown from "react-countdown";

const getOrderDetails = async () => {
  try {
    const res = await fetch("/api/mobile-orders", {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch orders");
    }

    const response = await res.json();
    return response.mobileOrders;
  } catch (error) {
    console.log("Error loading orders: ", error);
  }
};

const LaundryBin = () => {
  const [mobileOrders, setMobileOrders] = useState([]);
  const [machineTimer, setMachineTimer] = useState([]);
  const [machineData, setMachineData] = useState([]);
  const [dryerData, setDryerData] = useState([]);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const mobileOrder = await getOrderDetails();
        setMobileOrders(mobileOrder);
      } catch (error) {
        console.error("Error fetching mobile orders:", error);
      }
    };

    fetchOrder();
  }, []);

  useEffect(() => {
    console.log(mobileOrders);
  }, [mobileOrders]);

  return (
    <>
      <div className="laundryBin-container">
        <div className="blue-container">
          <div className="table-container">
            <TableContainer component={Paper}>
              <Table
                sx={{ minWidth: 650 }}
                size="small"
                aria-label="a dense table"
              >
                <TableHead>
                  <TableRow>
                    <TableCell className="table-header">Date </TableCell>
                    <TableCell className="table-header">Name</TableCell>
                    <TableCell className="table-header">Address</TableCell>
                    <TableCell className="table-header">Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {mobileOrders.map((order) => (
                    <TableRow
                      key={order._id}
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                      }}
                    >
                      <TableCell className="table-body">Date</TableCell>
                      <TableCell className="table-body">{order.userId}</TableCell>
                      <TableCell className="table-body">{order.deliveryAddress}</TableCell>
                      <TableCell className="table-body">Status</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </div>
      </div>
    </>
  );
};
export default LaundryBin;
