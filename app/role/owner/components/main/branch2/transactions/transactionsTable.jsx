"use client";
import React, { useState, useEffect } from 'react';
import { TableContainer, Table, TableHead, TableBody, TableRow, TableCell, Paper, Button } from '@mui/material';
import ArrowBackIosRoundedIcon from "@mui/icons-material/ArrowBackIosRounded";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import Receipt from "app/role/staff/laundryBin/orderSummary.jsx";
// import { getFilteredReport } from './role/owner/components/main/branch1/transactions/page.jsx';
import { Typography } from "@mui/material";

export const getReport = async () => {
  try {
    const res = await fetch("/api/BRANCH2/branch2Report", {
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
    const res = await fetch("/api/BRANCH2/branch2Report", {
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
          const daysSinceStartOfWeek = (currentDate.getDay() + 6) % 7; // calculate days since start of the week
          const startOfWeek = new Date(currentDate);
          startOfWeek.setDate(currentDate.getDate() - daysSinceStartOfWeek);
          const endOfWeek = new Date(startOfWeek);
          endOfWeek.setDate(startOfWeek.getDate() + 6);

          if (reportDate >= startOfWeek && reportDate <= endOfWeek) {
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
  ).sort((a, b) => a.customerName.localeCompare(b.customerName));
};

const TransactionTable = ({ dateFrom, dateTo, filteredData, dateRange }) => {
  const [reportData, setReportData] = useState([]);
  const [entriesPerPage, setEntriesPerPage] = useState(7);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isReceiptModalOpen, setReceiptModalOpen] = useState(false);

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

  const openReceiptModal = async (order) => {
    try {
      const res = await fetch("/api/BRANCH2/branch2LaundryBin", {
        cache: "no-store",
      });

      if (!res.ok) {
        throw new Error("Failed to fetch orders");
      }

      const response = await res.json();
      const laundryData = response.laundryData || [];

      // find the selected order in laundryData based on report data
      const selectedOrder = laundryData.find((order) => order._id === order._id);

      setSelectedOrder(selectedOrder);
      setReceiptModalOpen(true);

    } catch (error) {
      console.log("Error loading orders: ", error);
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
                <TableCell align="center" style={{ fontWeight: "bold" }}>Type</TableCell>
                <TableCell align="center" style={{ fontWeight: "bold" }}>Receipt</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {reportData.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} align="center">
                    <Typography variant="body2" color="textSecondary">
                      No report data available for the selected criteria.
                    </Typography>
                  </TableCell>
                </TableRow>
              )}
              {reportData
                // .filter((report) => report.branchNumber === "b2")
                .slice(
                  (currentPage - 1) * entriesPerPage,
                  currentPage * entriesPerPage
                )
                .map((report) => (
                  <TableRow key={report._id} sx={{ "&:last-child td, &:last-child th": { border: 0 }, }}>
                    <TableCell align="center">{new Date(report.reportDate).toLocaleDateString()}</TableCell>
                    <TableCell align="center">{report.customerName}</TableCell>
                    <TableCell align="center">{report.totalAmount}</TableCell>
                    <TableCell align="center">{report.paymentMethod}</TableCell>
                    <TableCell align="center">{report.typeOfCustomer}</TableCell>
                    <TableCell align="center">
                      <Button variant="outlined" id="view-button" onClick={() => openReceiptModal(report)}>View</Button>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
            {isReceiptModalOpen && (
              <Receipt
                selectedOrder={selectedOrder}
                onClose={() => setReceiptModalOpen(false)}
              />
            )}
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
    </>
  );
};

export default TransactionTable;