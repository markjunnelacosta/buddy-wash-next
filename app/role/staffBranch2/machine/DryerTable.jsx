"use client";
import React, { useState, useEffect } from "react";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import EditPopup from "./EditButton";

function DryerTable() {
  const [dryerData, setDryerData] = useState([]);
  const [selectedDryer, setSelectedDryer] = useState(null);
  const [isEditDryerPopupVisible, setEditDryerPopupVisible] = useState(false);

  const fetchDryer = () => {
    fetch("/api/dryer", {
      cache: "no-store",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch dryer data");
        }
        return response.json();
      })
      .then((data) => {
        setDryerData(
          data.dryerData.filter(
            (d) => d.branchNumber == 2 || d.branchNumber == "2"
          ) || []
        ); // Update dryer state
      })
      .catch((error) => {
        console.error("Error fetching dryer data:", error);
      });
  };

  useEffect(() => {
    fetchDryer();
  }, []);
  console.log("********dryer data", dryerData);

  const handleEditDryer = (dryer) => {
    setSelectedDryer(dryer);
    setEditDryerPopupVisible(true);
  };

  const handleCloseEditDryerPopup = () => {
    setEditDryerPopupVisible(false);
    fetchDryer(); // Refresh data after edit
  };

  // useEffect(() => {
  //   fetchData();
  // }, []);

  return (
    <div>
      <div style={{ height: "400px", overflow: "auto" }}>
        <TableContainer component={Paper}>
          <Table stickyHeader aria-label="sticky table" size="small">
            <TableHead>
              <TableRow>
                <TableCell align="center" className="table-header-bold">
                  Dryer No.
                </TableCell>
                <TableCell align="center" className="table-header-bold">
                  Action
                </TableCell>
                <TableCell align="center" className="table-header-bold">
                  Queue
                </TableCell>
                <TableCell align="center" className="table-header-bold">
                  Use Count
                </TableCell>
                <TableCell align="center" className="table-header-bold">
                  Status
                </TableCell>
                <TableCell align="center" className="table-header-bold">
                  Set-up
                </TableCell>
              </TableRow>
            </TableHead>
            <tbody>
              {dryerData.map((dryer, index) => (
                <TableRow key={index}>
                  <TableCell align="center">{dryer.dryerNumber}</TableCell>
                  <TableCell align="center">
                    {dryer.timer == "00:00" ||
                    dryer.timer == 0 ||
                    dryer.timer == "tempValue"
                      ? "Off"
                      : "Running"}
                  </TableCell>
                  <TableCell align="center">{dryer.queue}</TableCell>
                  <TableCell align="center">{dryer.useCount}</TableCell>
                  <TableCell align="center">
                    {dryer.status === "Operational"
                      ? "Operational"
                      : "Under Maintenance"}
                  </TableCell>
                  <TableCell align="center">
                    <Button
                      variant="outlined"
                      onClick={() => handleEditDryer(dryer)}
                    >
                      Edit
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </tbody>
          </Table>
        </TableContainer>
      </div>
      <EditPopup
        isOpen={isEditDryerPopupVisible}
        item={selectedDryer}
        onClose={handleCloseEditDryerPopup}
        type="dryer" // Specify the type for dryers
      />
    </div>
  );
}

export default DryerTable;
