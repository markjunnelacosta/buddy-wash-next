"use client";
import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import "./SupplyInOut.css";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { Add } from "@mui/icons-material";
import UpdateSupply from "../../components/forms/updateSupplyQuantity/page";
const getInventory = async () => {
  try {
    const res = await fetch("/api/BRANCH2/branch2Inventory", {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch inventory");
    }

    // console.log(await res.json());
    const response = await res.json();
    return response.inventory;
  } catch (error) {
    console.log("Error loading inventory: ", error);
  }
};

function SupplyInOut() {
  const [inventory, setInventory] = React.useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  React.useEffect(() => {
    const fetchInventory = async () => {
      try {
        const inventoryData = await getInventory();
        setInventory(inventoryData);
      } catch (error) {
        console.error("Error fetching inventory:", error);
      }
    };

    fetchInventory();
  }, []);

  React.useEffect(() => {
    console.log(inventory);
  }, [inventory]);

  const filteredInventory = inventory.filter((inventory) =>
    inventory.supplyName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sortedInventory = [...filteredInventory].sort((a, b) => {
    // Convert date strings to Date objects for comparison
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);

    // Sort in descending order
    return dateB - dateA;
  });

  return (
    <div className="supplyInOut-container">
      <div className="blue-container">
        <div className="searchContainer">
          <div className="searchContainer-left">
            <UpdateSupply />
          </div>
          <div className="searchContainer-right">
            <p style={{ fontWeight: "bold" }}>Search</p>
            <input
              type="text"
              id="searchSupply"
              name="supplyName"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        <div className="table-container">
          <TableContainer component={Paper}>
            {/* <Paper style={{ height: 480, width: "100%" }}> */}
            <Table
              stickyHeader
              aria-label="sticky table"
              sx={{ minWidth: 600 }}
              size="small"
            >
              <TableHead>
                <TableRow>
                  <TableCell align="center" style={{ fontWeight: "bold" }}>
                    Date
                  </TableCell>
                  <TableCell align="center" style={{ fontWeight: "bold" }}>
                    Supply Name
                  </TableCell>
                  <TableCell align="center" style={{ fontWeight: "bold" }}>
                    Quantity
                  </TableCell>
                  <TableCell align="center" style={{ fontWeight: "bold" }}>
                    Type
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {sortedInventory.map((inventory) => (
                  <TableRow
                    key={inventory._id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell align="center" component="th" scope="row">
                      {inventory.date}
                    </TableCell>
                    <TableCell align="center">{inventory.supplyName}</TableCell>
                    <TableCell align="center"> {inventory.quantity}</TableCell>
                    <TableCell align="center"> {inventory.type}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            {/* </Paper> */}
          </TableContainer>
        </div>
      </div>
    </div>
  );
}
export default SupplyInOut;
