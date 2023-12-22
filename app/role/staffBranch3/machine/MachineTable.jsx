"use client";
import React, { useState, useEffect } from "react";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import EditPopup from "./EditButton";

function MachineTable() {
  const [machineData, setMachineData] = useState([]);
  const [selectedMachine, setSelectedMachine] = useState(null);
  const [isEditMachinePopupVisible, setEditMachinePopupVisible] =
    useState(false);

  const fetchMachines = () => {
    fetch("/api/machine", {
      cache: "no-store",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch machine data");
        }
        return response.json();
      })
      .then((data) => {
        setMachineData(
          data.machineData.filter(
            (m) => m.branchNumber == 3 || m.branchNumber == "3"
          ) || []
        ); // Update machineData state
      })
      .catch((error) => {
        console.error("Error fetching machine data:", error);
      });
  };

  useEffect(() => {
    fetchMachines();
  }, []);
  console.log("********machine data", machineData);

  const handleEditMachine = (machine) => {
    setSelectedMachine(machine);
    setEditMachinePopupVisible(true);
  };

  const handleCloseEditMachinePopup = () => {
    setEditMachinePopupVisible(false);
    fetchMachines(); // Refresh data after edit
  };

  // useEffect(() => {
  //   fetch();
  // }, []);

  return (
    <div>
      <TableContainer component={Paper}>
        <Table stickyHeader aria-label="sticky table" size="small">
          <TableHead>
            <TableRow>
              <TableCell align="center" className="table-header-bold">
                Washer No.
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
          <TableBody>
            {machineData.map((machine, index) => (
              <TableRow key={index}>
                <TableCell align="center">{machine.machineNumber}</TableCell>

                <TableCell align="center">
                  {machine.timer == "00:00" ||
                  machine.timer == 0 ||
                  machine.timer == "tempValue"
                    ? "Off"
                    : "Running"}
                </TableCell>
                <TableCell align="center">{machine.queue}</TableCell>
                <TableCell align="center">{machine.useCount}</TableCell>
                <TableCell align="center">
                  {machine.status === "Operational"
                    ? "Operational"
                    : "Under Maintenance"}
                </TableCell>
                <TableCell align="center">
                  <Button
                    variant="outlined"
                    onClick={() => handleEditMachine(machine)}
                  >
                    Edit
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <EditPopup
        isOpen={isEditMachinePopupVisible}
        item={selectedMachine}
        onClose={handleCloseEditMachinePopup}
        type="machine" // Specify the type for machines
      />
    </div>
  );
}

export default MachineTable;
