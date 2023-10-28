"use client";

import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import "./SupplyTable.css";
import Link from "next/link";
import Button from "@mui/material/Button";
import { blue } from "@mui/material/colors";
import RemoveButton from "./RemoveButton";

const getSupplies = async () => {
  try {
    const res = await fetch("http://localhost:3000/api/supply", {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch supplies");
    }

    // console.log(await res.json());
    const response = await res.json();
    return response.supplies;
  } catch (error) {
    console.log("Error loading customers: ", error);
  }
};

const SupplyTable = () => {
  const [supplies, setSupplies] = React.useState([]);

  React.useEffect(() => {
    const fetchSupplies = async () => {
      try {
        const suppliesData = await getSupplies();
        setSupplies(suppliesData);
      } catch (error) {
        console.error("Error fetching supplies:", error);
      }
    };

    fetchSupplies();
  }, []);

  React.useEffect(() => {
    console.log(supplies);
  }, [supplies]);

  return (
    <TableContainer component={Paper}>
      <Paper style={{ height: 480, width: "100%" }}>
        <Table
          stickyHeader
          aria-label="sticky table"
          sx={{ minWidth: 480 }}
          size="small"
        >
          <TableHead>
            <TableRow>
              <TableCell align="center" style={{ fontWeight: "bold" }}>
                Name
              </TableCell>
              <TableCell align="center" style={{ fontWeight: "bold" }}>
                Available Stock
              </TableCell>
              <TableCell align="center" style={{ fontWeight: "bold" }}>
                Status
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {supplies.length > 0 &&
              supplies.map((supply) => (
                <TableRow
                  key={supply._id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="center" component="th" scope="row">
                    {supply.supplyName}
                  </TableCell>
                  <TableCell align="center">{supply.availableStock}</TableCell>
                  <TableCell align="center"> </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </Paper>
    </TableContainer>
  );
};

export default SupplyTable;
