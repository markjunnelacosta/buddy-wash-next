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
import html2canvas from 'html2canvas';

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

const getFilteredReport = async (dateFrom, dateTo) => {
    try {
        const res = await fetch("/api/report", {
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

const Reports = () => {
    let tableRef = useRef(null);
    const [reportData, setReportData] = useState([]);
    const [dateFrom, setDateFrom] = useState('');
    const [dateTo, setDateTo] = useState('');

    const handleFilter = async () => {
        try {
            const data = await getFilteredReport(dateFrom, dateTo);
            console.log("Filtered data:", data);
            setReportData(data);
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
        console.log(reportData);
    }, [reportData]);

    const handleExportToPDF = async () => {
        try {
            const table = tableRef.current;

            if (!table) {
                console.error("Table reference not found");
                return;
            }

            setTimeout(async () => {
                try {
                    const pdf = new jsPDF('p', 'mm', 'a4');
                    const imgWidth = 190;

                    pdf.setFontSize(14);
                    pdf.text('Reports', 20, 20);
                    pdf.setFontSize(12);
                    pdf.text(`Date Range: ${dateFrom} to ${dateTo}`, 20, 30);

                    const canvas = await html2canvas(table, { scale: 2 });
                    const imgData = canvas.toDataURL('image/png');

                    const imgHeight = (canvas.height * imgWidth) / canvas.width;
                    pdf.addImage(imgData, 'PNG', 10, 40, imgWidth, imgHeight);
                    
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

                    pdf.save('reports.pdf');
                } catch (captureError) {
                    console.error("Error capturing element:", captureError);
                }
            }, 500); // Adjust the delay as needed
        } catch (error) {
            console.error("Error exporting to PDF:", error);
        }
    };

    return (
        <div className="reports-container">
            <div className="blue-container">

                <div className="searchContainer">
                    <div className="searchContainer-left">
                        <p style={{ fontWeight: "bold" }}>Date From: </p>
                        <input className="inputDate" type="date" id="dateFrom" name="dateFrom" onChange={(e) => setDateFrom(e.target.value)} />
                        <p style={{ fontWeight: "bold" }}>To: </p>
                        <input className="inputDate" type="date" id="dateTo" name="dateTo" onChange={(e) => setDateTo(e.target.value)} />
                        <Button style={{ backgroundColor: "white", color: "black", width: "100px", height: "40px", fontWeight: "bold", alignSelf: "flex-end", margin: "30px", borderRadius: "10px" }} variant="contained" onClick={handleFilter}>
                            Filter
                        </Button>
                    </div>
                    <div className="searchContainer-right">
                        <Button style={{ backgroundColor: "white", color: "black", width: "100px", height: "40px", fontWeight: "bold", alignSelf: "flex-end", margin: "30px", borderRadius: "10px" }} variant="contained" startIcon={<DownloadIcon />} onClick={handleExportToPDF} >
                            PDF
                        </Button>

                    </div>
                </div>

                <div className='report-table-container' ref={tableRef} >
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                            <TableHead>
                                <TableRow >
                                    <TableCell className='table-cell'>Date </TableCell>
                                    <TableCell className='table-cell'>Customer Name</TableCell>
                                    <TableCell className='table-cell'>Total Amount </TableCell>
                                    <TableCell className='table-cell'>Payment Method</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {reportData.map((report) => (
                                    <TableRow
                                        key={report._id}
                                        sx={{
                                            "&:last-child td, &:last-child th": { border: 0 },
                                        }}
                                    >
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