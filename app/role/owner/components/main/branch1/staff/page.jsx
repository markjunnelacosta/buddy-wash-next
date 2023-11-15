"use client";
import React, { useState, useEffect } from 'react';
import './staff.css';
import AddIcon from '@mui/icons-material/Add';
import { Add } from '@mui/icons-material';
import DownloadIcon from '@mui/icons-material/Download';
import AddStaff from './staffTable';
import EditIcon from '@mui/icons-material/Edit';
import { Button, TableContainer, Table, TableHead, TableBody, TableRow, TableCell, Paper } from '@mui/material';

const getBranchStaff = async () => {
  try {
    const res = await fetch("http://localhost:3000/api/branch-staff", {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch branch staff");
    }

    const response = await res.json();
    console.log("Fetched branch staff:", response);
    return response.branchStaff;
  } catch (error) {
    console.log("Error loading branch staff: ", error);
  }
};

function Staff() {
  const [branchStaff, setBranchStaff] = useState([]);
  const [selectedBranchStaff, setSelectedBranchStaff] = useState(null);

  React.useEffect(() => {
    const fetchBranchStaff = async () => {
      try {
        const branchStaffData = await getBranchStaff();
        setBranchStaff(branchStaffData || []);
      } catch (error) {
        console.error("Error fetching branch staff:", error);
      }
    };

    fetchBranchStaff();
  }, []);

  React.useEffect(() => {
    console.log(branchStaff);
  }, [branchStaff]);

  return (
    <div className="staff-container">
      <div className="blue-container">
        <div className="searchContainer-right">
          <p style={{ color: "black", fontWeight: "bold", alignSelf: "right", margin: "30px" }} variant="contained">
            Staff Branch 1
          </p>
        </div>
        <div className="table-container">
          <TableContainer component={Paper}>
            <Paper style={{ height: 500, width: "100%" }}>
              <Table stickyHeader aria-label="sticky table" size="small">
                <TableHead>
                  <TableRow>
                    <TableCell align="center" style={{ fontWeight: "bold" }}>Name</TableCell>
                    <TableCell align="center" style={{ fontWeight: "bold" }}>Address</TableCell>
                    <TableCell align="center" style={{ fontWeight: "bold" }}>Phone Number</TableCell>
                    <TableCell align="center" style={{ fontWeight: "bold" }}>Position</TableCell>
                    <TableCell align="center" style={{ fontWeight: "bold" }}>Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {branchStaff.map(branchStaff => (
                    <TableRow key={branchStaff.id}>
                      <TableCell align="center">{branchStaff.staffName}</TableCell>
                      <TableCell align="center">{branchStaff.staffAddress}</TableCell>
                      <TableCell align="center">{branchStaff.phoneNumber}</TableCell>
                      <TableCell align="center">{branchStaff.staffPosition}</TableCell>
                      <TableCell align="center">
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Paper>
          </TableContainer>
        </div>
      </div>
    </div>
  );
}

export default Staff;
