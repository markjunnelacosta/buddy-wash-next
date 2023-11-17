"use client";
import React from 'react'
import { useState, useEffect } from 'react';
import './mobileUsers.css';
import Layout from '../components/layout';
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";


const getMobileUsers = async () => {
  try {
    const res = await fetch("http://localhost:3000/api/mobile-users", {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch mobile users");
    }

    const response = await res.json();
    return response.mobileUserData|| [];
  } catch (error) {
    console.log("Error loading mobile users: ", error);
  }
};

const MobileUser = () => {
  const [mobileUserData, setMobileUserData] = useState([]);

  useEffect(() => {
    const fetchMobileUSers = async () => {
      try {
        const mobileUsers = await getMobileUsers();
        setMobileUserData(mobileUsers);
      } catch (error) {
        console.error("Error fetching mobile users:", error);
      }
    };

    fetchMobileUSers();
  }, []);

  useEffect(() => {
    console.log(mobileUserData);
  }, [mobileUserData]);

  return (
    <>
      <Layout />
      <div className='mobile-container-box'>
        <div className='mobile-table-container'>
          <TableContainer component={Paper}>
            <Table
              stickyHeader
              aria-label="sticky table"
              sx={{ minWidth: 600 }}
              size="small"
            >
              <TableHead>
                <TableRow>
                  <TableCell className="table-header">First Name</TableCell>
                  <TableCell className="table-header">Last Name</TableCell>
                  <TableCell className="table-header">Email</TableCell>
                  <TableCell className="table-header">Password</TableCell>
                  <TableCell className="table-header">Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {mobileUserData.map((mobile) => (
                  <TableRow
                    key={mobile._id}
                    sx={{
                      "&:last-child td, &:last-child th": { border: 0 },
                    }}
                  >
                    <TableCell>{mobile.firstName}</TableCell>
                    <TableCell>{mobile.lastName}</TableCell>
                    <TableCell>{mobile.email}</TableCell>
                    <TableCell>{mobile.password}</TableCell>
                    <TableCell><RemoveButton id={mobile._id} /></TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
    </>
  )
}

export default MobileUser;
