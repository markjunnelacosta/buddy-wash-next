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
import RemoveButton from "./RemoveButton";

const getMachineRemarks = async () => {
  try {
    const res = await fetch("/api/BRANCH3/branch3MachineRemarks", {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch machine remarks");
    }

    // console.log(await res.json());
    const response = await res.json();
    return response.branch3MachineRemarks;
  } catch (error) {
    console.log("Error loading machine remarks. ", error);
  }
};

function MachineRemarksTable() {
  const [machineRemarks, setMachineRemarks] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isUpdateCustomerPopupVisible, setUpdateCustomerPopupVisible] =
    useState(false);
  const [selectedMachineRemarks, setSelectedMachineRemarks] = useState(null);
  const [entriesPerPage, setEntriesPerPage] = useState(7);
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(machineRemarks.length / entriesPerPage);
  const startRange = (currentPage - 1) * entriesPerPage + 1;
  const endRange = Math.min(
    currentPage * entriesPerPage,
    machineRemarks.length
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
    const fetchMachineRemarks = async () => {
      try {
        const machineRemarksData = await getMachineRemarks();
        setMachineRemarks(machineRemarksData);
      } catch (error) {
        console.error("Error fetching machine Remarks:", error);
      }
    };

    fetchMachineRemarks();
  }, []);

  React.useEffect(() => {
    console.log(machineRemarks);
  }, [machineRemarks]);

  // Filter users based on search query
  const filteredMachineRemarks = machineRemarks.filter((machineRemarks) =>
    machineRemarks.number.includes(searchQuery)
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
                    Remarks
                  </TableCell>
                  <TableCell align="center" className="table-header-bold">
                    Action
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredMachineRemarks
                  .slice(
                    (currentPage - 1) * entriesPerPage,
                    currentPage * entriesPerPage
                  )
                  .map((machineRemarks) => (
                    <TableRow
                      key={machineRemarks._id}
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                      }}
                    >
                      <TableCell align="center" component="th" scope="row">
                        {machineRemarks.date}
                      </TableCell>
                      <TableCell align="center">
                        {machineRemarks.number}
                      </TableCell>
                      <TableCell align="center">
                        {machineRemarks.remarks}
                      </TableCell>

                      <TableCell align="center">
                        <RemoveButton id={machineRemarks._id} />
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
export default MachineRemarksTable;
