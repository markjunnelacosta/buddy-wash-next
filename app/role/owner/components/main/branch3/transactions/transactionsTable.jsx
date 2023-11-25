"use client";
import React, { useState, useEffect } from 'react';
import { TableContainer, Table, TableHead, TableBody, TableRow, TableCell, Paper } from '@mui/material';
// import { getFilteredReport } from './role/owner/components/main/branch1/transactions/page.jsx';

export const getReport = async () => {
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

export const getFilteredReport = async (dateFrom, dateTo) => {
  try {
    const res = await fetch("http://localhost:3000/api/report", {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch transactions");
    }

    const response = await res.json();
    const filteredData = response.reportData.filter((report) => {
      const reportDate = new Date(report.reportDate);
      return (!dateFrom || reportDate >= new Date(dateFrom)) &&
        (!dateTo || reportDate <= new Date(dateTo));
    });

    filteredData.sort((a, b) => new Date(b.reportDate) - new Date(a.reportDate));

    return filteredData || [];
  } catch (error) {
    console.log("Error loading transactions: ", error);
  }
};

const TransactionTable = ({ dateFrom, dateTo, filteredData, dateRange}) => {
  const [reportData, setReportData] = useState([]);

  useEffect(() => {
    if (filteredData.length > 0) {
      setReportData(filteredData);
    }
    else {
      console.log("Effect triggered with dateFrom:", dateFrom, "and dateTo:", dateTo, "and dateRange:", dateRange);
      const fetchReport = async () => {
        try {
          const report = await getFilteredReport(dateFrom, dateTo);
          console.log("Fetched report data:", report);
          setReportData(report);
        } catch (error) {
          console.error("Error fetching transactions:", error);
        }
      }

      fetchReport();
    };

    console.log(filteredData);
  });

  useEffect(() => {
    console.log(reportData);
  }, [reportData]);

  return (
    <TableContainer component={Paper}>
      <Paper style={{ height: 500, width: "100%" }}>
        <Table stickyHeader aria-label="sticky table" size="small">
          <TableHead>
            <TableRow>
              <TableCell align="center" style={{ fontWeight: "bold" }}>Dates</TableCell>
              <TableCell align="center" style={{ fontWeight: "bold" }}>Customer Name</TableCell>
              <TableCell align="center" style={{ fontWeight: "bold" }}>Total Amount</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {reportData.map((report) => (
              <TableRow key={report._id} sx={{ "&:last-child td, &:last-child th": { border: 0 }, }}>
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
