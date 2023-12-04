"use client";
import React, { useState, useEffect } from 'react';
import './staff.css';
import AddIcon from '@mui/icons-material/Add';
import { Add } from '@mui/icons-material';
import DownloadIcon from '@mui/icons-material/Download';
import EditIcon from '@mui/icons-material/Edit';
import { Button, TableContainer, Table, TableHead, TableBody, TableRow, TableCell, Paper } from '@mui/material';
import ArrowBackIosRoundedIcon from "@mui/icons-material/ArrowBackIosRounded";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";


const getBranchStaff = async () => {
  try {
    const res = await fetch("/api/staff-owner", {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch branch staff");
    }

    const response = await res.json();
    console.log(response);
    return response.branchStaffData || [];

  } catch (error) {
    console.log("Error loading branch staff: ", error);
  }
};

const Staff = () => {
  const [branchStaffData, setBranchStaffData] = useState([]);
  const [entriesPerPage, setEntriesPerPage] = useState(7);
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(branchStaffData.length / entriesPerPage);
  const startRange = (currentPage - 1) * entriesPerPage + 1;
  const endRange = Math.min(currentPage * entriesPerPage, branchStaffData.length);

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

  useEffect(() => {
    const fetchBranchStaff = async () => {
      try {
        const branchStaff = await getBranchStaff();
        setBranchStaffData(branchStaff);
      } catch (error) {
        console.error("Error fetching report:", error);
      }
    };

    fetchBranchStaff();
  }, []);

  useEffect(() => {
    console.log(branchStaffData);
  }, [branchStaffData]);

  return (
    <div className="staff-container">
      <div className="blue-container">
        <div className="searchContainer-right">
          <p
            style={{
              color: "black",
              fontWeight: "bold",
              alignSelf: "right",
              margin: "30px"
            }}
            variant="contained">
            Staff Branch 3
          </p>
        </div>
        <div className="table-container">
          <TableContainer component={Paper}>
            <Paper style={{ height: 345, width: "100%" }}>
              <Table stickyHeader aria-label="sticky table" size="small">
                <TableHead>
                  <TableRow>
                    <TableCell align="center" style={{ fontWeight: "bold" }}>Name</TableCell>
                    <TableCell align="center" style={{ fontWeight: "bold" }}>Address</TableCell>
                    <TableCell align="center" style={{ fontWeight: "bold" }}>Phone Number</TableCell>
                    <TableCell align="center" style={{ fontWeight: "bold" }}>Position</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {branchStaffData
                    .slice(
                      (currentPage - 1) * entriesPerPage,
                      currentPage * entriesPerPage
                    )
                    .filter((staff) => staff.selectedBranch === "Branch 3")
                    .map((staff) => (
                      <TableRow key={staff._id}>
                        <TableCell align="center">{staff.staffName}</TableCell>
                        <TableCell align="center">{staff.staffAddress}</TableCell>
                        <TableCell align="center">{staff.phoneNumber}</TableCell>
                        <TableCell align="center">{staff.staffPosition}</TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </Paper>
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
    </div>
  );
}

export default Staff;
