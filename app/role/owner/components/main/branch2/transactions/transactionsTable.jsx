"use client";
import React, { useState, useEffect } from 'react';
import { TableContainer, Table, TableHead, TableBody, TableRow, TableCell, Paper } from '@mui/material';

const getReport = async () => {
  try {
    const res = await fetch("http://localhost:3000/api/report", {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch transactions");
    }

    const response = await res.json();
    return response.reportData || [];
  } catch (error) {
    console.log("Error loading transactions: ", error);
  }
};

const TransactionTable = () => {
  const [reportData, setReportData] = useState([]);

  useEffect(() => {
    const fetchReport = async () => {
      try {
        const report = await getReport();
        setReportData(report);
      } catch (error) {
        console.error("Error fetching transactions:", error);
      }
    };

    fetchReport();
  }, []);

  useEffect(() => {
    console.log(reportData);
  }, [reportData]);

  return (
    <TableContainer component={Paper}>
      <Paper style={{ height: 500, width: "100%" }}>
        <Table stickyHeader aria-label="sticky table" size="small">
          <TableHead>
            <TableRow>
              <TableCell align="center" style={{ fontWeight: "bold" }}>Date</TableCell>
              <TableCell align="center" style={{ fontWeight: "bold" }}>Customer Name</TableCell>
              <TableCell align="center" style={{ fontWeight: "bold" }}>Total Amount</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {reportData.map((report) => (
              <TableRow key={report._id} sx={{"&:last-child td, &:last-child th": { border: 0 },}}>
                <TableCell align="center">{new Date(report.reportDate).toLocaleDateString()}</TableCell>
                <TableCell align="center">{report.customerName}</TableCell>
                <TableCell align="center">{report.totalAmount}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </TableContainer>
  );
};

export default TransactionTable;
