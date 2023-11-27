"use client";
import React, { useRef, useState } from 'react';
import './transactions.css';
import { Button } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import AddTransactions from './transactionsTable';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import * as XLSX from 'xlsx';
import { getFilteredReport } from './transactionsTable';
import { Select, MenuItem } from '@mui/material';

function Transactions() {
  const tableRef = useRef(null);
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [filteredData, setReportData] = useState([]);
  const [dateRange, setDateRange] = useState('annually');

  const handleFilterButtonClick = async () => {
    try {
      const data = await getFilteredReport(dateFrom, dateTo, dateRange);
      if (data.length === 0) {
        console.log("No records found for the specified period.");
      } else {
        console.log("Filtered data:", data);
        setReportData(data);
      }
    } catch (error) {
      console.error("Error filtering transactions:", error);
    }
  };

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
          pdf.text('Reports from Branch 3', 20, 20);
          pdf.setFontSize(12);
          pdf.text(`Date Range: ${dateFrom} to ${dateTo}`, 20, 30);

          const canvas = await html2canvas(table, { scale: 2 });
          const imgData = canvas.toDataURL('image/png');

          const imgHeight = (canvas.height * imgWidth) / canvas.width;
          pdf.addImage(imgData, 'PNG', 10, 40, imgWidth, imgHeight);

          pdf.save('table.pdf');
        } catch (error) {
          console.error("Error exporting to PDF:", error);
        }
      }, 500);
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
    <div className="transactions-container">
      <div className="blue-container">
        <div className="searchContainer">
          <div className="searchContainer-left">
            <p style={{ fontWeight: "bold" }}>Date From: </p>
            <input
              className="inputDate"
              type="date"
              value={dateFrom}
              onChange={(e) => setDateFrom(e.target.value)}
              style={{ width: "150px" }}
            />
            <p style={{ fontWeight: "bold" }}>To: </p>
            <input
              className="inputDate"
              type="date"
              value={dateTo}
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
              onClick={handleFilterButtonClick}
            >
              Filter
            </Button>
          </div>
          <div className="searchContainer-right">
            <Select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
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
              onClick={handleExportToPDF}
            >
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
        <div className="table-container" ref={tableRef}>
          {/* {<div AddTransactions (filteredData)>} */}
          <AddTransactions filteredData={filteredData} dateRange={dateRange}  ></AddTransactions>
        </div>
      </div>

    </div>
  )
}
export default Transactions;