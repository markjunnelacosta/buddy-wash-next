"use client";
import React, { useRef, useState } from 'react';
import './transactions.css';
import { Button, Select, MenuItem  } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import html2canvas from 'html2canvas';
import * as XLSX from 'xlsx';
import { getFilteredReport } from './transactionsTable';
import AddTransactions from './transactionsTable';



function Transactions() {
  const tableRef = useRef(null);
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [dateRange, setDateRange] = useState('annually');
  const [totalAmount, setTotalAmount] = useState(0);
  const faviconUrl = '/favicon.png';

  const handleFilterButtonClick = async () => {
    try {
      const data = await getFilteredReport(dateFrom, dateTo, dateRange);
      if (data.length === 0) {
        console.log("No records found for the specified period.");
      } else {

        // const branch3Data = data.filter(report => report.branchNumber === "b3");
        // console.log("Filtered data:", branch3Data);
        setFilteredData(data);

        const total = data.reduce((sum, report) => sum + report.totalAmount, 0);
        setTotalAmount(total);
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

      const pdf = new jsPDF('p', 'mm', 'a4');
      pdf.setFontSize(12);

      const logoImage = new Image();
      logoImage.src = faviconUrl;
      logoImage.onload = function () {
        const logoSize = 50;
        pdf.addImage(logoImage, 'JPEG', pdf.internal.pageSize.width - logoSize - 10, 5, logoSize, logoSize);
        pdf.setFont('times', 'bold');
        pdf.text('BRANCH 3 TRANSACTION HISTORY', 20, 20);
        pdf.setFont('times', 'normal');
        pdf.text(`Requested Date: ${dateFrom} to ${dateTo}`, 20, 25);
        // pdf.text(`Printed by: ${getserID()}`, 20, pdf.internal.pageSize.height - 30);
        pdf.text('Corporation: WASHAF LAUNDRY SHOP', 20, 30);
        const formattedTotalAmount = totalAmount.toFixed(2);
        pdf.text(`Total Amount: Php ${formattedTotalAmount}`, 20, 35);
        pdf.setFontSize(10);
        pdf.text('This report contains detailed information about transactions from Branch 3.', 20, 45);

        const header = ["Dates", "Customer Name", "Total Amount", "Payment Method"];
        const rows = filteredData
          // .filter((report) => report.branchNumber === "b3")
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