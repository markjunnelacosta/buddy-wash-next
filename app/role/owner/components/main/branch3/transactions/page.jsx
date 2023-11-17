"use client";
import React, { useRef, useState } from 'react';
import './transactions.css';
import { Button } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import AddTransactions from './transactionsTable';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { getFilteredReport } from './transactionsTable';

function Transactions() {
  const tableRef = useRef(null);
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [filteredData, setReportData] = useState([]);

  const handleFilter = async () => {
    try {
      const data = await getFilteredReport(dateFrom, dateTo);
      console.log("Filtered data:", data);
      setReportData(data); 
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

      const canvas = await html2canvas(table, { scale: 2 });
      const imgData = canvas.toDataURL('image/png');

      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgWidth = 190;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      pdf.addImage(imgData, 'PNG', 10, 10, imgWidth, imgHeight);
      pdf.addImage(imgData, 'PNG', 10, 10, 190, 0);

      pdf.save('table.pdf');
    } catch (error) {
      console.error("Error exporting to PDF:", error);
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
            />
            <p style={{ fontWeight: "bold" }}>To: </p>
            <input
              className="inputDate"
              type="date"
              value={dateTo}
              onChange={(e) => setDateTo(e.target.value)}
            />
            <Button
              style={{
                backgroundColor: "white",
                color: "black",
                width: "100px",
                height: "40px",
                fontWeight: "bold",
                alignSelf: "flex-end",
                margin: "30px",
                borderRadius: "10px"
              }}
              variant="contained"
              onClick={handleFilter}
            >
              Filter
            </Button>
          </div>
          <div className="searchContainer-right">
            <Button
              style={{
                backgroundColor: "white",
                color: "black",
                width: "100px",
                height: "40px",
                fontWeight: "bold",
                alignSelf: "flex-end",
                margin: "30px",
                borderRadius: "10px"
              }}
              variant="contained"
              startIcon={<DownloadIcon />}
              onClick={handleExportToPDF}
            >
              PDF
            </Button>

          </div>
        </div>
        <div className="table-container" ref={tableRef}>
          {AddTransactions (filteredData)}
        </div>
      </div>

    </div>
  )
}
export default Transactions;