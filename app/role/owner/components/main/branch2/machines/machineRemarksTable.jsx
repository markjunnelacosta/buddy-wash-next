"use client";
import React, { useState, useEffect } from "react";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Paper from "@mui/material/Paper";
import ArrowBackIosRoundedIcon from "@mui/icons-material/ArrowBackIosRounded";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";

const getMachineRemarks = async () => {
  try {
    const res = await fetch("/api/branch2MachineRemarks", {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch machine remarks");
    }

    // console.log(await res.json());
    const response = await res.json();
    return response.machineRemarks;
  } catch (error) {
    console.log("Error loading machine remarks. ", error);
  }
};

function MachineRemarksTable() {
  const [machineRemarks, setMachineRemarks] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
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
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
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
              </TableRow>
            </TableHead>
            <tbody>
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
      </div>
    </div>
  );
}

export default MachineRemarksTable;
