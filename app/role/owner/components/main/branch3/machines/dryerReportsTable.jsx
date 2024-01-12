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

const getDryerReports = async () => {
  try {
    const res = await fetch("/api/BRANCH3/branch3DryerReport", {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch Dryer Report");
    }

    // console.log(await res.json());
    const response = await res.json();
    return response.dryerReports;
  } catch (error) {
    console.log("Error loading dryer Report. ", error);
  }
};

function DryerReportsTable() {
  const [dryerReports, setDryerReports] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isUpdateCustomerPopupVisible, setUpdateCustomerPopupVisible] =
    useState(false);
  const [selectedDryerReports, setSelectedDryerReports] = useState(null);
  const [entriesPerPage, setEntriesPerPage] = useState(7);
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(dryerReports.length / entriesPerPage);
  const startRange = (currentPage - 1) * entriesPerPage + 1;
  const endRange = Math.min(currentPage * entriesPerPage, dryerReports.length);

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
    const fetchDryerReports = async () => {
      try {
        const dryerReportsData = await getDryerReports();
        setDryerReports(dryerReportsData);
      } catch (error) {
        console.error("Error fetching dryer Reports:", error);
      }
    };

    fetchDryerReports();
  }, []);

  React.useEffect(() => {
    console.log(dryerReports);
  }, [dryerReports]);

  // Filter users based on search query
  const filteredDryerReports = dryerReports.filter((dryerReports) =>
    dryerReports.dryerNumber.toString().includes(searchQuery)
  );

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
        className="searchDryer"
      >
        <input
          type="text"
          id="searchNumber"
          name="dryerNumber"
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
                  Dryer No.
                </TableCell>
                <TableCell align="center" className="table-header-bold">
                  Use Count
                </TableCell>
              </TableRow>
            </TableHead>
            <tbody>
              {filteredDryerReports
                .slice(
                  (currentPage - 1) * entriesPerPage,
                  currentPage * entriesPerPage
                )
                .map((dryerReports) => (
                  <TableRow
                    key={dryerReports._id}
                    sx={{
                      "&:last-child td, &:last-child th": { border: 0 },
                    }}
                  >
                    <TableCell align="center" component="th" scope="row">
                      {dryerReports.date}
                    </TableCell>
                    <TableCell align="center">
                      {dryerReports.dryerNumber}
                    </TableCell>
                    <TableCell align="center">
                      {dryerReports.useCount}
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

export default DryerReportsTable;
