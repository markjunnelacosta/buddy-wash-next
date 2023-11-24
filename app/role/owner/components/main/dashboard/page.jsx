"use client"
import React, { useState, useEffect } from "react";
import "./dashboard.css";
import { Grid, Paper } from "@mui/material";
import Counter from "./counter";
import Chart from "./Chart";
import ForecastChart from "./ForecastChart";
import { Select, MenuItem } from '@mui/material';

const Dashboard = () => {
  const [reportData, setReportData] = useState([]);
  const [totalProfit, setTotalProfit] = useState(0);
  const [customerCount, setCustomerCount] = useState(0);
  const [b1Profit, setB1Profit] = useState(0);
  const [b2Profit, setB2Profit] = useState(0);
  const [b3Profit, setB3Profit] = useState(0);
  const [dateRange, setDateRange] = useState("daily");
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/report");
        const data = await res.json();

        setReportData(data.reportData);

        const totalProfitValue = data.reportData.reduce(
          (acc, report) => acc + report.totalAmount,
          0
        );
        setTotalProfit(totalProfitValue);

        const totalTransactions = data.reportData.length; // Counting total transactions
        setCustomerCount(totalTransactions);

        const b1ProfitValue = data.reportData.reduce(
          (acc, report) => acc + report.b1Amount,
          0
        );
        console.log("B1 Profit:", b1ProfitValue);
        setB1Profit(b1ProfitValue);

        const b2ProfitValue = data.reportData.reduce(
          (acc, report) => acc + report.b2Amount,
          0
        );
        console.log("B2 Profit:", b2ProfitValue);
        setB2Profit(b2ProfitValue);

        const b3ProfitValue = data.reportData.reduce(
          (acc, report) => acc + report.b3Amount,
          0
        );
        console.log("B3 Profit:", b3ProfitValue);
        setB3Profit(b3ProfitValue);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const forecastData = reportData.map((report, index) => {
    const pastReports = reportData.slice(0, index);
    const averageTotalAmount =
      pastReports.reduce((acc, pastReport) => acc + pastReport.totalAmount, 0) /
      (pastReports.length || 1);
    const forecastDate = new Date(report.reportDate);

    return {
      forecastDate: forecastDate.toLocaleDateString(),
      forecastedAmount: averageTotalAmount,
    };
  });

  console.log("Forecast Data:", forecastData);

  return (
    <div className="dashboard-container">
      <div className="graphs-container">
        <Select
          value={dateRange}
          onChange={(e) => setDateRange(e.target.value)}
          style={{
            backgroundColor: "white",
            color: "black",
            width: "200px",
            height: "40px",
            fontWeight: "bold",
            margin: "30px",
            marginLeft: "45px",
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
        <div className="top-container">
          <div className="counters-container">
            <Counter title="Sales" value={totalProfit.toFixed(2)} currency="₱" />
            <Counter title="Customers" value={customerCount} />
            <Counter title="Branch 1 Sales" value={b1Profit.toFixed(2)} currency="₱" />
            <Counter title="Branch 2 Sales" value={b2Profit.toFixed(2)} currency="₱" />
            <Counter title="Branch 3 Sales" value={b3Profit.toFixed(2)} currency="₱" />
          </div>

          <div className="customers-container">
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Paper
                  sx={{
                    p: 2,
                    display: "flex",
                    flexDirection: "column",
                    height: 240,
                  }}
                >
                  <Chart data={reportData} />
                </Paper>
              </Grid>

              <Grid item xs={12} md={6}>
                <Paper
                  sx={{
                    p: 2,
                    display: "flex",
                    flexDirection: "column",
                    height: 240,
                  }}
                >
                  <ForecastChart forecastData={forecastData} />
                </Paper>
              </Grid>
            </Grid>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;