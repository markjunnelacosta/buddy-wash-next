"use client";
import * as React from "react";
import { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import "./priceTable.css";
import EditSupplyPopup from "./editButton";
import RemoveButton from "./removeButton";

const getSupplies = async () => {
  try {
    const res = await fetch("/api/supply", {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch supplies");
    }

    // console.log(await res.json());
    const response = await res.json();
    return response.supplies;
  } catch (error) {
    console.log("Error loading supplies: ", error);
  }
};

const SupplyTable = () => {
  const [supplies, setSupplies] = React.useState([]);
  const [selectedSupply, setSelectedSupply] = useState(null);
  const [isUpdateSupplyPopupVisible, setUpdateSupplyPopupVisible] = useState(false);

  const handleEditSupply = (supply) => {
    setSelectedSupply(supply);
    setUpdateSupplyPopupVisible(true);
  };

  const handleClose = () => {
    setUpdateSupplyPopupVisible(false); // Hide the popup
  };


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

  const fetchData = async () => {
    try {
      const res = await fetch("/api/supply", {
        cache: "no-store",
      });

      if (!res.ok) {
        throw new Error("Failed to fetch supply");
      }

      const response = await res.json();
      const supplies = response.userData || [];
      setSupplies(supplies); // Assuming you want to update the supply data in your component state
    } catch (error) {
      console.log("Error loading supplies: ", error);
    }
  };

  const handleSaveData = () => {
    fetchData();
  };


  return (
    <>
    <TableContainer component={Paper}>
      <Paper style={{ height: 500, width: "100%" }}>
        <Table
          stickyHeader
          aria-label="sticky table"
          // sx={{ minWidth: 650 }}
          size="small"
        >
          <TableHead>
            <TableRow>
              <TableCell align="center" style={{ fontWeight: "bold" }}>
                Product Name
              </TableCell>
              <TableCell align="center" style={{ fontWeight: "bold" }}>
                Price
              </TableCell>
              <TableCell align="center" style={{ fontWeight: "bold" }}>
                Action
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
                  <TableCell align="center">{supply.productPrice}</TableCell>
                  <TableCell align="center">
                    <Button variant="outlined" id="edit-button" onClick={() => handleEditSupply(supply)}>
                      Edit
                    </Button>
                    <RemoveButton id={supply._id} />
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </Paper>
    </TableContainer>
    <EditSupplyPopup
        isOpen={isUpdateSupplyPopupVisible}
        supply={selectedSupply}
        onClose={handleClose}
        onSave={handleSaveData} // Implement the save function
      />
    </>
  );
};

export default SupplyTable;
