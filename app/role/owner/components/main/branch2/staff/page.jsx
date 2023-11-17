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
      const res = await fetch("http://localhost:3000/api/staff-owner", {
          cache: "no-store",
      });

      if (!res.ok) {
          throw new Error("Failed to fetch branch staff");
      }

      const response = await res.json();
      return response.branchStaffData || [];
  } catch (error) {
      console.log("Error loading branch staff: ", error);
  }
};

const Staff = () => {
  const [branchStaffData, setBranchStaffData] = useState([]);

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
          <p style={{ color: "black", fontWeight: "bold", alignSelf: "right", margin: "30px" }} variant="contained">
            Staff Branch 2
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
                  </TableRow>
                </TableHead>
                <TableBody>
                  {branchStaffData.map((staff) => (
                    <TableRow key={staff._id}>
                      <TableCell align="center">{staff.staffName}</TableCell>
                      <TableCell align="center">{staff.staffAddress}</TableCell>
                      <TableCell align="center">{staff.phoneNumber}</TableCell>
                      <TableCell align="center">{staff.staffPosition}</TableCell>
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
