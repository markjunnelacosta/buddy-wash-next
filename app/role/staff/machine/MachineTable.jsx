"use client";
import React, { useState, useEffect } from "react";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import ArrowBackIosRoundedIcon from "@mui/icons-material/ArrowBackIosRounded";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import EditPopup from "./EditButton";

const API_PATHS = {
  MACHINE: "/api/machine",
  // BRANCH2: "/api/BRANCH2/branch2Machine",
  // BRANCH3: "/api/BRANCH3/branch3Machine",
};

function MachineTable() {
  const [machineData, setMachineData] = useState([]);
  const [selectedMachine, setSelectedMachine] = useState(null);
  const [isEditMachinePopupVisible, setEditMachinePopupVisible] = useState(false);
  const [entriesPerPage, setEntriesPerPage] = useState(6);
  const [currentPage, setCurrentPage] = useState(1);
  const [orderBy, setOrderBy] = useState("machineNumber");
  const [order, setOrder] = useState("asc");
  const [currentApiPath, setCurrentApiPath] = useState(API_PATHS.MACHINE);

  const totalPages = Math.ceil(machineData.length / entriesPerPage);
  const startRange = (currentPage - 1) * entriesPerPage + 1;
  const endRange = Math.min(currentPage * entriesPerPage, machineData.length);

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const descendingComparator = (a, b, orderBy) => {
    if (orderBy === 'machineNumber') {
      const aNum = parseInt(a[orderBy]);
      const bNum = parseInt(b[orderBy]);
      if (isNaN(aNum) || isNaN(bNum)) {
        return String(a[orderBy]).localeCompare(String(b[orderBy]), undefined, { numeric: true });
      }
      return bNum - aNum;
    } else {
      if (b[orderBy] < a[orderBy]) return -1;
      if (b[orderBy] > a[orderBy]) return 1;
      return 0;
    }
  };

  const getComparator = (order, orderBy) => {
    return order === 'desc'
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  };

  const stableSort = (array, comparator) => {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
  };

  const fetchMachines = () => {
    fetch(currentApiPath, {
      cache: "no-store",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch machine data");
        }
        return response.json();
      })
      .then((data) => {
        setMachineData(data.machineData || []); // update machineData state
      })
      .catch((error) => {
        console.error("Error fetching machine data:", error);
      });
  };

  useEffect(() => {
    fetchMachines();
  }, [currentApiPath]);
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
    <div style={{ height: "400px", overflow: "auto" }}>
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
          <tbody>
            {stableSort(machineData, getComparator(order, orderBy))
              .slice(
                (currentPage - 1) * entriesPerPage,
                currentPage * entriesPerPage
              )
              .map((machine, index) => (
                <TableRow key={index}>
                  <TableCell align="center">{machine.machineNumber}</TableCell>
                  <TableCell align="center">
                    {machine.timer == "00:00" ||
                      machine.timer == "0" ||
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
          </tbody>
        </Table>
      </TableContainer>
      <div className="pagination">
        <button onClick={handlePreviousPage} disabled={currentPage === 1}>
          <ArrowBackIosRoundedIcon />
        </button>
        <span>{`Showing entries ${startRange}-${endRange} of ${totalPages}`}</span>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
        >
          <ArrowForwardIosRoundedIcon />
        </button>
      </div>
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
