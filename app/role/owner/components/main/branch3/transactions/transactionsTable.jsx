"use client";
import React, { useState, useEffect } from 'react';
import { TableContainer, Table, TableHead, TableBody, TableRow, TableCell, Paper } from '@mui/material';
import ArrowBackIosRoundedIcon from "@mui/icons-material/ArrowBackIosRounded";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
// import { getFilteredReport } from './role/owner/components/main/branch1/transactions/page.jsx';

export const getReport = async () => {
  try {
    const res = await fetch("/api/report", {
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

export const getFilteredReport = async (dateFrom, dateTo, dateRange) => {
  try {
    const res = await fetch("/api/report", {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch transactions");
    }

    const response = await res.json();
    let filteredData = response.reportData.filter((report) => {
      const reportDate = new Date(report.reportDate);
      return (!dateFrom || reportDate >= new Date(dateFrom)) &&
        (!dateTo || reportDate <= new Date(dateTo));
    });

    filteredData = calculateDataForDateRange(filteredData, dateRange);

    filteredData.sort((a, b) => new Date(b.reportDate) - new Date(a.reportDate));

    return filteredData || [];
  } catch (error) {
    console.log("Error loading transactions: ", error);
  }
};

const calculateDataForDateRange = (data, dateRange) => {
  return data.reduce(
    (acc, report) => {
      const reportDate = new Date(report.reportDate);
      const currentDate = new Date();

      switch (dateRange) {
        case "daily":
          if (
            reportDate.getDate() === currentDate.getDate() &&
            reportDate.getMonth() === currentDate.getMonth() &&
            reportDate.getFullYear() === currentDate.getFullYear()
          ) {
            acc.push(report);
          }
          break;
        case "weekly":
          const firstDayOfWeek = new Date(currentDate);
          const dayOfWeek = currentDate.getDay();
          const diff = currentDate.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1); // Adjust when the day is Sunday
          firstDayOfWeek.setDate(diff);
          if (reportDate >= firstDayOfWeek && reportDate <= currentDate) {
            acc.push(report);
          }
          break;
        case "monthly":
          if (
            reportDate.getMonth() === currentDate.getMonth() &&
            reportDate.getFullYear() === currentDate.getFullYear()
          ) {
            acc.push(report);
          }
          break;
        case "annually":
          if (reportDate.getFullYear() === currentDate.getFullYear()) {
            acc.push(report);
          }
          break;
        case "semi-annually":
          const halfYear = Math.floor(reportDate.getMonth() / 6);
          const currentHalfYear = Math.floor(currentDate.getMonth() / 6);
          if (
            halfYear === currentHalfYear &&
            reportDate.getFullYear() === currentDate.getFullYear()
          ) {
            acc.push(report);
          }
          break;
        default:
          acc.push(report);
          break;
      }

      return acc;
    },
    []
  );
};

const TransactionTable = ({ dateFrom, dateTo, filteredData, dateRange }) => {
  const [reportData, setReportData] = useState([]);
  const [entriesPerPage, setEntriesPerPage] = useState(7);
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(reportData.length / entriesPerPage);
  const startRange = (currentPage - 1) * entriesPerPage + 1;
  const endRange = Math.min(currentPage * entriesPerPage, reportData.length);

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
    const fetchReport = async () => {
      try {
        if (filteredData.length > 0) {
          setReportData(filteredData);
        } else {
          console.log("Effect triggered with dateFrom:", dateFrom, "and dateTo:", dateTo, "and dateRange:", dateRange);
          const report = await getFilteredReport(dateFrom, dateTo, dateRange);
          console.log("Fetched report data:", report);
          setReportData(report);
        }
      } catch (error) {
        console.error("Error fetching transactions:", error);
      }
    };

    fetchReport();
  }, [dateFrom, dateTo, dateRange, filteredData]);

  return (
    <>
      <TableContainer component={Paper}>
        <Paper style={{ height: 345, width: "100%" }}>
          <Table stickyHeader aria-label="sticky table" size="small">
            <TableHead>
              <TableRow>
                <TableCell align="center" style={{ fontWeight: "bold" }}>Dates</TableCell>
                <TableCell align="center" style={{ fontWeight: "bold" }}>Customer Name</TableCell>
                <TableCell align="center" style={{ fontWeight: "bold" }}>Total Amount</TableCell>
                <TableCell align="center" style={{ fontWeight: "bold" }}>Payment Method</TableCell>
                <TableCell align="center" style={{ fontWeight: "bold" }}>Receipt</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {reportData
                .slice(
                  (currentPage - 1) * entriesPerPage,
                  currentPage * entriesPerPage
                )
                .filter((report) => report.branchNumber === "b3")
                .map((report) => (
                  <TableRow key={report._id} sx={{ "&:last-child td, &:last-child th": { border: 0 }, }}>
                    <TableCell align="center">{new Date(report.reportDate).toLocaleDateString()}</TableCell>
                    <TableCell align="center">{report.customerName}</TableCell>
                    <TableCell align="center">{report.totalAmount}</TableCell>
                    <TableCell align="center">{report.paymentMethod}</TableCell>
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
        <span>{`Showing entries ${startRange}-${endRange} of ${reportData.length}`}</span>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
        >
          <ArrowForwardIosRoundedIcon />
        </button>
      </div>
    </>
  );
};

export default TransactionTable;