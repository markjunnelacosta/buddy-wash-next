"use client";
import React, { useState, useEffect } from "react";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { Add } from "@mui/icons-material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
// import RemoveButton from "./RemoveButton";
// import EditCustomerPopup from "./editButton";
import ArrowBackIosRoundedIcon from "@mui/icons-material/ArrowBackIosRounded";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";

const getMachineReports = async () => {
  try {
    const res = await fetch("/api/BRANCH2/branch2MachineReport", {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch machine Report");
    }

    // console.log(await res.json());
    const response = await res.json();
    return response.machineReports;
  } catch (error) {
    console.log("Error loading machine Report. ", error);
  }
};

function MachineReportsTable() {
  const [machineReports, setMachineReports] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isUpdateCustomerPopupVisible, setUpdateCustomerPopupVisible] =
    useState(false);
  const [selectedMachineReports, setSelectedMachineReports] = useState(null);
  const [entriesPerPage, setEntriesPerPage] = useState(7);
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(machineReports.length / entriesPerPage);
  const startRange = (currentPage - 1) * entriesPerPage + 1;
  const endRange = Math.min(
    currentPage * entriesPerPage,
    machineReports.length
  );

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

  // const handleEditCustomer = (customer) => {
  //   setSelectedCustomer(customer);
  //   setUpdateCustomerPopupVisible(true); // Show the popup
  // };

  const handleClose = () => {
    setUpdateCustomerPopupVisible(false); // Hide the popup
  };

  React.useEffect(() => {
    const fetchMachineReports = async () => {
      try {
        const machineReportsData = await getMachineReports();
        setMachineReports(machineReportsData);
      } catch (error) {
        console.error("Error fetching machine Reports:", error);
      }
    };

    fetchMachineReports();
  }, []);

  React.useEffect(() => {
    console.log(machineReports);
  }, [machineReports]);

  // Filter users based on search query
  const filteredMachineReports = machineReports.filter((machineReports) =>
    machineReports.machineNumber.toString().includes(searchQuery)
  );

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginTop: "5px",
        }}
        className="searchMachine"
      >
        <input
          type="text"
          id="searchNumber"
          name="machineNumber"
          value={searchQuery}
          placeholder="Search"
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <div style={{ height: "400px", overflow: "auto" }}>
        <div className="table-container">
          <TableContainer component={Paper}>
            <Table stickyHeader aria-label="sticky table" size="small">
              <TableHead>
                <TableRow>
                  <TableCell align="center" className="table-header-bold">
                    Date
                  </TableCell>
                  <TableCell align="center" className="table-header-bold">
                    Machine No.
                  </TableCell>
                  <TableCell align="center" className="table-header-bold">
                    Use Count
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredMachineReports
                  .slice(
                    (currentPage - 1) * entriesPerPage,
                    currentPage * entriesPerPage
                  )
                  .map((machineReports) => (
                    <TableRow
                      key={machineReports._id}
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                      }}
                    >
                      <TableCell align="center" component="th" scope="row">
                        {machineReports.date}
                      </TableCell>
                      <TableCell align="center">
                        {machineReports.machineNumber}
                      </TableCell>
                      <TableCell align="center">
                        {machineReports.useCount}
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
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
        </div>
      </div>
    </>
  );
}
export default MachineReportsTable;
