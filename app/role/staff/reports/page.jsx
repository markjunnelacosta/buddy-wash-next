"use client";
import React, { useState, useEffect } from 'react';
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

const getReport = async () => {
    try {
        const res = await fetch("http://localhost:3000/api/report", {
            cache: "no-store",
        });

        if (!res.ok) {
            throw new Error("Failed to fetch report");
        }

        const response = await res.json();
        return response.reportData || [];
    } catch (error) {
        console.log("Error loading report: ", error);
    }
};

const getFilteredReport = async (dateFrom, dateTo) => {
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

const Reports = () => {
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

    return (
        <div className="reports-container">
            <div className="blue-container">

                <div className="searchContainer">
                    <div className="searchContainer-left">
                        <p style={{ fontWeight: "bold" }}>Date From: </p>
                        <input className="inputDate" type="date" id="dateFrom" name="dateFrom" onChange={(e) => setDateFrom(e.target.value)}/>
                        <p style={{ fontWeight: "bold" }}>To: </p>
                        <input className="inputDate" type="date" id="dateTo" name="dateTo" onChange={(e) => setDateTo(e.target.value)}/>
                        <Button style={{ backgroundColor: "white", color: "black", width: "100px", height: "40px", fontWeight: "bold", alignSelf: "flex-end", margin: "30px", borderRadius: "10px" }} variant="contained" onClick={handleFilter}>
                            Filter
                        </Button>
                    </div>
                    <div className="searchContainer-right">
                        <Button style={{ backgroundColor: "white", color: "black", width: "100px", height: "40px", fontWeight: "bold", alignSelf: "flex-end", margin: "30px", borderRadius: "10px" }} variant="contained" startIcon={<DownloadIcon />}>
                            PDF
                        </Button>

                    </div>
                </div>

                <div className='report-table-container'>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                            <TableHead>
                                <TableRow >
                                    <TableCell className='table-cell'>Date </TableCell>
                                    <TableCell className='table-cell'>Customer Name</TableCell>
                                    <TableCell className='table-cell'>Total Amount </TableCell>
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