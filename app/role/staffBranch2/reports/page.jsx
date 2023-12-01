"use client";
import React, { useState, useEffect, useRef } from 'react';
import './Reports.css';
import { Button, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { Add } from '@mui/icons-material';
import DownloadIcon from '@mui/icons-material/Download';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import html2canvas from 'html2canvas';
import * as XLSX from 'xlsx';

const getReport = async () => {
    try {
        const res = await fetch("/api/report", {
            cache: "no-store",
        });

        if (!res.ok) {
            throw new Error("Failed to fetch report");
        }

        const response = await res.json();

        const sortedReportData = response.reportData.sort((a, b) => new Date(b.reportDate) - new Date(a.reportDate));

        return sortedReportData || [];
    } catch (error) {
        console.log("Error loading report: ", error);
    }
};

const getFilteredReport = async (dateFrom, dateTo, selectedDataPeriod) => {
    try {
        const res = await fetch(`/api/report?dateFrom=${dateFrom}&dateTo=${dateTo}`, {
            cache: "no-store",
        });

        if (!res.ok) {
            throw new Error("Failed to fetch reports");
        }

        const response = await res.json();
        let filteredData = response.reportData.filter((report) => {
            const reportDate = new Date(report.reportDate);
            return (!dateFrom || reportDate >= new Date(dateFrom)) &&
                (!dateTo || reportDate <= new Date(dateTo));
        });

        filteredData = filterDataByPeriod(filteredData, selectedDataPeriod);

        filteredData.sort((a, b) => new Date(b.reportDate) - new Date(a.reportDate));

        console.log("Filtered Data:", filteredData);

        return filteredData || [];
    } catch (error) {
        console.log("Error loading transactions: ", error);
    }
};

const filterDataByPeriod = (data, selectedDataPeriod) => {
    return data.reduce(
        (acc, report) => {
            const reportDate = new Date(report.reportDate);
            const currentDate = new Date();

            switch (selectedDataPeriod) {
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

const Reports = () => {
    let tableRef = useRef(null);
    const [reportData, setReportData] = useState([]);
    const [dateFrom, setDateFrom] = useState('');
    const [dateTo, setDateTo] = useState('');
    const [filteredData, setFilteredData] = useState([]);
    const [selectedDataPeriod, setSelectedDataPeriod] = useState('annually');
    const [totalAmount, setTotalAmount] = useState(0);
    const faviconUrl = '/favicon.png';

    const handleFilter = async () => {
        try {
            const filteredData = await getFilteredReport(dateFrom, dateTo, selectedDataPeriod);
            if (filteredData.length === 0) {
                console.log("No records found for the specified period.");
            } else {
                console.log("Filtered Data: ", filteredData);

                const totalAmount = filteredData.reduce((sum, report) => sum + report.totalAmount, 0);
                console.log("Total Amount: ", totalAmount);

                setFilteredData(filteredData);
                setTotalAmount(totalAmount);
                setReportData(filteredData);
            }
        } catch (error) {
            console.error("Error filtering transactions:", error);
        }
    };

    useEffect(() => {
        const fetchReport = async () => {
            try {
                const report = await getReport();
                setReportData(report);
            } catch (error) {
                console.error("Error fetching report:", error);
            }
        };

        fetchReport();
    }, []);

    useEffect(() => {
        if (dateFrom && dateTo) {
            handleFilter();
        }
    }, [selectedDataPeriod]); 

    const handleExportToPDF = async () => {
        try {
          const table = tableRef.current;
    
          if (!table) {
            console.error("Table reference not found");
            return;
          }
    
          const pdf = new jsPDF('p', 'mm', 'a4');
          pdf.setFontSize(12);
    
          const logoImage = new Image();
          logoImage.src = faviconUrl;
          logoImage.onload = function () {
            const logoSize = 50;
            pdf.addImage(logoImage, 'JPEG', pdf.internal.pageSize.width - logoSize - 10, 5, logoSize, logoSize);
            
            // pdf.addImage(imgData, 'PNG', 10, 10, 190, 0);

                    // pdf.text('Date', 10, imgHeight + 40);
                    // pdf.text('Customer Name', 50, imgHeight + 40);
                    // pdf.text('Total Amount', 100, imgHeight + 40);
                    // pdf.text('Payment Method', 150, imgHeight + 40);
                    // reportData.forEach((report, index) => {
                    //     const yPos = imgHeight + 50 + index * 10;
                    //     pdf.text(new Date(report.reportDate).toLocaleDateString(), 10, yPos);
                    //     pdf.text(report.customerName, 50, yPos);
                    //     pdf.text(report.totalAmount.toString(), 100, yPos);
                    //     pdf.text(report.paymentMethod, 150, yPos);
                    // });

            pdf.setFont('times', 'bold');
            pdf.text('TRANSACTION HISTORY', 20, 20);
            pdf.setFont('times', 'normal');
            pdf.text(`Requested Date: ${dateFrom} to ${dateTo}`, 20, 25);
            // pdf.text(`Printed by: ${getserID()}`, 20, pdf.internal.pageSize.height - 30);
            pdf.text('Corporation: WASHAF LAUNDRY SHOP', 20, 30);
            const formattedTotalAmount = totalAmount.toFixed(2);
            pdf.text(`Total Amount: Php ${formattedTotalAmount}`, 20, 35);
            pdf.setFontSize(10);
            pdf.text('This report contains detailed information about transactions of the business.', 20, 45); //specify branch based on account
    
            const header = ["Dates", "Customer Name", "Total Amount", "Payment Method"];
            const rows = filteredData
              .map((report) => [
                new Date(report.reportDate).toLocaleDateString(),
                report.customerName,
                report.totalAmount,
                report.paymentMethod,
              ]);
    
            pdf.autoTable({
              head: [header],
              body: rows,
              startY: 55,
              styles: { fontSize: 8 },
              margin: { bottom: 40 },
            });
    
            const currentDate = new Date();
            const formattedDate = `${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${currentDate.getDate()} ${currentDate.getHours()}:${currentDate.getMinutes()}:${currentDate.getSeconds()}`;
            pdf.setFontSize(10);
            pdf.text(`Date Accessed: ${formattedDate}`, 20, pdf.internal.pageSize.height - 10);
            const pageCount = pdf.internal.getNumberOfPages();
            for (let i = 1; i <= pageCount; i++) {
              pdf.setPage(i);
              pdf.text(`Page ${i} of ${pageCount}`, pdf.internal.pageSize.width - 40, pdf.internal.pageSize.height - 10);
            }
    
            pdf.save('table.pdf');
          };
        } catch (error) {
          console.error("Error exporting to PDF:", error);
        }
      };

    const handleExportToExcel = () => {
        try {
            const table = tableRef.current;

            if (!table) {
                console.error("Table reference not found");
                return;
            }

            const wb = XLSX.utils.book_new();
            const ws = XLSX.utils.table_to_sheet(table);
            XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

            XLSX.writeFile(wb, 'table.xlsx');
        } catch (error) {
            console.error("Error exporting to Excel:", error);
        }
    };

    return (
        <div className="reports-container">
            <div className="blue-container">

                <div className="searchContainer">
                    <div className="searchContainer-left">
                        <p style={{ fontWeight: "bold" }}>Date From: </p>
                        <input
                            className="inputDate"
                            type="date"
                            id="dateFrom"
                            name="dateFrom"
                            onChange={(e) => setDateFrom(e.target.value)}
                            style={{ width: "150px" }}
                        />
                        <p style={{ fontWeight: "bold" }}>To: </p>
                        <input
                            className="inputDate"
                            type="date"
                            id="dateTo"
                            name="dateTo"
                            onChange={(e) => setDateTo(e.target.value)}
                            style={{ width: "150px" }}
                        />
                        <Button
                            style={{
                                backgroundColor: "white",
                                color: "black",
                                width: "100px",
                                height: "40px",
                                fontWeight: "bold",
                                alignSelf: "flex-end",
                                margin: "30px 10px 30px 0",
                                borderRadius: "10px"
                            }}
                            variant="contained"
                            onClick={handleFilter}>
                            Filter
                        </Button>
                    </div>
                    <div className="searchContainer-right">
                        <Select
                            value={selectedDataPeriod}
                            onChange={(e) => setSelectedDataPeriod(e.target.value)}
                            style={{
                                backgroundColor: "white",
                                color: "black",
                                width: "160px",
                                height: "40px",
                                fontWeight: "bold",
                                alignSelf: "flex-end",
                                margin: "30px 30px 30px 10px",
                                borderRadius: "10px"
                            }}
                        >
                            <MenuItem disabled>Select Data Period</MenuItem>
                            <MenuItem value="daily">Daily</MenuItem>
                            <MenuItem value="weekly">Weekly</MenuItem>
                            <MenuItem value="monthly">Monthly</MenuItem>
                            <MenuItem value="annually">Annually</MenuItem>
                            <MenuItem value="semi-annually">Semi-Annually</MenuItem>
                        </Select>

                        <Button
                            style={{
                                backgroundColor: "white",
                                color: "black",
                                width: "100px",
                                height: "40px",
                                fontWeight: "bold",
                                alignSelf: "flex-end",
                                margin: "30px 10px 30px 0px",
                                borderRadius: "10px"
                            }}
                            variant="contained"
                            startIcon={<DownloadIcon />}
                            onClick={handleExportToPDF} >
                            PDF
                        </Button>

                        <Button
                            style={{
                                backgroundColor: "white",
                                color: "black",
                                width: "100px",
                                height: "40px",
                                fontWeight: "bold",
                                alignSelf: "flex-end",
                                margin: "30px 30px 30px 0px",
                                borderRadius: "10px"
                            }}
                            variant="contained"
                            startIcon={<DownloadIcon />}
                            onClick={handleExportToExcel}
                        >
                            Excel
                        </Button>

                    </div>
                </div>

                <div className='report-table-container' ref={tableRef} >
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                            <TableHead>
                                <TableRow>
                                    <TableCell className='table-cell'>Date </TableCell>
                                    <TableCell className='table-cell'>Customer Name</TableCell>
                                    <TableCell className='table-cell'>Total Amount </TableCell>
                                    <TableCell className='table-cell'>Payment Method</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {reportData && reportData.map((report) => (
                                    <TableRow key={report._id} sx={{ "&:last-child td, &:last-child th": { border: 0 }, }} >
                                        <TableCell className="table-body">{new Date(report.reportDate).toLocaleDateString()}</TableCell>
                                        <TableCell className="table-body">{report.customerName}</TableCell>
                                        <TableCell className="table-body">{report.totalAmount}</TableCell>
                                        <TableCell className="table-body">{report.paymentMethod}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>

            </div>
        </div>
    )
}
export default Reports;